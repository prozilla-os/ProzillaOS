export type Result<T, E> = Result.Success<T, E> | Result.Failure<T, E>;

export abstract class BaseResult<V, E> {

	public isOk(): this is Result.Success<V, E> {
		return false;
	}

	public isError(): this is Result.Failure<V, E> {
		return false;
	}

	public abstract map<W>(callback: (value: V) => W): Result<W, E>;

	public abstract mapError<F>(callback: (error: E) => F): Result<V, F>;

	public abstract flatMap<W, F>(callback: (value: V) => Result<W, F>): Result<W, E | F>;

	public abstract orElse<W, F>(callback: (error: E) => Result<W, F>): Result<V | W, F | E>;

	public abstract unwrapOr<W>(defaultValue: W): V | W;

	public abstract match<A, B>(ok: (value: V) => A, error: (error: E) => B): A | B;

}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Result {

	export class Success<V, E> extends BaseResult<V, E> {

		constructor(readonly value: V) {
			super();
		}

		public override isOk(): this is Success<V, E> {
			return true;
		}

		public override map<W>(callback: (value: V) => W): Result<W, E> {
			return ok(callback(this.value));
		}

		public override mapError<F>(_callback: (error: E) => F): Result<V, F> {
			return ok(this.value);
		}

		public override flatMap<W, F>(callback: (value: V) => Result<W, F>): Result<W, E | F> {
			return callback(this.value);
		}

		public override orElse<W, F>(_callback: (error: E) => Result<W, F>): Result<V, E> {
			return this;
		}

		public override unwrapOr<W>(_defaultValue: W): V {
			return this.value;
		}

		public override match<A, B>(ok: (value: V) => A, _error: (error: E) => B): A {
			return ok(this.value);
		}

	}

	export class Failure<V, E> extends BaseResult<V, E> {

		constructor(readonly error: E) {
			super();
		}

		public override isError(): this is Failure<V, E> {
			return true;
		}
		
		public override map<W>(_callback: (value: V) => W): Result<W, E> {
			return error(this.error);
		}

		public override mapError<F>(callback: (error: E) => F): Result<V, F> {
			return error(callback(this.error));
		}

		public override flatMap<W, F>(_callback: (value: V) => Result<W, F>): Failure<W, E> {
			return error(this.error);
		}

		public override orElse<W, F>(callback: (error: E) => Result<W, F>): Result<W, F> {
			return callback(this.error);
		}

		public override unwrapOr<W>(defaultValue: W): W {
			return defaultValue;
		}

		public override match<A, B>(_ok: (value: V) => A, error: (error: E) => B): B {
			return error(this.error);
		}

	}

	export function ok<T, E = never>(value: T): Success<T, E> {
		return new Success(value);
	}

	export function error<E, T = never>(error: E): Failure<T, E> {
		return new Failure(error);
	}

	export function nonNullOr<V, E>(nullable: V | null | undefined, err: E): Result<NonNullable<V>, E> {
		return nullable != null ? ok(nullable) : error(err);
	}

	export function nonNullOrElse<V, W, E>(nullable: V | null | undefined, orElse: () => Result<W, E>): Result<NonNullable<V> | W, E> {
		return nullable != null ? ok(nullable) : orElse();
	}

}
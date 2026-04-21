/**
 * Represents either a success or a failure.
 * 
 * Can be used as the return value of a function instead of throwing errors.
 * This improves type-safety and helps you control the flow of your function.
 * 
 * This is inspired by [neverthrow by supermacro](https://github.com/supermacro/neverthrow).
 * 
 * A success can be created using {@link Result.ok} and a failure using {@link Result.error}.
 */
export type Result<T, E> = Result.Success<T, E> | Result.Failure<T, E>;

export abstract class BaseResult<V, E> {

	/**
	 * Returns `true` if this result is a {@link Result.Success}.
	 */
	public isOk(): this is Result.Success<V, E> {
		return false;
	}

	/**
	 * Returns `true` if this result is a {@link Result.Failure}.
	 */
	public isError(): this is Result.Failure<V, E> {
		return false;
	}

	/**
	 * Transforms the value of this result using the provided callback if this is a {@link Result.Success}.
	 * Does nothing if this result is a {@link Result.Failure}.
	 */
	public abstract map<W>(callback: (value: V) => W): Result<W, E>;

	/**
	 * Transforms the error of this result using the provided callback if this is a {@link Result.Failure}.
	 * Does nothing if this result is a {@link Result.Success}.
	 */
	public abstract mapError<F>(callback: (error: E) => F): Result<V, F>;

	/**
	 * Chains a new {@link Result}-returning operation to this result if this is a {@link Result.Success}.
	 * Does nothing if this result is a {@link Result.Failure}.
	 */
	public abstract next<W, F>(callback: (value: V) => Result<W, F>): Result<W, E | F>;

	/**
	 * Provides a recovery path for this result if this is a {@link Result.Failure} by returning a new {@link Result}.
	 * Does nothing if this result is a {@link Result.Success}.
	 */
	public abstract orElse<W, F>(callback: (error: E) => Result<W, F>): Result<V | W, F | E>;

	/**
	 * Returns the {@link Result.Success} value of this instance or the provided default value if this is a {@link Result.Failure}.
	 */
	public abstract unwrapOr<W>(defaultValue: W): V | W;

	/**
	 * Executes the `ok` callback if this is a {@link Result.Success}, or the `error` callback 
	 * if this is a {@link Result.Failure}, returning the result.
	 */
	public abstract match<A, B>(ok: (value: V) => A, error: (error: E) => B): A | B;

	/**
	 * Executes a callback for side effects if this result is a {@link Result.Success}.
	 */
	public ifOk(callback: (value: V) => void): this {
		if (this.isOk())
			callback(this.value);
		return this;
	}

	/**
	 * Executes a callback for side effects if this result is a {@link Result.Failure}.
	 */
	public ifError(callback: (error: E) => void): this {
		if (this.isError())
			callback(this.error);
		return this;
	}

	/**
	 * Validates the value of this result against a predicate. 
	 * Converts to {@link Result.Failure} if the predicate returns `false`.
	 * Does nothing if this result is already a {@link Result.Failure}.
	 */
	public abstract filter<U extends V, F>(predicate: (value: V) => value is U, createError: (value: V) => F): Result<U, E | F>;
	public abstract filter<F>(predicate: (value: V) => boolean, createError: (value: V) => F): Result<V, E | F>;

}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Result {

	/**
	 * Represents the result of a successful operation.
	 */
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

		public override next<W, F>(callback: (value: V) => Result<W, F>): Result<W, E | F> {
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

		public override filter<U extends V, F>(predicate: (value: V) => value is U, createError: (value: V) => F): Result<U, E | F>;
		public override filter<F>(predicate: (value: V) => boolean, createError: (value: V) => F): Result<V, E | F>;
		public override filter<F, W extends V>(predicate: (value: V) => value is W, createError: (value: V) => F): Result<W, E | F> {
			return predicate(this.value) ? ok(this.value) : error(createError(this.value));
		}

	}

	/**
	 * Represents the result of a failed operation.
	 */
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

		public override next<W, F>(_callback: (value: V) => Result<W, F>): Failure<W, E> {
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

		public override filter<U extends V, F>(predicate: (value: V) => value is U, createError: (value: V) => F): Result<U, E | F>;
		public override filter<F>(predicate: (value: V) => boolean, createError: (value: V) => F): Result<V, E | F>;
		public override filter<F, W extends V>(_predicate: (value: V) => value is W, _createError: (value: V) => F): Result<W, E | F> {
			return error(this.error);
		}

	}

	/**
	 * Creates a {@link Result.Success} instance.
	 */
	export function ok<T, E = never>(value: T): Success<T, E> {
		return new Success(value);
	}

	/**
	 * Creates a {@link Result.Failure} instance.
	 */
	export function error<E, T = never>(error: E): Failure<T, E> {
		return new Failure(error);
	}

	/**
	 * Wraps a synchronous operation that might throw in a {@link Result}.
	 */
	export function wrap<V, E = Error>(callback: () => V, catcher?: (err: unknown) => E): Result<V, E> {
		try {
			return ok(callback());
		} catch (err) {
			return error(catcher ? catcher(err) : (err as E));
		}
	}

	/**
	 * Converts a nullable value into a {@link Result}.
	 * Returns {@link Result.Failure} if the value is `null` or `undefined`.
	 */
	export function nonNullOr<V, E>(nullable: V | null | undefined, err: E): Result<NonNullable<V>, E> {
		return nullable != null ? ok(nullable) : error(err);
	}

	/**
	 * Converts a nullable value into a {@link Result} or executes a fallback {@link Result}-returning function.
	 */
	export function nonNullOrElse<V, W, E>(nullable: V | null | undefined, orElse: () => Result<W, E>): Result<NonNullable<V> | W, E> {
		return nullable != null ? ok(nullable) : orElse();
	}

	/**
	 * Repeatedly executes a {@link Result}-returning body while a condition is met.
	 */
	export function repeat<V, E>(initialValue: V, condition: (value: V) => boolean, body: (value: V) => Result<V, E>): Result<V, E> {
		let currentValue = initialValue;
		while (condition(currentValue)) {
			const result = body(currentValue);
			if (result.isError())
				return result;
			currentValue = result.value;
		}
		return ok(currentValue);
	}

	/**
	 * Reduces a collection into a {@link Result} by executing a {@link Result}-returning 
	 * reducer for each item.
	 */
	export function reduce<T, V, E>(items: T[], reducer: (accumulator: V, item: T) => Result<V, E>, initialValue: V): Result<V, E> {
		let accumulator = initialValue;
		for (const item of items) {
			const result = reducer(accumulator, item);
			if (result.isError())
				return result;
			accumulator = result.value;
		}
		return ok(accumulator);
	}

	/**
	 * Collapses an array of {@link Result}s into a single {@link Result} containing an array of values.
	 * Returns the first {@link Result.Failure} encountered.
	 * Similar to {@link Promise.all}, but for synchronous {@link Result} collections.
	 */
	export function all<V, E>(results: Result<V, E>[]): Result<V[], E> {
		const values: V[] = [];
		for (const result of results) {
			if (result.isError())
				return error(result.error);
			values.push(result.value);
		}
		return ok(values);
	}

	/**
	 * Returns the first {@link Result.Success} produced by the callback for any item 
	 * in the collection. If no success is found, it returns the provided default error {@link Result}.
	 * Similar to {@link Promise.any}, but for synchronous {@link Result} collections.
	 */
	export function any<T, V, E>(items: T[], callback: (item: T) => Result<V, E>, fallback: Result<V, E>): Result<V, E> {
		for (const item of items) {
			const result = callback(item);
			if (result.isOk()) {
				return result;
			}
		}
		return fallback;
	}

	/**
	 * Validates a subject against a type guard, producing a {@link Result}.
	 */
	export function require<T, U extends T, V, E>(
		subject: T, 
		condition: (subject: T) => subject is U, 
		createValue: (subject: U) => V, 
		createError: (subject: T) => E
	): Result<V, E> {
		return condition(subject) ? ok(createValue(subject)) : error(createError(subject));
	}

}
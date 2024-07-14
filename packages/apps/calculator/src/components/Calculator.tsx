import { useCallback, useEffect, useState } from "react";
import styles from "./Calculator.module.css";
import { Button, WindowProps } from "@prozilla-os/core";

export function Calculator({ active }: WindowProps) {
	const [input, setInput] = useState<string | null>("0");
	const [firstNumber, setFirstNumber] = useState<number | null>(null);
	const [secondNumber, setSecondNumber] = useState<number | null>(null);
	const [operation, setOperation] = useState<string | null>(null);
	const [isIntermediate, setIsIntermediate] = useState(false);

	const reset = useCallback(() => {
		setInput("0");
		setFirstNumber(null);
		setSecondNumber(null);
		setOperation(null);
	}, []);

	const addInput = useCallback((string: string) => {
		let hasReset = false;
		if (secondNumber != null) {
			if (isIntermediate && input != null) {
				setFirstNumber(parseFloat(input));
				setSecondNumber(null);
				setInput(null);
			} else {
				reset();
			}
			hasReset = true;
		}			

		if (string === "." && input?.includes("."))
			return;

		if (string === "-") {
			if (input === "0") {
				setInput("-0");
			} else if (input != null) {
				setInput((parseFloat(input) * -1).toString());
			}
		} else if (string === "%" && input != null) {
			setInput((parseFloat(input) / 100).toString());
		} else if (input === "0" || input === "-0" || input == null || hasReset) {
			if (string === ".") {
				setInput(input === "-0" ? "0." : "0.");
			} else {
				setInput(input === "-0" ? `-${string}` : string);
			}
		} else {
			setInput(input + string);
		}

	}, [input, isIntermediate, reset, secondNumber]);

	const calculate = useCallback((intermediate = false) => {
		if (firstNumber != null && input != null) {
			setSecondNumber(parseFloat(input));

			const a = firstNumber;
			const b = parseFloat(input);
			
			let result = 0;
			switch (operation) {
				case "×":
					result = a * b;
					break;
				case "÷":
					result = a / b;
					break;
				case "+":
					result = a + b;
					break;
				case "-":
					result = a - b;
					break;
			}

			setInput(result.toString());
		}

		setIsIntermediate(intermediate);
	}, [firstNumber, input, operation]);

	const changeOperation = useCallback((operation: string) => {
		if (firstNumber != null && secondNumber == null) {
			calculate(true);
		} else if (input != null) {
			setFirstNumber(parseFloat(input));
			setSecondNumber(null);
			setInput(null);
		}

		setOperation(operation);
	}, [calculate, firstNumber, input, secondNumber]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (!active)
				return;

			event.preventDefault();

			switch (event.key) {
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					addInput(event.key);
					break;
				case ".":
				case ",":
					addInput(".");
					break;
				case "Escape":
					reset();
					break;
				case "=":
				case "Enter":
					calculate();
					break;
				case "*":
					changeOperation("×");
					break;
				case "/":
					changeOperation("÷");
					break;
				case "+":
				case "-":
					changeOperation(event.key);
					break;
				case "%":
					addInput("%");
					break;
				case "Backspace":
					if (input != null && input.length > 0) {
						setInput(input.slice(0, -1));
					}
					break;
			}
		};

		document.addEventListener("keydown", onKeyDown);

		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [active, addInput, calculate, changeOperation, reset]);

	let calculation = "";
	if (operation != null)
		calculation = `${firstNumber} ${operation} ${secondNumber != null ? secondNumber + " =" : ""}`;

	return (<div className={styles.Calculator}>
		<div className={styles.Output}>
			<p className={styles.Calculation}>{calculation}</p>
			<p className={styles.Preview}>{input ?? firstNumber}</p>
		</div>
		<div className={styles.Input}>
			<div className={styles.InputRow}>
				<Button className={styles.Button} onClick={reset}>C</Button>
				<Button className={styles.Button} onClick={() => { addInput("-"); }}>+/-</Button>
				<Button className={styles.Button} onClick={() => { addInput("%"); }}>%</Button>
				<Button className={styles.Button} onClick={() => { changeOperation("÷"); }}>÷</Button>
			</div>
			<div className={styles.InputRow}>
				<Button className={styles.Button} onClick={() => { addInput("7"); }}>7</Button>
				<Button className={styles.Button} onClick={() => { addInput("8"); }}>8</Button>
				<Button className={styles.Button} onClick={() => { addInput("9"); }}>9</Button>
				<Button className={styles.Button} onClick={() => { changeOperation("×"); }}>×</Button>
			</div>
			<div className={styles.InputRow}>
				<Button className={styles.Button} onClick={() => { addInput("4"); }}>4</Button>
				<Button className={styles.Button} onClick={() => { addInput("5"); }}>5</Button>
				<Button className={styles.Button} onClick={() => { addInput("6"); }}>6</Button>
				<Button className={styles.Button} onClick={() => { changeOperation("-"); }}>-</Button>
			</div>
			<div className={styles.InputRow}>
				<Button className={styles.Button} onClick={() => { addInput("1"); }}>1</Button>
				<Button className={styles.Button} onClick={() => { addInput("2"); }}>2</Button>
				<Button className={styles.Button} onClick={() => { addInput("3"); }}>3</Button>
				<Button className={styles.Button} onClick={() => { changeOperation("+"); }}>+</Button>
			</div>
			<div className={styles.InputRow}>
				<Button className={`${styles.Button} ${styles.ButtonLarge}`} onClick={() => { addInput("0"); }}>0</Button>
				<Button className={styles.Button} onClick={() => { addInput("."); }}>.</Button>
				<Button className={styles.Button} onClick={() => { calculate(); }}>=</Button>
			</div>
		</div>
	</div>);
}
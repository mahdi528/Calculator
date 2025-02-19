import { useState } from "react";
import "./App.css";

export default function Calculator() {
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const handleClear = () => {
    setInput("0");
    setFormula("");
    setEvaluated(false);
  };

  const handleNumber = (num) => {
    if (evaluated) {
      setInput(num);
      setFormula(num);
      setEvaluated(false);
    } else {
      if (input === "0" && num !== "0") {
        setInput(num);
        setFormula(num);
      } else if (input !== "0") {
        setInput(input + num);
        setFormula(formula + num);
      }
    }
  };

  const handleOperator = (operator) => {
    if (evaluated) {
      setFormula(input + operator);
      setInput(operator);
      setEvaluated(false);
    } else {
      setFormula((prev) => {
        if (operator === "-" && (prev === "" || /[*/+-]$/.test(prev))) {
          return prev + operator;
        }
        return prev.replace(/([*/+-])+/g, (match) => match.charAt(match.length - 1)) + operator;
      });
      setInput(operator);
    }
  };

  const handleDecimal = () => {
    if (!input.includes(".")) {
      setInput(input + ".");
      setFormula(formula + ".");
    }
  };

  const handleEvaluate = () => {
    try {
      let sanitizedFormula = formula.replace(/([-+*/])+/g, (match) => {
        if (match.length >= 1) {
          return match.charAt(match.length - 1);
        } else {
          return match;
        }
      });

      sanitizedFormula = sanitizedFormula.replace(/(?<=\d)-/g, " -");

      let result = eval(sanitizedFormula);
      
      // Round the result to 4 decimal places
      result = Math.round(result * 10000) / 10000;
      
      setInput(result.toString());
      setFormula(result.toString());
      setEvaluated(true);
    } catch (error) {
      setInput("Error");
      setFormula("");
      setEvaluated(true);
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">{input}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="divide" onClick={() => handleOperator("/")}>/</button>
        <button id="seven" onClick={() => handleNumber("7")}>7</button>
        <button id="eight" onClick={() => handleNumber("8")}>8</button>
        <button id="nine" onClick={() => handleNumber("9")}>9</button>
        <button id="multiply" onClick={() => handleOperator("*")}>*</button>
        <button id="four" onClick={() => handleNumber("4")}>4</button>
        <button id="five" onClick={() => handleNumber("5")}>5</button>
        <button id="six" onClick={() => handleNumber("6")}>6</button>
        <button id="subtract" onClick={() => handleOperator("-")}>-</button>
        <button id="one" onClick={() => handleNumber("1")}>1</button>
        <button id="two" onClick={() => handleNumber("2")}>2</button>
        <button id="three" onClick={() => handleNumber("3")}>3</button>
        <button id="add" onClick={() => handleOperator("+")}>+</button>
        <button id="decimal" onClick={handleDecimal}>.</button>
        <button id="zero" onClick={() => handleNumber("0")} className="zero">0</button>
        <button id="equals" onClick={handleEvaluate}>=</button>
      </div>
    </div>
  );
}

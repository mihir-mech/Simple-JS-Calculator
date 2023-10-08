import { useState } from "react";
import "./App.css";

/**
 * React component that implements a calculator application.
 *
 * @returns {JSX.Element} The JSX code for the calculator UI.
 */
function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

  const et = expression.trim();

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      //split by the operatoss and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      //if last number already has a decimal, don't add another.
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    //if last char is a operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    //clean the expression so that two operators in a row uses the last operator
    //5*-+5=10

    const parts = et.split(" ");
    const newParts = [];

    //go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>Calculator Application</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="expression">{expression}</div>
            <div id="answer">{answer}</div>
          </div>
          <button
            id="clear"
            className="light-grey"
            onClick={() => buttonPress("clear")}
          >
            AC
          </button>
          <button
            id="negative"
            className="light-grey"
            onClick={() => buttonPress("negative")}
          >
            +/-
          </button>
          <button
            id="percent"
            className="light-grey"
            onClick={() => buttonPress("percent")}
          >
            %
          </button>
          <button
            id="divide"
            className="orange"
            onClick={() => buttonPress("/")}
          >
            /
          </button>
          <button
            id="seven"
            className="dark-grey"
            onClick={() => buttonPress("7")}
          >
            7
          </button>
          <button
            id="eight"
            className="dark-grey"
            onClick={() => buttonPress("8")}
          >
            8
          </button>
          <button
            id="nine"
            className="dark-grey"
            onClick={() => buttonPress("9")}
          >
            9
          </button>
          <button
            id="multiply"
            className="orange"
            onClick={() => buttonPress("*")}
          >
            *
          </button>
          <button
            id="four"
            className="dark-grey"
            onClick={() => buttonPress("4")}
          >
            4
          </button>
          <button
            id="five"
            className="dark-grey"
            onClick={() => buttonPress("5")}
          >
            5
          </button>
          <button
            id="six"
            className="dark-grey"
            onClick={() => buttonPress("6")}
          >
            6
          </button>
          <button
            id="subtract"
            className="orange"
            onClick={() => buttonPress("-")}
          >
            -
          </button>
          <button
            id="one"
            className="dark-grey"
            onClick={() => buttonPress("1")}
          >
            1
          </button>
          <button
            id="two"
            className="dark-grey"
            onClick={() => buttonPress("2")}
          >
            2
          </button>
          <button
            id="three"
            className="dark-grey"
            onClick={() => buttonPress("3")}
          >
            3
          </button>
          <button id="add" className="orange" onClick={() => buttonPress("+")}>
            +
          </button>
          <button
            id="zero"
            className="dark-grey"
            onClick={() => buttonPress("0")}
          >
            0
          </button>
          <button
            id="decimal"
            className="light-grey"
            onClick={() => buttonPress(".")}
          >
            .
          </button>
          <button
            id="equals"
            className="green"
            onClick={() => buttonPress("=")}
          >
            =
          </button>
        </div>

        <div className="author"> Designed and Coded by
        <a href="https://www.github.com/mihir-mech" target="_blank"> Mihir Prajapati</a>
        </div>
      

      </div>
    </>
  );
}

export default App;
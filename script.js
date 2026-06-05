const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
const clearAll = document.querySelector(".clearAll");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");
const numbers = document.querySelectorAll(".numbers");
const operator = document.querySelectorAll(".operator");

let firstNumber = "";
let secondNumber = "";
let operatorButton = "";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  return a / b;
}

function operate(operator, a, b) {
  let result;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      "Invalid operator";
  }
  return Math.round(result * 1000) / 1000;
}

let waitingForNextNumber = true;
let justCalculated = false;

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (justCalculated) {
      display.textContent = number.textContent;
      justCalculated = false;
      return;
    }
    if (waitingForNextNumber && operatorButton !== "") {
      display.textContent += number.textContent;
      waitingForNextNumber = false;
    } else if (display.textContent === "0") {
      display.textContent = number.textContent;
    } else {
      display.textContent = display.textContent + number.textContent;
    }
  });
});

operator.forEach((op) => {
  op.addEventListener("click", () => {
    const operators = ["+", "-", "*", "/"];
    const lastChar = display.textContent.slice(-1);

    // Replace if last char is already an operator
    if (operators.includes(lastChar)) {
      display.textContent = display.textContent.slice(0, -1) + op.textContent;
    } else if (firstNumber !== "" && operatorButton !== "") {
      secondNumber = display.textContent.split(operatorButton).pop();

      if (secondNumber !== "") {
        const result = operate(
          operatorButton,
          parseFloat(firstNumber),
          parseFloat(secondNumber),
        );
        display.textContent = result + op.textContent; // show result + new operator
        firstNumber = result;
      }
    } else {
      firstNumber = display.textContent;
      display.textContent += op.textContent; // <-- append operator visibly
    }
    operatorButton = op.textContent;
    waitingForNextNumber = true;
  });
});

equal.addEventListener("click", () => {
  const operators = ["+", "-", "*", "/"];
  const lastChar = display.textContent.slice(-1);
  // Guard: if no operator or ends with operator, do nothing
  if (operatorButton === "" || operators.includes(lastChar)) return;
  // Extract second number (everything after the operator symbol)
  secondNumber = display.textContent.split(operatorButton).pop();

  if (secondNumber === "") return;
  const result = operate(
    operatorButton,
    parseFloat(firstNumber),
    parseFloat(secondNumber),
  );
  display.textContent = result;
  firstNumber = result;
  operatorButton = "";
  waitingForNextNumber = false;
  justCalculated = true;
});

clearAll.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  operatorButton = "";
  display.textContent = "0";
});

clear.addEventListener("click", () => {
  if (display.textContent.length > 1) {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    display.textContent = "0";
  }
});

decimal.addEventListener("click", () => {
  if (!display.textContent.includes(".")) {
    display.textContent = display.textContent + decimal.textContent;
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    if (waitingForNextNumber) {
      display.textContent = key;
      waitingForNextNumber = false;
    } else if (display.textContent === "0") {
      display.textContent = key;
    } else {
      display.textContent += key;
    }
  }
});

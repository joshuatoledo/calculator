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
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid operator";
  }
}

let waitingForNextNumber = true;

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (waitingForNextNumber && operatorButton !== "") {
      display.textContent = number.textContent;
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
    if (firstNumber !== "" && operatorButton !== "") {
      secondNumber = display.textContent;
      const result = operate(
        operatorButton,
        parseFloat(firstNumber),
        parseFloat(secondNumber),
      );
      display.textContent = result;
      firstNumber = result;
      waitingForNextNumber = true;
    } else {
      firstNumber = display.textContent;
      waitingForNextNumber = true;
    }

    operatorButton = op.textContent;
  });
});

equal.addEventListener("click", () => {
  secondNumber = display.textContent;
  const result = operate(
    operatorButton,
    parseFloat(firstNumber),
    parseFloat(secondNumber),
  );
  display.textContent = result;
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

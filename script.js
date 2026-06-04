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
let justCalculated = false;

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (justCalculated){
       display.textContent = number.textContent;
       justCalculated = false;
       return;
    }
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
    const operators = ["+", "-", "*", "/"];
    const lastChar = display.textContent.slice(-1);

    // Replace if last char is already an operator
    if (operators.includes(lastChar)) {
      display.textContent = display.textContent.slice(0, -1) + op.textContent;
    } else {
      firstNumber = display.textContent;
      display.textContent += op.textContent; // <-- append operator visibly
    }

    if(firstNumber !== '' && operatorButton !== '') {
        const result = operate(
          operatorButton,
          parseFloat(firstNumber),
          parseFloat(secondNumber),
  );
    display.textContent = result;
    return;
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

  if (secondNumber === '') return;

  const result = operate(
    operatorButton,
    parseFloat(firstNumber),
    parseFloat(secondNumber),
  );
 
 display.textContent = result;
 firstNumber = result
  operatorButton = "";
  waitingForNextNumber = false;
  justCalculated = true; //


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

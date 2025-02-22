const display = document.querySelector('.display');
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('button');
let currentNumber = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    display.textContent = currentNumber;
    if (firstOperand !== null && operator) {
        history.textContent = `${firstOperand} ${operator}`;
    } else if (firstOperand === null) {
        history.textContent = '';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('clear')) {
            currentNumber = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
        } else if (button.classList.contains('del')) {
            if (currentNumber.length > 1) {
                currentNumber = currentNumber.slice(0, -1);
            } else {
                currentNumber = '0';
            }
        } else if (!isNaN(button.textContent) || button.textContent === '.') {
            if (waitingForSecondOperand) {
                currentNumber = button.textContent;
                waitingForSecondOperand = false;
            } else {
                currentNumber = currentNumber === '0' ? button.textContent : currentNumber + button.textContent;
            }
        } else if (['+', '-', 'x', '÷'].includes(button.textContent)) {
            firstOperand = parseFloat(currentNumber);
            operator = button.textContent;
            waitingForSecondOperand = true;
        } else if (button.textContent === '=') {
            const secondOperand = parseFloat(currentNumber);
            history.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
            if (operator === '+') currentNumber = firstOperand + secondOperand;
            if (operator === '-') currentNumber = firstOperand - secondOperand;
            if (operator === 'x') currentNumber = firstOperand * secondOperand;
            if (operator === '÷') currentNumber = firstOperand / secondOperand;
            operator = null;
        } else if (button.textContent === '±') {
            currentNumber = (-parseFloat(currentNumber)).toString();
        }
        updateDisplay();
    });
});
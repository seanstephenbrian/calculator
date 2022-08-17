const headerText = document.querySelector('.header-text');
headerText.textContent = 'calc';
headerText.classList.add('calc');
headerText.addEventListener('mouseover', () => {
    headerText.textContent = 'CALCULATE:::';
    headerText.classList.remove('calc');
    headerText.classList.add('calculate');
});
headerText.addEventListener('mouseout', () => {
    headerText.textContent = 'calc';
    headerText.classList.remove('calculate');
    headerText.classList.add('calc');
});

const headerImg = document.querySelector('#header-img');
headerImg.setAttribute('src','img/calc.png');
headerImg.addEventListener('mouseover', () => {
    headerImg.removeAttribute('src','img/calc.png');
    headerImg.setAttribute('src','img/skull.png');
});
headerImg.addEventListener('mouseout', () => {
    headerImg.removeAttribute('src','img/skull.png');
    headerImg.setAttribute('src','img/calc.png');
});

const displayField = document.querySelector('.display-field');
displayField.textContent = 0;

let chosenOperator;
let storedValue;
let displayValue;
let clickedOperator;
let firstClick = false;

const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('mouseover', () => {
        number.classList.add('hover');
    });
    number.addEventListener('mouseout', () => {
        number.classList.remove('hover');
    });
    number.addEventListener('click', () => {
        number.classList.add('clicked');
        let clickedNumber = document.querySelector('.clicked').textContent;
        number.classList.remove('clicked');
        let previousValue = displayField.textContent;
        if (previousValue === '0' && !(storedValue)) {
            firstClick = true;
            displayField.textContent = clickedNumber;
        }
        if ( ( (storedValue) && (parseFloat(displayField.textContent) === storedValue) ) || ( (!storedValue) && (displayField.textContent) && (firstClick) ) ) {
            firstClick = false;
            displayField.textContent = '';
            displayField.textContent = clickedNumber;
        }
        else if (clickedOperator === '=') {
            clickedOperator = '';
            displayField.textContent = '';
            displayField.textContent = clickedNumber;
        } else {
            displayField.textContent += clickedNumber;
        }
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('mouseover', () => {
        operator.classList.add('hover');
    });
    operator.addEventListener('mouseout', () => {
        operator.classList.remove('hover');
    });
    operator.addEventListener('click', () => {
        operator.classList.add('clicked');
        clickedOperator = document.querySelector('.clicked').textContent;
        operator.classList.remove('clicked');
        if (!storedValue) {
            if (clickedOperator === '+') {
                storedValue = parseFloat(displayField.textContent);
                chosenOperator = add;
            } else if (clickedOperator === '-') {
                storedValue = parseFloat(displayField.textContent);
                chosenOperator = subtract;
            } else if (clickedOperator === 'x') {
                storedValue = parseFloat(displayField.textContent);
                chosenOperator = multiply;
            } else if (clickedOperator === '÷') {
                storedValue = parseFloat(displayField.textContent);
                chosenOperator = divide;
            }
        } else if (storedValue) {
            if (clickedOperator === '+') {
                displayValue = parseFloat(displayField.textContent);
                displayField.textContent = operate(chosenOperator,displayValue,storedValue);
                storedValue = parseFloat(displayField.textContent);
                chosenOperator = add;
            } else if (clickedOperator === '-') {
                displayValue = parseFloat(displayField.textContent);
                displayField.textContent = operate(chosenOperator,displayValue,storedValue);
                storedValue = parseFloat(displayField.textContent);
                chosenOperator = subtract;
            } else if (clickedOperator === 'x') {
                displayValue = parseFloat(displayField.textContent);
                displayField.textContent = operate(chosenOperator,displayValue,storedValue);
                storedValue = parseFloat(displayField.textContent);
                chosenOperator = multiply;
            } else if (clickedOperator === '÷') {
                displayValue = parseFloat(displayField.textContent);
                displayField.textContent = operate(chosenOperator,displayValue,storedValue);
                storedValue = parseFloat(displayField.textContent);
                chosenOperator = divide;
            }
        }
        if (clickedOperator === '=') {
            displayValue = parseFloat(displayField.textContent);
            displayField.textContent = operate(chosenOperator,displayValue,storedValue);
            storedValue = '';
        }
    });
});


function add(x, y) {
    return y + x;
}

function subtract(x, y) {
    return y - x;
}

function multiply(x, y) {
    return y * x;
}

function divide(x, y) {
    return y / x;
}

function operate(operator, x, y) {
    return operator(x, y);
}
// set up variables for DOM elements:
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

// make initial calculator display read '0'
const displayField = document.querySelector('.display-field');
displayField.textContent = 0;

// logic for 'clear' button:
let clickedClear;

const clearCalc = document.querySelector('.clear-calc');
clearCalc.addEventListener('click', () => {
    clickedClear = true;
    updateDisplay();
    clickedClear = false;
});

// declare global variables for calculator logic:
let clickedNumber;
let clickedOperator;
let displayValue = displayField.textContent;
let firstClick = true;
let lastClicked = '';
let storedValue;
let storedOperator;
let tempValue;
let lastOperator;

// add event listeners for numbers:
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
        clickedNumber = document.querySelector('.clicked').textContent;
        number.classList.remove('clicked');
        
        updateDisplay();
    });
});

// add listeners for operators:
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

        if (clickedOperator === '+') {
            clickedOperator = add;
        } else if (clickedOperator === '-') {
            clickedOperator = subtract;
        } else if (clickedOperator === 'x') {
            clickedOperator = multiply;
        } else if (clickedOperator === '÷') {
            clickedOperator = divide;
        }
        operator.classList.remove('clicked');
        updateDisplay();
    });
});

// main logic of the calculator:
function updateDisplay() {

    // reset calculator if the user clicks 'clear':
    if (clickedClear) {
        displayField.textContent = '0';
        clickedNumber = '';
        clickedOperator = '';
        firstClick = true;
        lastClicked = '';
        storedValue = '';
        storedOperator = '';
        tempValue = '';
        lastOperator = '';
        return;
    }

    // convert the display to a number and store it in 'displayValue':
    displayValue = parseFloat(displayField.textContent);
    
    // display an error if the user attempts to divide by 0:
    if (clickedNumber === '0' && lastClicked === divide) {
        displayField.textContent = 'ERROR';
        clickedNumber = '';
        clickedOperator = '';
        firstClick = true;
        lastClicked = '';
        storedValue = '';
        storedOperator = '';
        tempValue = '';
        lastOperator = '';
        return;
    }

    // possible outcomes if the user clicks a number:
    if (clickedNumber) {

        if (lastClicked === '=' && lastOperator) {
            lastOperator = '';
        }

        if (!firstClick && typeof parseFloat(lastClicked) === 'number') {
            displayField.textContent += clickedNumber;
        }

        if (firstClick) {
            displayField.textContent = clickedNumber;
            firstClick = false;
        }

        if (lastClicked === add || lastClicked === subtract || lastClicked === multiply || lastClicked === divide) {
            storedValue = displayValue;
            displayField.textContent = clickedNumber;
        }

        if (lastClicked === '=') {
            tempValue = '';
            displayField.textContent = clickedNumber;
        }

    lastClicked = clickedNumber;
    clickedNumber = '';

    }

    // possible outcomes if user clicks an operator:
    if (clickedOperator) {

        if (clickedOperator !== '=') {

            if (lastClicked === add || lastClicked === subtract || lastClicked === divide || lastClicked === multiply) {
                storedOperator = clickedOperator;
                lastClicked = clickedOperator;
                lastOperator = clickedOperator;
                clickedOperator = '';
                return;
            }

            if ( storedOperator && typeof parseFloat(lastClicked) === 'number') {
                displayField.textContent = operate(storedOperator, storedValue, displayValue);
                storedOperator = clickedOperator;
                lastOperator = clickedOperator;
            }
    
            if ( (!lastClicked && !storedOperator) || (lastClicked = 'clear') || (storedOperator && (lastClicked === add || lastClicked === subtract || lastClicked === divide || lastClicked === multiply)) || (!storedOperator && typeof parseFloat(lastClicked) === 'number') ) {
                storedOperator = clickedOperator;
                lastOperator = clickedOperator;
            }
    
            // this can be combined with the one above it
            // if (!storedOperator && typeof parseFloat(lastClicked) === 'number') {
            //     storedOperator = clickedOperator;
            //     lastOperator = clickedOperator;
            // }

        }

        // if the user clicks equals...
        if (clickedOperator === '=') {

            if (clickedOperator === '=' && storedOperator && storedValue) {
                tempValue = parseFloat(displayField.textContent);
                displayField.textContent = operate(storedOperator, storedValue, displayValue);
                storedOperator = '';
                storedValue = '';     
            }

            if (clickedOperator === '=' && ( (storedOperator && !storedValue) || (!storedOperator && !storedValue && lastClicked === '=') ) ) {
                if (!tempValue) {
                    tempValue = parseFloat(displayField.textContent);
                }
                displayField.textContent = operate(lastOperator, displayValue, tempValue);
            }
    
        }

        // make the just-clicked operator the new 'lastClicked', then clear out the 'clickedOperator' variable:
        lastClicked = clickedOperator;
        clickedOperator = '';
    }        
}

// mathematical functions:

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    return operator(x, y);
}
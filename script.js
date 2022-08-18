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
let storedOperator;
let displayValue = displayField.textContent;
let clickedOperator;
let clickedNumber;
let firstClick = true;
let clickedEquals = false;
let lastClicked = '';
let error = false;

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
        // clickedNumber = lastClick;
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

function updateDisplay() {

    displayValue = displayField.textContent;
    
    if (clickedNumber) {

        if (!firstClick && typeof parseFloat(lastClicked) === 'number') {
            displayField.textContent += clickedNumber;
        }

        if (firstClick) {
            displayField.textContent = clickedNumber;
            firstClick = false;
        }

        if (lastClicked === add || lastClicked === subtract || lastClicked === multiply || lastClicked === divide) {
            storedValue = displayField.textContent;
            displayField.textContent = clickedNumber;
        }

        if (lastClicked === '=') {
            tempValue = '';
            displayField.textContent = clickedNumber;
        }

    lastClicked = clickedNumber;
    clickedNumber = '';

    }

    if (clickedOperator) {

        if ( (!lastClicked && !storedOperator) || (lastClicked = 'clear') || (storedOperator && (lastClicked === add || lastClicked === subtract || lastClicked === divide || lastClicked === multiply)) ) {
            storedOperator = clickedOperator;
            alert('ONE TRIGGERED');
        }

        // if this works it can be combined with the one above it
        if (!storedOperator && typeof parseFloat(lastClicked) === 'number') {
            storedOperator = clickedOperator;
            alert('TWO TRIGGERED');
        }

        if (storedOperator && typeof parseFloat(lastClicked) === 'number') {
            displayField.textContent = operate(storedOperator, storedValue, displayValue);
            storedOperator = clickedOperator;
            alert('3 TRIGGERED');
        }

        if (clickedOperator === '=' && storedOperator && storedValue) {
            tempValue = displayField.textContent;
            displayField.textContent = operate(storedOperator, storedValue, displayValue);
            storedOperator = '';
            alert('4 TRIGGERED');
        }

        if (clickedOperator === '=' && storedOperator && !storedValue) {
            if (!tempValue) {
                tempValue = displayField.textContent;
            }
            displayField.textContent = operate(storedOperator, tempValue, displayValue);
            alert('5 TRIGGERED');
        }

        if (clickedOperator === '=' && !storedOperator && !storedValue) {
            console.log('nothing happened');
            alert('6 TRIGGERED');
        }

        lastClicked = clickedOperator;
        clickedOperator = '';

    }
        
}


        // new attempt:

        // if (firstClick) {
        //     displayField.textContent = clickedNumber;
        //     firstClick = false;
        // } else if (displayField.textContent === '+' || displayField.textContent === '-' || displayField.textContent === 'x' || displayField.textContent === '÷' ) {
        //     displayField.textContent = '';   
        //     displayField.textContent += clickedNumber;
        // } else {
        //     displayField.textContent += clickedNumber;
        // }


        // first version:

        // if (previousValue === '0' && !(storedValue)) {
        //     firstClick = true;
        //     displayField.textContent = clickedNumber;
        // }
        // else if ( ( (storedValue) && (parseFloat(displayField.textContent) === storedValue) ) || ( (!storedValue) && (displayField.textContent) && (firstClick) ) ) {
        //     firstClick = false;
        //     displayField.textContent = '';
        //     displayField.textContent = clickedNumber;
        // }
        // else if (clickedOperator === '=') {
        //     clickedEquals = true;
        //     clickedOperator = '';
        //     displayField.textContent = '';
        //     displayField.textContent = clickedNumber;
        // } else {
        //     displayField.textContent += clickedNumber;
        // }
    //});
//});




        //new attempt:

        // if (!lastClick && clickedOperator !== '=') {
        //     if (clickedOperator === '+') {
        //         lastClick = '+';
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = add;
        //     } else if (clickedOperator === '-') {
        //         lastClick = '-';
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = subtract;
        //     } else if (clickedOperator === 'x') {
        //         lastClick = 'x';
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = multiply;
        //     } else if (clickedOperator === '÷') {
        //         lastClick = '÷';
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = divide;
        //     }
        // } else if (!lastClick && clickedOperator === '=') {
        //     lastClick = '=';
        //     storedValue = parseFloat(displayField.textContent);
        // } else if ( (lastClick === '+' || lastClick === '-' || lastClick === 'x' || lastClick === '÷') && 
        //             (clickedOperator === '=' || clickedOperator === '+' || clickedOperator === '-' || clickedOperator === 'x' || clickedOperator === '÷') ) {
        //     displayField.textContent = 'ERROR';
        //     error = true;
        // } else {
        //     if (clickedOperator === '+') {
        //         lastClick = '+';
        //         storedValue = parseFloat(displayField.textContent);
        //         displayField.textContent = '+';
        //         chosenOperator = add;
        //     } else if (clickedOperator === '-') {
        //         lastClick = '-';
        //         storedValue = parseFloat(displayField.textContent);
        //         displayField.textContent = '-';
        //         chosenOperator = subtract;
        //     } else if (clickedOperator === 'x') {
        //         lastClick = 'x';
        //         storedValue = parseFloat(displayField.textContent);
        //         displayField.textContent = 'x';
        //         chosenOperator = multiply;
        //     } else if (clickedOperator === '÷') {
        //         lastClick = '÷';
        //         storedValue = parseFloat(displayField.textContent);
        //         displayField.textContent = '÷';
        //         chosenOperator = divide;
        //     }
        // }

        // first version:
        // if (!storedValue) {
        //     if (clickedOperator === '+') {
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = add;
        //     } else if (clickedOperator === '-') {
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = subtract;
        //     } else if (clickedOperator === 'x') {
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = multiply;
        //     } else if (clickedOperator === '÷') {
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = divide;
        //     }
        // } else if (storedValue) {
        //     if (clickedOperator === '+') {
        //         displayValue = parseFloat(displayField.textContent);
        //         displayField.textContent = operate(chosenOperator,displayValue,storedValue);
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = add;
        //     } else if (clickedOperator === '-') {
        //         displayValue = parseFloat(displayField.textContent);
        //         displayField.textContent = operate(chosenOperator,displayValue,storedValue);
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = subtract;
        //     } else if (clickedOperator === 'x') {
        //         displayValue = parseFloat(displayField.textContent);
        //         displayField.textContent = operate(chosenOperator,displayValue,storedValue);
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = multiply;
        //     } else if (clickedOperator === '÷') {
        //         displayValue = parseFloat(displayField.textContent);
        //         displayField.textContent = operate(chosenOperator,displayValue,storedValue);
        //         storedValue = parseFloat(displayField.textContent);
        //         chosenOperator = divide;
        //     }
        // } if (clickedOperator === '=') {
        //     if (clickedEquals === true) {
        //         chosenOperator = '';
        //     } else {
        //     clickedEquals = true;
        //     displayValue = parseFloat(displayField.textContent);
        //     displayField.textContent = operate(chosenOperator,displayValue,storedValue);
        //     storedValue = '';
        //     }
        // }

    


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
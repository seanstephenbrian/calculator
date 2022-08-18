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

let clickedNumber;
let clickedOperator;
let displayValue = displayField.textContent;
let firstClick = true;
let lastClicked = '';
let storedValue;
let storedOperator;
let tempValue;

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

    displayValue = parseFloat(displayField.textContent);
    
    if (clickedNumber) {

        if (!firstClick && typeof parseFloat(lastClicked) === 'number') {
            displayField.textContent += clickedNumber;
        }

        if (firstClick) {
            displayField.textContent = clickedNumber;
            firstClick = false;
        }

        if (lastClicked === add || lastClicked === subtract || lastClicked === multiply || lastClicked === divide) {

            storedValue = displayValue;

            console.log({storedValue});
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

        if (clickedOperator !== '=') {

            if ( storedOperator && typeof parseFloat(lastClicked) === 'number') {
                console.log('three triggered');
    
                displayField.textContent = operate(storedOperator, storedValue, displayValue);
                storedOperator = clickedOperator;
            }
    
            if ( (!lastClicked && !storedOperator) || (lastClicked = 'clear') || (storedOperator && (lastClicked === add || lastClicked === subtract || lastClicked === divide || lastClicked === multiply)) ) {
                console.log('one triggered');
    
                storedOperator = clickedOperator;
            }
    
            // if this works it can be combined with the one above it
            if (!storedOperator && typeof parseFloat(lastClicked) === 'number') {
                console.log('two triggered');
    
                storedOperator = clickedOperator;
            }
    
        }

        if (clickedOperator === '=') {

            if (clickedOperator === '=' && storedOperator && storedValue) {
                console.log('four triggered');
    
                tempValue = parseFloat(displayField.textContent);
                console.log({storedOperator});
                console.log({storedValue});
                console.log({displayValue});
                displayField.textContent = operate(storedOperator, storedValue, displayValue);
                storedOperator = '';     
            }

            if (clickedOperator === '=' && storedOperator && !storedValue) {
                console.log('TARGET triggered');
                console.log(tempValue);
    
                if (!tempValue) {
                    tempValue = parseFloat(displayField.textContent);
                }
                displayField.textContent = operate(storedOperator, tempValue, displayValue);
            }
    
            if (clickedOperator === '=' && !storedOperator && !storedValue) {
                console.log('nothing happened');
            }
    
        }

        lastClicked = clickedOperator;
        clickedOperator = '';

    }        
}

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
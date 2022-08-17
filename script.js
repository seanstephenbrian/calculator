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
        let previousValue = displayField.textContent;
        if (previousValue === '0') {
            displayField.textContent = '';
        }
        displayField.textContent += clickedNumber;
        number.classList.remove('clicked');
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
    });
});



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
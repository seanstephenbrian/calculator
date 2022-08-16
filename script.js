const header = document.querySelector('.header-text');
header.textContent = 'calc';
header.classList.add('calc');
header.addEventListener('mouseover', () => {
    header.textContent = 'CALCULATE:::';
    header.classList.remove('calc');
    header.classList.add('calculate');
});
header.addEventListener('mouseout', () => {
    header.textContent = 'calc';
    header.classList.remove('calculate');
    header.classList.add('calc');
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
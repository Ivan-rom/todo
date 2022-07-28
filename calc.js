const calcForm = document.querySelector('.calculator__form');
const fstNum = document.getElementById('first-num');
const secNum = document.getElementById('second-num');
let result = document.querySelector('.res_count');
function calc(event) {
    event.preventDefault();

    const fstNumText = fstNum.value;
    const secNumText = secNum.value;

    const btn = event.target.closest('.calc-btn');
    if (btn) {
        const resultText = eval(`${fstNumText} ${btn.value} ${secNumText}`);
        result.textContent = resultText;
    }
}
calcForm.addEventListener('click', calc);
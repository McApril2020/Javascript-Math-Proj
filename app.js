const problemtElement = document.querySelector('.demo');
const ourForm = document.querySelector('.our-form');
const ourField = document.querySelector('.our-field');
const pointsNeeded = document.querySelector('.point-needed');
const mistake = document.querySelector('.mistake');
const inner = document.querySelector('.inner');
const endMessage = document.querySelector('.end-message');
const start = document.querySelector('.start');

let state = {
    score: 0,
    wrongAnswer:0
}

function updateProb() {
    state.currentProb = generateProblem();
    problemtElement.innerHTML =`
        ${state.currentProb.numberOne}
        ${state.currentProb.operato}
        ${state.currentProb.numberTwo}
    `
    ourField.value = "";
    ourField.focus();
}

updateProb()

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

function generateProblem() {
    return {
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operato: ['+', '-', 'x'][generateNumber(2)]
    }
}

ourForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let correctAnswer;
    const prob = state.currentProb;

    if(prob.operato == "+") correctAnswer = prob.numberOne + prob.numberTwo; 
    if(prob.operato == "-") correctAnswer = prob.numberOne - prob.numberTwo; 
    if(prob.operato == "x") correctAnswer = prob.numberOne * prob.numberTwo; 

    if(parseInt(ourField.value, 10) === correctAnswer) {
        state.score++;
        pointsNeeded.textContent = 10 - state.score;
        updateProb();
        innerGreen();
    } else {
        state.wrongAnswer++
        mistake.textContent = 2 - state.wrongAnswer;
        problemtElement.classList.add('animate-wrong');
        setTimeout(() => problemtElement.classList.remove('animate-wrong'), 551);
        updateProb();
    }
    checkGame();
});

function checkGame() {
    if(state.score === 10) {
        endMessage.textContent = "Congrats You Won!";
        document.body.classList.add('top-overlay');
        setTimeout(() => start.focus(), 331)
    }

    if(state.wrongAnswer === 3) {
        endMessage.textContent = "Sorry You Lost";
        document.body.classList.add('top-overlay');
        setTimeout(() => start.focus(), 331)
    }
}

start.addEventListener('click', resetGame)

function resetGame() {
    document.body.classList.remove('top-overlay')
    updateProb();
    state.score = 0;
    state.wrongAnswer = 0;
    pointsNeeded.textContent = 10;
    mistake.textContent = 2;
    innerGreen();
}

function innerGreen() {
    inner.style.transform = `scaleX(${state.score / 10})`;
}
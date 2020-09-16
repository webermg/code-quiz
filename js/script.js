import {questions} from "./questions.js";

//variables
const timeSection = document.querySelector(".time");
const heading = document.getElementById("heading");
const textArea = document.querySelector(".text");
const startButton = document.querySelector(".start-button");
const buttonsArea = document.querySelector(".buttons");
const buttons = buttonsArea.children;
const scoreForm = document.querySelector(".score-entry");
const scoreList = document.querySelector(".high-scores");
const scoreListButtons = document.querySelector(".score-buttons");
const status = document.getElementById("status");
let index = 0;

const init = () => {
    timeSection.textContent = "0";
    hideButtons();
}

const hideButtons = () => {
    for (const item of buttons) {
        item.style.display = "none";
    }
}

//sets display to question indicated by index
const renderQuestion = qNum => {
    textArea.textContent = questions[qNum][0];
    for(let j = 0; j < buttons.length; j++) {
        if(questions[qNum][1][j]) {
            buttons[j].textContent = questions[qNum][1][j];
            buttons[j].style.display = "block";
        }
        else buttons[j].style.display = "none";
    }
}

startButton.addEventListener("click", () => {
    document.getElementById("heading").style.display = "none";
    startButton.style.display = "none";
    
    renderQuestion(index);
    
});

buttonsArea.addEventListener("click", (e) => {
    if(!e.target.matches("button") || index >= questions.length) return;
    const answer = e.target.textContent;
    if(answer === questions[index][2]) status.textContent = "right";
    else status.textContent = "wrong";
    index++;
    if(index < questions.length) renderQuestion(index);
    else renderScoreSubmission();
});

scoreForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    //add score to storage
    let initials = document.getElementById("entry").value;
    console.log(initials);

    //render page
    renderHighScores();
});

const renderScoreSubmission = () => {
    heading.textContent = "All Done";
    heading.style.display = "block";

    textArea.textContent = `Your final score was ${timeSection.textContent}`;
    hideButtons();

    scoreForm.style.display = "block";
}

const renderHighScores = () => {
    heading.textContent = "High Scores";
    textArea.style.display = "none";
    scoreForm.style.display = "none";
    hideButtons();
    scoreList.style.display = "block";
    scoreListButtons.style.display = "block";

}

init();
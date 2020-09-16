import {questions} from "./questions.js";

//variables
const timeSection = document.querySelector(".time");
const textArea = document.querySelector(".text");
const startButton = document.querySelector(".start-button");
const buttonsArea = document.querySelector(".buttons");
const buttons = buttonsArea.children;
let index = 0;

const init = () => {
    timeSection.textContent = "0";
    for (const item of buttons) {
        item.style.display = "none";
    }
}

startButton.addEventListener("click", () => {
    document.getElementById("heading").style.display = "none";
    startButton.style.display = "none";
    
    textArea.textContent = questions[index][0];
    for(let j = 0; j < buttons.length; j++) {
        if(questions[index][1][j]) {
            buttons[j].innerHTML = questions[index][1][j];
            buttons[j].style.display = "block";
        }
        else buttons[j].style.display = "none";
    }
    
});

init();
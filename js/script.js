import {questions} from "./questions.js";

//variables
const timeSection = document.querySelector(".time");
const buttons = document.querySelector(".buttons");

const init = () => {
    timeSection.textContent = "0";
    for (const item of buttons.children) {
        item.style.display = "none";
    }
}

init();
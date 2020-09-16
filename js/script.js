import { questions } from "./questions.js";

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
let highscores;
let time;
let index;

const introText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";

const init = () => {
    document.getElementById("highscore-link").textContent = "View Highscores";
    timeSection.textContent = "0";
    heading.textContent = "Coding Quiz Challenge";
    heading.style.display = "block";
    textArea.textContent = introText;
    textArea.style.display = "block";
    startButton.style.display = "block";
    hideButtons();
    document.querySelector(".high-score-area").style.display = "none";
    index = 0;
    time = 60;
}

const hideButtons = () => {
    for (const item of buttons) {
        item.style.display = "none";
    }
}

//sets display to question indicated by index
const renderQuestion = qNum => {
    textArea.textContent = questions[qNum][0];
    for (let j = 0; j < buttons.length; j++) {
        if (questions[qNum][1][j]) {
            buttons[j].textContent = questions[qNum][1][j];
            buttons[j].style.display = "block";
        }
        else buttons[j].style.display = "none";
    }
}

startButton.addEventListener("click", () => {
    document.getElementById("heading").style.display = "none";
    startButton.style.display = "none";
    timeSection.textContent = time;
    setTime();
    shuffle(questions);
    renderQuestion(index);

});

buttonsArea.addEventListener("click", (e) => {
    if (!e.target.matches("button") || index >= questions.length) return;
    const answer = e.target.textContent;
    if (answer === questions[index][2]) status.textContent = "right";
    else {
        time -= 5;
        timeSection.textContent = time;
        status.textContent = "wrong";
    }
    setTimeout(() => {
        status.textContent = "";
    }, 1000);
    index++;
    if (index < questions.length) renderQuestion(index);
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
    document.getElementById("highscore-link").textContent = "";
    heading.textContent = "High Scores";
    heading.style.display = "block"
    textArea.style.display = "none";
    startButton.style.display = "none";
    scoreForm.style.display = "none";
    hideButtons();
    document.querySelector(".high-score-area").style.display = "block";
    // scoreList.style.display = "block";
    // scoreListButtons.style.display = "block";

}

document.getElementById("highscore-link").addEventListener("click", () => {
    time = 0;
    timeSection.textContent = time;
    //clearInterval(timer);
    renderHighScores();
});
document.querySelector(".go-back").addEventListener("click", init);

const setTime = () => {
    let timer = setInterval(function () {
        if (time === 0 || index >= questions.length) {
            clearInterval(timer);
            return;
        }
        time--;
        timeSection.textContent = time;



    }, 1000);
}

//shuffles all entries in an array
const shuffle = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        const other = Math.floor(Math.random() * i);
        const temp = arr[other];
        arr[other] = arr[i];
        arr[i] = temp;
    }
};

init();
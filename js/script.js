//contains questions and answers
import { questions } from "./questions.js";

//variables
const timeSection = document.querySelector(".time");
const heading = document.getElementById("heading");
const textArea = document.querySelector(".text");
const startButton = document.querySelector(".start-button");
const buttonsArea = document.querySelector(".buttons-area");
const buttons = buttonsArea.children;
const scoreForm = document.querySelector(".score-entry");
const scoreTable = document.querySelector(".high-scores");
const scoreListButtons = document.querySelector(".score-buttons");
const status = document.getElementById("status");
let time;
let index;

const introText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
const tableHeaderText = "<tr class=\"header-row\"><th>Initials</th><th>Score</th></tr>"
const startTime = 75;

//sets the initial view of the page.
const init = () => {
    document.getElementById("highscore-link").style.display = "inline-block";
    timeSection.textContent = "0";
    heading.textContent = "Coding Quiz Challenge";
    heading.style.display = "block";
    textArea.textContent = introText;
    textArea.style.display = "block";
    startButton.style.display = "block";
    buttonsArea.style.display = "none";
    document.querySelector(".high-score-area").style.display = "none";
    index = 0;
    time = startTime;
}

//hides the quiz buttons
const hideButtons = () => {
    for (const item of buttons) {
        item.style.display = "none";
    }
}

//sets display to question indicated by index
const renderQuestion = qNum => {
    textArea.textContent = questions[qNum][0];
    buttonsArea.innerHTML = "";
    for (let j = 0; j < questions[qNum][1].length; j++) {
        let button = document.createElement("button");
        button.textContent = questions[qNum][1][j];
        buttonsArea.append(button);


        if (questions[qNum][1][j]) {
            buttons[j].textContent = questions[qNum][1][j];
            buttons[j].style.display = "block";
        }
        else buttons[j].style.display = "none";
    }
}

//runs the timer and displays first question
startButton.addEventListener("click", () => {
    document.getElementById("heading").style.display = "none";
    startButton.style.display = "none";
    timeSection.textContent = time;
    setTime();
    shuffle(questions);
    buttonsArea.style.display = "block";
    renderQuestion(index);

});

//tests answer for correctness and loads next question or score submission
//page if no more questions
buttonsArea.addEventListener("click", (e) => {
    if (!e.target.matches("button") || index >= questions.length) return;
    const answer = e.target.textContent;
    if (answer === questions[index][2]) {
        status.textContent = "Correct";
        status.style.color = "green";
    }
    else {
        time -= 10;
        if(time <= 0) {
            renderScoreSubmission();
            time = 0;
            index = 10;
        }
        timeSection.textContent = time;
        status.textContent = "wrong";
        status.style.color = "red";
    }
    document.querySelector(".status-area").style.borderTop = "1px solid grey";
    setTimeout(() => {
        status.textContent = "";
        document.querySelector(".status-area").style.borderTop = "";
    }, 500);
    index++;
    if (index < questions.length) renderQuestion(index);
    else renderScoreSubmission();
});

//tests for input and if so adds high scores and displays score page
scoreForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //add score to storage
    let initials = document.getElementById("entry").value;
    if(initials.trim() != "") {
        document.getElementById("entry").value = "";
        let scores = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];
        scores.push(`${initials}:${time}`);
        localStorage.setItem("scores",JSON.stringify(scores));
    }
    //render page
    renderHighScores();
});

//shows the score submission page
const renderScoreSubmission = () => {
    heading.textContent = "All Done";
    heading.style.display = "block";

    textArea.textContent = `Your final score was ${timeSection.textContent}`;
    buttonsArea.style.display = "none";

    scoreForm.style.display = "block";
}

//shows the high scores page
const renderHighScores = () => {
    document.getElementById("highscore-link").style.display = "none";
    heading.textContent = "High Scores";
    heading.style.display = "block"
    textArea.style.display = "none";
    startButton.style.display = "none";
    scoreForm.style.display = "none";
    buttonsArea.style.display = "none";
    
    //load scores
    scoreTable.innerHTML = tableHeaderText;
    let scores = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];
    for (let i = 0; i < scores.length; i++) {
        let score = scores[i].split(":");
        let nameEl = document.createElement("td");
        let scoreEl = document.createElement("td");
        nameEl.textContent = score[0];
        scoreEl.textContent = score[1];
        let newRow = document.createElement("tr");
        newRow.append(nameEl);
        newRow.append(scoreEl);
        scoreTable.append(newRow);
    }

    document.querySelector(".high-score-area").style.display = "block";
}

//cancels a quiz in session and jumps to high scores page
document.getElementById("highscore-link").addEventListener("click", () => {
    time = 0;
    index = questions.length;
    timeSection.textContent = time;
    renderHighScores();
});

//resets the page
document.querySelector(".go-back").addEventListener("click", init);

//clears the table display and removes the scores from storage
document.querySelector(".clear").addEventListener("click", () => {
    scoreTable.innerHTML = tableHeaderText;
    localStorage.removeItem("scores");
});

//timer function
const setTime = () => {
    let timer = setInterval(function () {
        if (time <= 0 || index >= questions.length) {
            clearInterval(timer);
            if(index < questions.length) renderScoreSubmission();
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
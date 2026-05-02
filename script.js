let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let typingBox = document.getElementById("typingBox");

let timeText = document.getElementById("timeLeft");
let statusText = document.getElementById("testStatus");

let givenText = document.getElementById("givenText").innerText;

let wpmText = document.getElementById("wpmResult");
let accuracyText = document.getElementById("accuracyResult");
let mistakeText = document.getElementById("mistakeResult");
let charText = document.getElementById("charResult");

let totalTime = 30;
let timeLeft = 30;

let timerRunning = false;
let timerInterval = null;


startBtn.onclick = function () {
    if (timerRunning === false) {
        startTest();
    }
};


typingBox.addEventListener("input", function () {

    let currentLength = typingBox.value.length;

    if (currentLength > 0) {
        if (timerRunning === false) {
            startTest();
        }
    }

});


function startTest() {

    timerRunning = true;
    statusText.innerText = "Running";

    runTimer();

}


function runTimer() {

    timerInterval = setInterval(function () {

        if (timeLeft > 0) {
            timeLeft = timeLeft - 1;
            timeText.innerText = timeLeft;
        }

        if (timeLeft === 0) {
            finishTest();
        }

    }, 1000);

}


function finishTest() {

    clearInterval(timerInterval);
    timerRunning = false;
    statusText.innerText = "Finished";

    calculateResult();

}


function calculateResult() {

    let typedText = typingBox.value;

    let correctChars = 0;
    let mistakes = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === givenText[i]) {
            correctChars = correctChars + 1;
        } else {
            mistakes = mistakes + 1;
        }

    }

    let totalChars = typedText.length;

    let accuracy = 0;

    if (totalChars > 0) {
        accuracy = (correctChars / totalChars) * 100;
    }

    let wordsTyped = typedText.trim().split(" ").length;

    let timeInMinutes = totalTime / 60;

    let wpm = Math.round(wordsTyped / timeInMinutes);

    wpmText.innerText = wpm;
    accuracyText.innerText = Math.round(accuracy) + "%";
    mistakeText.innerText = mistakes;
    charText.innerText = totalChars;

}
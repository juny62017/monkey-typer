let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let typingBox = document.getElementById("typingBox");

let timeText = document.getElementById("timeLeft");
let statusText = document.getElementById("testStatus");

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

}
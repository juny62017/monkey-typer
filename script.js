let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let typingBox = document.getElementById("typingBox");

let timeText = document.getElementById("timeLeft");
let statusText = document.getElementById("testStatus");

let givenTextElement = document.getElementById("givenText");

let wpmText = document.getElementById("wpmResult");
let accuracyText = document.getElementById("accuracyResult");
let mistakeText = document.getElementById("mistakeResult");
let charText = document.getElementById("charResult");

let paragraphs = [
    "Typing regularly can improve your speed and accuracy over time if you stay consistent and focused.",
    "Practice every day for a few minutes and you will see a big improvement in your typing skills.",
    "Avoid looking at the keyboard and try to build muscle memory for better typing performance.",
    "Consistency matters more than speed in the beginning so focus on typing correctly first.",
    "A calm mind and steady rhythm will help you achieve better results in typing tests.",
    "Sleepover is the best even of whole Hackclub and I really love it .. thankyou"
];

let totalTime = 30;
let timeLeft = 30;

let timerRunning = false;
let timerInterval = null;

changeParagraph();

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

resetBtn.onclick = function () {
    resetTest();
};

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
        if (typedText[i] === givenTextElement.innerText[i]) {
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

function resetTest() {
    clearInterval(timerInterval);

    timeLeft = totalTime;
    timerRunning = false;

    typingBox.value = "";
    timeText.innerText = totalTime;
    statusText.innerText = "Not started";

    wpmText.innerText = "0";
    accuracyText.innerText = "0%";
    mistakeText.innerText = "0";
    charText.innerText = "0";

    changeParagraph();
}

function changeParagraph() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    givenTextElement.innerText = paragraphs[randomIndex];
}
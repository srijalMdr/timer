// script.js
let timer = null;
let minutes = 15;
let seconds = 0;
let isPaused = false;
let enteredTime = null;

const timerElement = document.getElementById("timer");
const pauseResumeButton = document.querySelector(".control-buttons button");

const btnPause = document.querySelector(".pause");
const btnRestart = document.querySelector(".restart");
const btnChooseTime = document.querySelector(".chooseTime");

const changeColor = function (bodyC, mainC) {
  document.querySelector("body").style.backgroundColor = `${bodyC}`;
  document.querySelector(".main").style.backgroundColor = `${mainC}`;
};

const startTimer = function () {
  //   timer = setInterval(updateTimer, 1000);
  if (!timer) {
    timer = setInterval(updateTimer, 1000);
    changeColor("#86c232", "#A9C46C");
  }
};

const updateTimer = function () {
  timerElement.textContent = formatTime(minutes, seconds);
  if (minutes === 0 && seconds === 0) {
    alert("Time is up");
    chooseTime();
  } else if (!isPaused) {
    if (seconds > 0) {
      seconds--;
    } else {
      seconds = 59;
      minutes--;
    }
  }
};

function formatTime(minutes, seconds) {
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function togglePauseResume() {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(timer);
    timer = null;
    pauseResumeButton.textContent = "Resume";
    changeColor("#ED2B2A", "#F15A59");
  } else {
    startTimer();
    pauseResumeButton.textContent = "Pause";
  }
}

function restartTimer() {
  clearInterval(timer);
  timer = null;
  minutes = enteredTime || 15;
  seconds = 0;
  isPaused = false;
  timerElement.textContent = formatTime(minutes, seconds);
  pauseResumeButton.textContent = "Pause";
  startTimer();
}

function chooseTime() {
  const newTime = prompt("Enter your desigered time in minutes");
  enteredTime = parseInt(newTime);
  console.log(newTime);
  console.log(enteredTime);

  if (!isNaN(enteredTime) && enteredTime > 0) {
    minutes = enteredTime;
    seconds = 0;
    isPaused = false;
    timerElement.textContent = formatTime(minutes, seconds);
    pauseResumeButton.textContent = "Pause";
    startTimer();
  } else {
    alert("Invalid input: Please enter number greater than 0");
  }
}

btnPause.addEventListener("click", function () {
  console.log("clicked");
  togglePauseResume();
});

btnChooseTime.addEventListener("click", function () {
  console.log("c");
  chooseTime();
});

btnRestart.addEventListener("click", function () {
  console.log("r");
  restartTimer();
});
startTimer();

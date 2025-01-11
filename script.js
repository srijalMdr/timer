// script.js
let timer = null;
let minutes = 15;
let seconds = 0;
let isPaused = false;
let enteredTime = null;

const timerElement = document.getElementById("timer");
const pauseResumeButton = document.querySelector(".control-buttons button");

function startTimer() {
  //   timer = setInterval(updateTimer, 1000);
  if (!timer) {
    timer = setInterval(updateTimer, 1000);
    document.querySelector("body").style.backgroundColor = "#86c232";
  }
}

function updateTimer() {
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
}

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
    // document.querySelector("body").style.backgroundColor = "#D84040";
    document.querySelector("body").style.backgroundColor = "#e43d12";
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

startTimer();

const input = document.querySelector(".input");
const hint = document.querySelector(".hint span");
const wrong = document.querySelector(".wrong span");
const inputbar = document.querySelector(".inputbar");
let time = document.querySelector(".timer");
const timeColor = document.querySelector(".time");
const congrats = document.querySelector(".congrats");
const card = document.querySelector(".card");
const lost = document.querySelector(".fail");
const message = document.querySelector(".message");
const points = document.querySelector(".points");
const levelNo = document.querySelector(".levelNo");
const stage = document.querySelector(".stage");
const startBtn = document.querySelector(".start-btn");
const description = document.querySelector(".description");
const userDetails = document.querySelector(".userDetails");
const userName = document.querySelector(".userName");
const totalTime = document.querySelector(".totalTime");
const play_again = document.querySelector(".playAgain");
const minTimeValue = document.querySelector(".minTimeValue");
const totTym = document.querySelector(".totTym");
const canvas = document.getElementById("hangman");
const context = canvas.getContext("2d");
const scoreboard = document.querySelector(".scoreboard");
const board = document.querySelector(".board");
var best_time;
var totTime = 0;
var sortedBestTime = {};
var drawHangmanImg = 0;
var names = [];
var timeTaken = [];
var riddle3 = 0;
var riddle4 = 0;
var riddle5 = 0;
var point = 0;
var tcount = 0;
var no_of_chance = 0;
var word;
var guessCount;
var wrongLetters = [];
var randRiddel;
var interval;
var key;
var correctLetters = [];
var bestTime = {};
specialChar = [
  "!",
  "@",
  "#",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "=",
  "+",
  "/",
  "?",
  ",",
  ".",
  "'",
  '"',
];
if (localStorage.getItem("bestTime")) {
  bestTime = JSON.parse(localStorage.getItem("bestTime"));
}

if (localStorage.getItem("minTime")) {
  best_time = parseFloat(localStorage.getItem("minTime"));
  minTimeValue.innerHTML = best_time;
}

function start() {
  if (userName.value != "") {
    tcount = 0;
    totTime = 0;
    drawHangmanImg = 0;
    names.push(userName.value);
    canvas.style.display = "block";
    levelCheck(1, point, tcount);
    interval2 = setInterval(totalTimeTaken, 1000);
    userDetails.style.display = "none";
    card.style.display = "block";
    inputbar.addEventListener("input", inputLetter);
    input.addEventListener("click", () => inputbar.focus());
    document.addEventListener("keydown", () => inputbar.focus());
    setTimeout(createRiddleFor3Letters(), 3000);
  } else {
    userName.style.border = "2px solid red";
  }
}
function levelCheck(levelNum, point) {
  stage.style.display = "block";
  totTym.style.display = "block";
  if (levelNum == 1) {
    levelNo.innerHTML = " 1 ";
    if (point == 3) {
      levelNum++;
      setTimeout(() => {
        levelNo.innerHTML = " 2 ";
      }, 2000);
      createRiddleFor4Letters();
    } else if (point < 3) {
      createRiddleFor3Letters();
    }
  } else if (levelNum == 2) {
    if (point == 6) {
      levelNum++;
      setTimeout(() => {
        levelNo.innerHTML = " 3 ";
      }, 2000);
      createRiddleFor5Letters();
    } else {
      createRiddleFor4Letters();
    }
  } else if (levelNum == 3) {
    if (point == 9) {
      levelNo.innerHTML = " 3 Completed";
      clearInterval(interval2);
      congrats.style.display = "none";
      play_again.style.display = "block";
      timeTaken.push(totTime);
      bestTiming();
      scoreboard.style.display = "block";
    } else {
      createRiddleFor5Letters();
    }
  }
}

const usedRiddles = new Set();
function createRiddleFor3Letters() {
  clearInterval(interval);
  riddle3++;
  randRiddel = getRandomRiddle(list_of_3_letters);
  createRiddle();
}

function createRiddleFor4Letters() {
  clearInterval(interval);
  riddle4++;
  randRiddel = getRandomRiddle(list_of_4_letters);
  createRiddle();
}

function createRiddleFor5Letters() {
  clearInterval(interval);
  riddle5++;
  randRiddel = getRandomRiddle(list_of_5_letters);
  createRiddle();
}
function getRandomRiddle(arr) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * arr.length);
  } while (usedRiddles.has(randomIndex));
  usedRiddles.add(randomIndex);
  if (usedRiddles.size === arr.length) {
    usedRiddles.clear();
  }
  return arr[randomIndex];
}

function createRiddle() {
  handleDisplay(1);
  drawHangmanImg = 0;
  drawHangman(0);
  tcount = 0;
  interval = setInterval(timer, 1000);
  word = randRiddel.word;
  guessCount = 8;
  wrongLetters = [];
  correctLetters = [];
  hint.innerHTML = randRiddel.hint;
  wrong.innerText = wrongLetters;
  let box = "";
  for (let i = 0; i < word.length; i++) {
    box += `<input type="text" disabled>`;
    input.innerHTML = box;
  }
}
function handleDisplay(val) {
  if (val == 1) {
    description.style.display = "none";
    message.style.display = "none";
    congrats.style.display = "none";
    lost.style.display = "none";
    card.style.display = "block";
    card.classList.remove("shake");
    timeColor.classList.remove("color");
  } else if (val == 2) {
    userName.style.border = "none";
    stage.style.display = "none";
    totTym.style.display = "none";
    description.style.display = "block";
    userDetails.style.display = "block";
    card.style.display = "none";
  } else if (val == 3) {
    userName.style.border = "none";
    scoreboard.style.display = "none";
    play_again.style.display = "none";
    totTym.style.display = "none";
    description.style.display = "block";
    userDetails.style.display = "grid";
    stage.style.display = "none";
  }
}
function inputLetter(e) {
  message.style.display = "none";
  card.classList.remove("shake");
  key = e.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
    !wrongLetters.includes(`${key}`) &&
    !correctLetters.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correctLetters += key;
          input.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      wrongGuess();
    }
    wrong.innerHTML = wrongLetters;

    congrulation();
  } else {
    invalidInput(key);
  }
  inputbar.value = "";
}
function wrongGuess() {
  guessCount--;
  drawHangmanImg++;
  drawHangman(drawHangmanImg);
  card.classList.add("shake");
  wrongLetters.push(`${key}`);

  if (guessCount <= 0) {
    for (let i = 0; i < word.length; i++) {
      input.querySelectorAll("input")[i].value = word[i];
    }
    setTimeout(function () {
      clearInterval(interval);
      display(2);
    }, 1000);
    clearInterval(interval);
  }
}
function invalidInput(key) {
  message.style.display = "block";
  if (key.match(/\d+/)) {
    message.innerHTML = "Numberic values are not allowed";
  } else if (specialChar.includes(key)) {
    message.innerHTML = "Special characters are not allowed";
  } else {
    message.innerHTML = "you are giving repeacted character";
  }
}
function congrulation() {
  setTimeout(() => {
    if (correctLetters.length === word.length) {
      point++;
      points.innerHTML = point;
      clearInterval(interval);
      display(1);
    }
  }, 1);
}
function resetGame() {
  point = 0;
  totTime = 0;
  points.innerHTML = "";
  handleDisplay(2);
  clearInterval(interval2);
}
function display(num) {
  if (num == 1) {
    congrats.style.display = "block";
    card.style.display = "none";
    setTimeout(findLevelCheck, 3000);
  } else if (num == 2) {
    lost.style.display = "block";
    card.style.display = "none";
    message.style.display = "none";
    setTimeout(findLevelCheck, 3000);
  }
}
function timer() {
  tcount++;
  time.innerHTML = tcount;
  if (tcount >= 15) {
    timeColor.classList.add("color");
    if (tcount >= 20) {
      message.style.display = "block";
      message.innerHTML = "Time Out!!!";
      clearInterval(interval);
      findLevelCheck();
    }
  }
}
function totalTimeTaken() {
  totTime++;
  totalTime.innerHTML = totTime;
}
function findLevelCheck() {
  if (point <= 3) {
    levelCheck(1, point);
  } else if (point >= 4 && point < 7) {
    levelCheck(2, point);
  } else if (point >= 7) {
    levelCheck(3, point);
  }
}
function bestTiming() {
  bestTime[names.slice(-1)[0]] = timeTaken.slice(-1)[0];
  const keyValueArray = Object.entries(bestTime).map(([key, value]) => ({
    key,
    value,
  }));
  keyValueArray.sort((a, b) => a.value - b.value);

  const top5Entries = keyValueArray.slice(0, 5);

  for (const entry of top5Entries) {
    sortedBestTime[entry.key] = entry.value;
  }

  localStorage.setItem("bestTime", JSON.stringify(sortedBestTime));
  const ol = document.createElement("ol");
  for (const key in sortedBestTime) {
    if (sortedBestTime.hasOwnProperty(key)) {
      const li = document.createElement("li");
      li.textContent = `${key}: ${sortedBestTime[key]}`;
      ol.appendChild(li);
    }
  }
  board.appendChild(ol);
  minTime();
}
function minTime() {
  let values = Object.values(sortedBestTime);
  best_time = Math.min(...values);
  minTimeValue.innerHTML = best_time;
  localStorage.setItem("minTime", best_time);
}
function playAgain() {
  totTime = 0;
  point = 0;
  handleDisplay(3);
}

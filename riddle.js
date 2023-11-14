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
const gameOver = document.querySelector(".gameOver")
var best_time;
var totTime = 0;
var sortedBestTime = {};
var drawHangmanImg = 0;
var names = [];
var timeTaken = [];
var point = 0;
var tcount = 0;
var no_of_chance = 0;
var word;
var guessCount;
var wrongLetters = [];
var randRiddel;
var interval;
var key;
var chance = 0
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

function start() {
  if (userName.value != "") {
    tcount = 0;
    totTime = 0;
    drawHangmanImg = 0;
    names.push(userName.value);
    userName.value = ""
    canvas.style.display = "block";
    levelCheck(1, point);
    interval2 = setInterval(totalTimeTaken, 1000);
    userDetails.style.display = "none";
    card.style.display = "block";
    inputbar.addEventListener("input", inputLetter);
    input.addEventListener("click", () => inputbar.focus());
    document.addEventListener("keydown", () => inputbar.focus());
    setTimeout(generateRiddle(1), 3000);
  } else {
    userName.style.border = "2px solid red";
  }
}

function levelCheck(levelNum, point) {
  chance++
  stage.style.display = "block";
  totTym.style.display = "block";
  if (levelNum == 1) {
    levelNo.innerHTML = " 1 ";
    if (chance <=3 && point<=3){
      generateRiddle(1)
    }
    else if (chance >3 && point>=3){
     levelNum++
     setTimeout(() =>{
      levelNo.innerHTML = " 2 "
     },1000)
     console.log("level:"+levelNum+"chance:"+chance+"points:"+point)
     console.log("lev 2 called 1st time")
     generateRiddle(2)
    }
    else if(chance >3 && point <=3)
    {
      lostGame()
    }
  } else if (levelNum == 2) {
    if (chance <=6 && point <=6)
    {
      console.log("level:"+levelNum+"chance:"+chance+"points:"+point)
      console.log("lev 2 called again")
      generateRiddle(2)
    }
    else if(chance >6 && point >=6){
      levelNum++
      setTimeout(() =>{
        levelNo.innerHTML = " 3 "
       },1000)
       generateRiddle(3)
    }
    else if(chance >6 && point<=6)
    {
      lostGame()
    }
   
  } else if (levelNum == 3) {

    if (chance <=9 && point <=9){
      generateRiddle(3)
    }
    else if(chance >9 && point<9){
      lostGame()
    }
    else if (chance >=9 && point >=9){

         levelNo.innerHTML = " 3 Completed";
      clearInterval(interval2);
      congrats.style.display = "none";
      play_again.style.display = "block";
      timeTaken.push(totTime);
      bestTiming();
      scoreboard.style.display = "block";
    }
  }
}
function findLevelCheck() {
  if (chance <=3 && point <=3) {
    levelCheck(1, point);
  } else if ((chance > 3 && point == 3) || (chance > 3 && point <= 6) && (chance <= 6)){
    levelCheck(2, point);
  } else if ((chance > 6 && point == 6) || (chance > 6 && point > 6)) { 
    levelCheck(3, point);
  }
}
const usedRiddles = new Set();
function generateRiddle(num){
  clearInterval(interval)
  if (num ==1){
    randRiddel = getRandomRiddle(list_of_3_letters);
    createRiddle()
  }
  else if(num ==2){
    randRiddel = getRandomRiddle(list_of_4_letters);
    createRiddle()
  }
  else if (num==3){
    randRiddel = getRandomRiddle(list_of_5_letters);
    createRiddle()
  }
  
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
function lostGame(){
  totTime = 0;
  point = 0;
  points.innerHTML = "";
  handleDisplay(4)
  clearInterval(interval2)
}
function handleDisplay(val) {
  if (val == 1) {
    [description, message, congrats, lost].forEach(
      (element) => (element.style.display = "none")
    );
    card.style.display = "block";
    card.classList.remove("shake");
    timeColor.classList.remove("color");
  } else if (val == 2) {
    [userName, stage, totTym, card,canvas,gameOver].forEach(
      (element) => (element.style.display = "none")
    );
    [description, userName].forEach(
      (element) => (element.style.display = "block")
    );
    userDetails.style.display = "grid"
  } else if (val == 3) { // play again
    [userName, scoreboard, play_again, totTym, stage,canvas,gameOver,congrats].forEach(
      (element) => (element.style.display = "none")
    );
    [description,userName].forEach((element)=> (element.style.display="block"));
    userDetails.style.display = "grid";
  }
  else if(val == 4){
    setTimeout(() => {
      [gameOver, play_again].forEach((element) => (element.style.display = "block"));
  }, 1000);
  
  [card, lost, canvas].forEach((element) => (element.style.display = "none"));
  
    
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
    // clearInterval(interval);
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
  chance = 0;
  points.innerHTML = "";
  handleDisplay(2);
  clearInterval(interval2);
}
function display(num) {
  if (num == 1) {
    congrats.style.display = "block";
    card.style.display = "none";
    setTimeout(findLevelCheck, 1000);
  } else if (num == 2) {
    lost.style.display = "block";
    card.style.display = "none";
    message.style.display = "none";
    setTimeout(findLevelCheck, 1000);
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
  chance = 0
  points.innerHTML = "";
  handleDisplay(3);
}
if (localStorage.getItem("bestTime")) {
  bestTime = JSON.parse(localStorage.getItem("bestTime"));
}

if (localStorage.getItem("minTime")) {
  best_time = parseFloat(localStorage.getItem("minTime"));
  minTimeValue.innerHTML = best_time;
}

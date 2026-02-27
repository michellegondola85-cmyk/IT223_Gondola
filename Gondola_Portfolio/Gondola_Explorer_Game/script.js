const words = [
  { word: "javascript",     hint: "Programming language for the web" },
  { word: "elephant",       hint: "Largest land animal" },
  { word: "pineapple",      hint: "Tropical fruit with spiky skin" },
  { word: "mountain",       hint: "Very high natural elevation" },
  { word: "butterfly",      hint: "Insect with colorful wings" },
  { word: "computer",       hint: "Electronic device for processing data" },
  { word: "umbrella",       hint: "Protection from rain" },
  { word: "kangaroo",       hint: "Australian animal that jumps" },
  { word: "chocolate",      hint: "Sweet food made from cacao" },
  { word: "octopus",        hint: "Sea creature with eight arms" },
  { word: "volcano",        hint: "Mountain that erupts lava" },
  { word: "telescope",      hint: "Instrument for viewing distant objects" },
  { word: "rhinoceros",     hint: "Large animal with horn(s)" },
  { word: "strawberry",     hint: "Small red fruit with seeds on outside" },
  { word: "helicopter",     hint: "Aircraft with rotating blades" }
];

let currentWord = "";
let scrambled = "";
let score = 0;
let timeLeft = 60;
let timerId;
let gameActive = false;

const scrambledEl  = document.getElementById("scrambled");
const hintEl       = document.getElementById("hintText");
const inputEl      = document.getElementById("answerInput");
const scoreEl      = document.getElementById("score");
const timerEl      = document.getElementById("timer");
const messageEl    = document.getElementById("message");
const submitBtn    = document.getElementById("submitBtn");
const hintBtn      = document.getElementById("hintBtn");
const skipBtn      = document.getElementById("skipBtn");
const gameOverEl   = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");
const playAgainBtn = document.getElementById("playAgain");

function shuffleWord(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

function pickNewWord() {
  const item = words[Math.floor(Math.random() * words.length)];
  currentWord = item.word.toLowerCase();
  scrambled = shuffleWord(currentWord);
  while (scrambled === currentWord) { // avoid same as original
    scrambled = shuffleWord(currentWord);
  }
  scrambledEl.textContent = scrambled;
  hintEl.textContent = "";
  inputEl.value = "";
  inputEl.focus();
  messageEl.textContent = "";
  messageEl.className = "message";
}

function startGame() {
  score = 0;
  timeLeft = 60;
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  gameActive = true;
  gameOverEl.classList.add("hidden");
  messageEl.textContent = "";
  pickNewWord();
  startTimer();
}

function startTimer() {
  clearInterval(timerId);
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 10) {
      timerEl.style.color = timeLeft <= 5 ? "#e55039" : "#fdcb6e";
    }
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerId);
  gameActive = false;
  finalScoreEl.textContent = score;
  gameOverEl.classList.remove("hidden");
  inputEl.disabled = true;
}

function checkAnswer() {
  if (!gameActive) return;
  
  const guess = inputEl.value.trim().toLowerCase();
  
  if (!guess) {
    messageEl.textContent = "Please type something!";
    messageEl.className = "message error";
    return;
  }

  if (guess === currentWord) {
    score++;
    scoreEl.textContent = score;
    messageEl.textContent = "Correct! +1";
    messageEl.className = "message success";
    setTimeout(() => {
      messageEl.textContent = "";
      pickNewWord();
    }, 1200);
    // bonus time for correct answer
    timeLeft += 8;
    timerEl.textContent = timeLeft;
  } else {
    messageEl.textContent = "Wrong! Try again.";
    messageEl.className = "message error";
    inputEl.select();
  }
}

// Event listeners
submitBtn.addEventListener("click", checkAnswer);

inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

hintBtn.addEventListener("click", () => {
  if (!gameActive) return;
  hintEl.textContent = words.find(w => w.word.toLowerCase() === currentWord).hint;
  hintBtn.disabled = true;
  hintBtn.textContent = "Hint Used";
});

skipBtn.addEventListener("click", () => {
  if (!gameActive) return;
  messageEl.textContent = `Skipped! It was: ${currentWord}`;
  messageEl.className = "message";
  setTimeout(pickNewWord, 1800);
});

playAgainBtn.addEventListener("click", () => {
  inputEl.disabled = false;
  hintBtn.disabled = false;
  hintBtn.textContent = "Show Hint";
  startGame();
});

// Start first game
startGame();
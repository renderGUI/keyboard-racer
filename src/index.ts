const startButton = document.querySelector(".start-btn") as HTMLButtonElement;
const gameMenu = document.querySelector(".menu-container") as HTMLDivElement;
const gameSession = document.querySelector(".game-container") as HTMLDivElement;
const scoreScreen = document.querySelector(
  ".score-container"
) as HTMLDivElement;
const loadingText = document.querySelector(".loading") as HTMLParagraphElement;
let timeText = document.querySelector("#time-left") as HTMLParagraphElement;
let gameText = document.querySelector("#game-text") as HTMLParagraphElement;
let output = document.querySelector("#output") as HTMLParagraphElement;

const randomNumber = Math.ceil(Math.random() * 10);
let sentenceCharacters: string[] = [];
let loading: Boolean;
const fetchData = async () => {
  loadingText.classList.remove("hidden");
  try {
    const response = await fetch(
      `https://sentences-rendergui.herokuapp.com/sentences/${randomNumber}`
    );
    const data = await response.json();
    let returnedSentence = data.sentence;
    gameText.textContent = returnedSentence;
    sentenceCharacters = returnedSentence.split("");
    startTimer();
  } catch {
    loadingText.textContent = "Something went wrong!";
  }
  loadingText.classList.add("hidden");
};

const startGame = () => {
  gameMenu.classList.add("hidden");
  gameSession.classList.remove("hidden");
  fetchData();
  document.addEventListener("keydown", keyboardHandler);
};

const startTimer = () => {
  timeText.classList.remove("hidden");
  let remainingTime = 30;
  let countdown = setInterval(() => {
    remainingTime--;
    console.log(remainingTime);
    timeText.textContent = remainingTime.toString();

    if (remainingTime == 0) {
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
};

const endGame = () => {
  console.log("game over!");
};

let currentCharacterIndex = 0;
const keyboardHandler = (e: KeyboardEvent) => {
  if (e.key == sentenceCharacters[currentCharacterIndex]) {
    document.body.style.backgroundColor = "#242424";
    output.textContent += sentenceCharacters[currentCharacterIndex];
    currentCharacterIndex++;
  } else if (e.key == "CapsLock" || e.key == "Shift") {
    return;
  } else {
    document.body.style.backgroundColor = "#dd7777";
  }

  if (currentCharacterIndex == sentenceCharacters.length) {
    endGame();
  }
};

startButton.addEventListener("click", startGame);

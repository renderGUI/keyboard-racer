const startButton = document.querySelector(".start-btn") as HTMLButtonElement;
const gameMenu = document.querySelector(".menu-container") as HTMLDivElement;
const gameSession = document.querySelector(".game-container") as HTMLDivElement;
const scoreScreen = document.querySelector(
  ".score-container"
) as HTMLDivElement;
const score = document.querySelector("#score") as HTMLParagraphElement;
const loadingText = document.querySelector(".loading") as HTMLParagraphElement;
let timeText = document.querySelector("#time-left") as HTMLParagraphElement;
let gameText = document.querySelector("#game-text") as HTMLParagraphElement;
let output = document.querySelector("#output") as HTMLParagraphElement;
const newGameButton = document.querySelector(".ng-btn") as HTMLButtonElement;

const startGame = () => {
  gameMenu.classList.add("hidden");
  gameSession.classList.remove("hidden");
  fetchData();
};
startButton.addEventListener("click", startGame);

let paragraphCompleted = false;

let sentenceCharacters: string[] = [];
const fetchData = async () => {
  const randomNumber = Math.ceil(Math.random() * 10);
  loadingText.classList.remove("hidden");
  try {
    const response = await fetch(
      `https://sentences-rendergui.herokuapp.com/sentences/${randomNumber}`
    );
    const data = await response.json();
    let returnedSentence = data.sentence;
    gameText.textContent = returnedSentence;
    sentenceCharacters = returnedSentence.split("");
    document.addEventListener("keydown", keyboardHandler);
    timeText.classList.remove("hidden");
    startTimer();
  } catch {
    loadingText.textContent = "Something went wrong!";
  }
  loadingText.classList.add("hidden");
};

let startTimer = () => {
  let remainingTime = 30;

  let timer = setInterval(() => {
    remainingTime--;
    console.log(remainingTime);
    timeText.textContent = remainingTime.toString();

    if (remainingTime == 0 || paragraphCompleted) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
};

const endGame = () => {
  document.body.style.backgroundColor = "#242424";
  gameSession.classList.add("hidden");
  scoreScreen.classList.remove("hidden");
  document.removeEventListener("keydown", keyboardHandler);
  score.textContent = `${currentCharacterIndex * 2} CPM`;
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
    paragraphCompleted = true;
    endGame();
  }
};

const newGame = () => {
  location.reload();
};
newGameButton.addEventListener("click", newGame);

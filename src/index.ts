const startButton = document.querySelector(".start-btn") as HTMLButtonElement;
const gameMenu = document.querySelector(".menu-container") as HTMLDivElement;
const gameSession = document.querySelector(".game-container") as HTMLDivElement;
const loadingText = document.querySelector(".loading") as HTMLParagraphElement;
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
  } catch {
    loadingText.textContent = "Something went wrong!";
  }
  loadingText.classList.add("hidden");
};
fetchData();

const startGame = () => {
  gameMenu.classList.add("hidden");
  gameSession.classList.remove("hidden");
};

let currentCharacterIndex = 0;
const keyboardHandler = (e: KeyboardEvent) => {
  console.log(gameText.textContent);
  if (e.key == sentenceCharacters[currentCharacterIndex]) {
    console.log(`Correct, you hit the letter ${e.key}`);
    document.body.style.backgroundColor = "#242424";
    output.textContent += sentenceCharacters[currentCharacterIndex];
    currentCharacterIndex++;
  } else if (e.key == "CapsLock" || e.key == "Shift") {
    return;
  } else {
    console.log(`Incorrect, you hit the letter ${e.key}`);
    document.body.style.backgroundColor = "#dd7777";
  }

  if (currentCharacterIndex == sentenceCharacters.length) {
    endGame();
  }
};

const endGame = () => {
  console.log("game over");
};

startButton.addEventListener("click", startGame);
document.addEventListener("keydown", keyboardHandler); // remember to move back inside startGame
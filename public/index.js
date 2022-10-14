"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const startButton = document.querySelector(".start-btn");
const gameMenu = document.querySelector(".menu-container");
const gameSession = document.querySelector(".game-container");
const scoreScreen = document.querySelector(".score-container");
const score = document.querySelector("#score");
const loadingText = document.querySelector(".loading");
let timeText = document.querySelector("#time-left");
let gameText = document.querySelector("#game-text");
let output = document.querySelector("#output");
const newGameButton = document.querySelector(".ng-btn");
const startGame = () => {
    gameMenu.classList.add("hidden");
    gameSession.classList.remove("hidden");
    fetchParagraph();
};
startButton.addEventListener("click", startGame);
let paragraphCompleted = false;
let paragraphCharacters = [];
const fetchParagraph = () => __awaiter(void 0, void 0, void 0, function* () {
    const randomNumber = Math.ceil(Math.random() * 10);
    loadingText.classList.remove("hidden");
    try {
        const response = yield fetch(`https://sentences-rendergui.herokuapp.com/sentences/${randomNumber}`);
        const data = yield response.json();
        let returnedParagraph = data.sentence;
        gameText.textContent = returnedParagraph;
        paragraphCharacters = returnedParagraph.split("");
        document.addEventListener("keydown", keyboardHandler);
        timeText.classList.remove("hidden");
        startTimer();
    }
    catch (_a) {
        loadingText.textContent = "Something went wrong!";
    }
    loadingText.classList.add("hidden");
});
let startTimer = () => {
    let remainingTime = 30;
    let timer = setInterval(() => {
        remainingTime--;
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
const keyboardHandler = (e) => {
    if (e.key == paragraphCharacters[currentCharacterIndex]) {
        document.body.style.backgroundColor = "#242424";
        output.textContent += paragraphCharacters[currentCharacterIndex];
        currentCharacterIndex++;
    }
    else if (e.key == "CapsLock" || e.key == "Shift") {
        return;
    }
    else {
        document.body.style.backgroundColor = "#dd7777";
    }
    if (currentCharacterIndex == paragraphCharacters.length) {
        paragraphCompleted = true;
        endGame();
    }
};
const newGame = () => {
    location.reload();
};
newGameButton.addEventListener("click", newGame);

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
const loadingText = document.querySelector(".loading");
let gameText = document.querySelector("#game-text");
let output = document.querySelector("#output");
const randomNumber = Math.ceil(Math.random() * 10);
let sentenceCharacters = [];
let loading;
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    loadingText.classList.remove("hidden");
    try {
        const response = yield fetch(`https://sentences-rendergui.herokuapp.com/sentences/${randomNumber}`);
        const data = yield response.json();
        let returnedSentence = data.sentence;
        gameText.textContent = returnedSentence;
        sentenceCharacters = returnedSentence.split("");
    }
    catch (_a) {
        loadingText.textContent = "Something went wrong!";
    }
    loadingText.classList.add("hidden");
});
fetchData();
const startGame = () => {
    gameMenu.classList.add("hidden");
    gameSession.classList.remove("hidden");
};
let currentCharacterIndex = 0;
const keyboardHandler = (e) => {
    console.log(gameText.textContent);
    if (e.key == sentenceCharacters[currentCharacterIndex]) {
        console.log(`Correct, you hit the letter ${e.key}`);
        document.body.style.backgroundColor = "#242424";
        output.textContent += sentenceCharacters[currentCharacterIndex];
        currentCharacterIndex++;
    }
    else if (e.key == "CapsLock" || e.key == "Shift") {
        return;
    }
    else {
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

import {
    update as updateSnake,
    draw as drawSnake,
    SNAKE_SPEED,
    getSnakeHead,
    snakeCollision,
    expandSnake,
    reset as resetSnake,
    snakeBody,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { borderCollision, setGridSize, equalPositions, gridX, gridY } from "./grid.js";
import { getInputdirection } from "./input.js";
import { deathAnimation } from "./animation.js";

export let gameOver = true;
export const INITIAL_LENGTH = 7;
const GAME_BOARD = document.getElementById("gameBoard");
let lastRenderTime = 0;
let cycleCount = 0;

chrome.storage.sync.set({["score"]: "--"})
window.onresize = setGridSize;
document.onfullscreenchange = setGridSize;
document.addEventListener('yt-navigate-finish', resetGameBoard);

function main(currentTime) {
    if (gameOver) {
        cycleCount = 0;
        if (lastRenderTime !== 0) {
            chrome.storage.sync.set({["score"]: gameScore()}, () => {
                chrome.runtime.sendMessage("score updated");
            })
        }
        deathAnimation();
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;
    update();

    draw(cycleCount);

    cycleCount++;
}

function update() {
    updateSnake();
    updateFood();
    checkCollision();
}

function draw(cycleCount) {
    if (!gameOver) {
        GAME_BOARD.innerHTML = "";
        drawFood(GAME_BOARD, cycleCount);
        drawSnake(GAME_BOARD);
    }
}

function checkCollision() {
    gameOver = borderCollision(getSnakeHead()) || snakeCollision();
}

function resetGameBoard() {
    GAME_BOARD.innerHTML = "";
    setGridSize();
    resetSnake();
    updateFood();
    expandSnake(INITIAL_LENGTH);
}

function gameScore(){
    return  Math.floor((snakeBody.length - 8) * 10 / Math.log(gridX * gridY));
}

export function newGame() {
if (equalPositions(getInputdirection(), { x: 0, y: 0 })) return;

resetGameBoard();
gameOver = false;
window.requestAnimationFrame(main);
}
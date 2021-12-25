import {
    update as updateSnake,
    draw as drawSnake,
    SNAKE_SPEED,
    getSnakeHead,
    snakeCollision,
    snakeBody,
    expandSnake,
    reset as resetSnake
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { borderCollision } from "./grid.js";
import { getInputdirection } from "./input.js";

const GAME_BOARD = document.getElementById("gameBoard");
const INITIAL_LENGTH = 15;
let lastRenderTime = 0;
let gameOver = false;
let cycleCount = 0;

function main(currentTime) {
    if (gameOver) {

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
    GAME_BOARD.innerHTML = "";
    drawFood(GAME_BOARD, cycleCount);
    drawSnake(GAME_BOARD);
}

function checkCollision() {
    gameOver = borderCollision(getSnakeHead()) || snakeCollision();
}

window.addEventListener("keydown", (e) => {
    if (e) {
        window.requestAnimationFrame(main);
    }
});

expandSnake(7);
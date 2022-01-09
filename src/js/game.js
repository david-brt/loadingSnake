import {
    update as updateSnake,
    draw as drawSnake,
    SNAKE_SPEED,
    getSnakeHead,
    snakeCollision,
    expandSnake,
    equalPositions,
    reset as resetSnake,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { borderCollision, setGridSize } from "./grid.js";
import { getInputdirection, setInputDirection } from "./input.js";
import { isLoading, deathAnimation } from "./animation.js";

export let gameOver = true;
export const INITIAL_LENGTH = 7;
const GAME_BOARD = document.getElementById("gameBoard");
let lastRenderTime = 0;
let cycleCount = 0;

setGridSize();

function main(currentTime) {
    if (gameOver) {
        setInputDirection({ x: 0, y: 0 });
        checkStart();
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
    resetSnake();
    updateFood();
    expandSnake(INITIAL_LENGTH);
}

export function checkStart(n = 0) {
    let isActive = (document.activeElement.id === "movie_player");

    if (n < 7 && cycleCount !== 0) {
        deathAnimation(n);
        setTimeout(() => checkStart(n), 70);
    } else if (gameOver && n === 7 && cycleCount !== 0) {
        checkStart(n + 1);
    } else if (
        !isLoading ||
        !isActive ||
        equalPositions(getInputdirection(), { x: 0, y: 0 })
    ) {
        setTimeout(() => checkStart(n), 200);
    } else {
        resetGameBoard();
        gameOver = false;
        window.requestAnimationFrame(main);
    }
    n++; //counts how often checkStart has been called, acts as a timer
}
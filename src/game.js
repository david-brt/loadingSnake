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
import { getInputdirection, setInputDirection } from "./input.js";

export let gameOver = false;
const GAME_BOARD = document.getElementById("gameBoard");
const INITIAL_LENGTH = 15;
let lastRenderTime = 0;
let cycleCount = 0;

checkStart();

function main(currentTime) {
    if (gameOver) {
        GAME_BOARD.innerHTML = '';
        setInputDirection({ x: 0, y: 0 });
        resetSnake();
        updateFood();
        checkStart();
        gameOver = false;
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

function checkStart() {
    if (getInputdirection().x === 0 && getInputdirection().y === 0) {
        setTimeout(checkStart, 200);
    } else {
        expandSnake(7);
        window.requestAnimationFrame(main);
    }
}
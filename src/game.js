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
        gameOver = false;
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
    GAME_BOARD.innerHTML = "";
    drawFood(GAME_BOARD, cycleCount);
    drawSnake(GAME_BOARD);
}

function checkCollision() {
    gameOver = borderCollision(getSnakeHead()) || snakeCollision();
}

function resetGameBoard(){
    GAME_BOARD.innerHTML = '';
    resetSnake();
    updateFood();
    expandSnake(7);
}

function deathAnimation(n){
    let food = document.getElementById('foodElement');
    let snake = document.getElementsByClassName('snake');
    if(n % 2 === 0){
        for(let i = 0; i < snakeBody.length; i++){
            snake[i].style.opacity = '0%';
        }
        food.style.opacity = '0%';
    } else{
        for(let i = 0; i < snakeBody.length; i++){
            snake[i].style.opacity = '70%';
        }
        food.style.opacity ='70%';
    }
}

function checkStart(n = 0) {
    if (n < 7 && cycleCount !== 0) {
        deathAnimation(n);
        setTimeout(() => checkStart(n), 100);
    }
    else if (getInputdirection().x === 0 && getInputdirection().y === 0) {
        setTimeout(() => checkStart(n), 200);
    } else {
        resetGameBoard();
        window.requestAnimationFrame(main);
    }
    n++;
}
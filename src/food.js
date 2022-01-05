import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";
import { foodPulse } from "./animation.js";
import { gameOver } from './game.js'

let food;
const EXPANSION_RATE = 8;

export function update() {
    if(gameOver || food === undefined){
        food = generateFood();
    }
    else if (food !== undefined && onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = generateFood();
    }
}

export function draw(gameBoard, cycleCount) {
    const foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement).setAttribute("id", "foodElement");
    foodPulse(cycleCount);
}

function generateFood() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

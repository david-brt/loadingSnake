import { onSnake, expandSnake, snakeBody } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = generateFood();
const EXPANSION_RATE = 8;

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = generateFood();
    }
    else if(snakeBody.length === 1){
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

export function foodPulse(cycleCount) {
    if (cycleCount % 8 === cycleCount % 16) {
        document.getElementById("foodElement").style.opacity =
            70 - (cycleCount % 8) * 8 + "%";
    }
}

function generateFood() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

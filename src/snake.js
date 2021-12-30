import { getInputdirection } from "./input.js";
import { middleGridPosition, GRID_X, GRID_Y } from "./grid.js";

export const SNAKE_SPEED = 20;
export let snakeBody = [
    middleGridPosition(),
];
let newSegments = 0;

export function update() {
    addSegments();
    const inputDirection = getInputdirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    for (let i = 0; i < snakeBody.length; i++) {
        if (
            i > 1 &&
            snakeBody[i].x === snakeBody[i - 1].x &&
            snakeBody[i].y === snakeBody[i - 1].y
        ) {
            break;
        } else {
            const snakeElement = document.createElement("div");
            snakeElement.style.gridColumnStart = snakeBody[i].x;
            snakeElement.style.gridRowStart = snakeBody[i].y;
            snakeElement.classList.add("snake");
            gameBoard.appendChild(snakeElement);
            if (i < 12) {
                snakeElement.style.opacity = 100 - i * 6 + "%";
            }
        }
    }
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    if (snakeBody !== []) {
        return snakeBody.some((segment, index) => {
            if (ignoreHead && index === 0) return false;
            return equalPositions(segment, position);
        });
    }
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeCollision() {
    return onSnake(getSnakeHead(), { ignoreHead: true });
}

export function reset(){
    snakeBody = [
        { x: Math.floor(GRID_X / 2), y: Math.floor(GRID_Y / 2) }
    ]
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }

    newSegments = 0;
}

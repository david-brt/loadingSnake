import { GRID_X, GRID_Y } from "./grid.js";
import { snakeBody } from "./snake.js";

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };
let arrowKey = -1;

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case "ArrowUp":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            arrowKey = 2;
            break;
        case "ArrowRight":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 };
            arrowKey = 3;
            break;
        case "ArrowDown":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            arrowKey = 4;
            break;
    }
});

export function getInputdirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}

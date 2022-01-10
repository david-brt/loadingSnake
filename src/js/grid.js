let gameBoard = document.getElementById("gameBoard");
let gameBoardStyle = document.defaultView.getComputedStyle(gameBoard, null);
let gameBoardWidth = gameBoardStyle.getPropertyValue("width").replace("px", "");
let gameBoardHeight = gameBoardStyle.getPropertyValue("height").replace("px", "");

export const GRID_X = Math.floor(gameBoardWidth / 16);
export const GRID_Y = Math.floor(gameBoardHeight / 16);

export function setGridSize(){
    gameBoard.style.gridTemplateColumns = "repeat(" + GRID_X + ", 1fr)";
    gameBoard.style.gridTemplateRows = "repeat(" + GRID_Y + ", 1fr)";
}

export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_X) + 1,
        y: Math.floor(Math.random() * GRID_Y) + 1,
    };
}

export function middleGridPosition(){
    return { x: Math.floor(GRID_X / 2), y: Math.floor(GRID_Y / 2) };
}

export function borderCollision(position) {
    return (
        position.x < 1 ||
        position.x > GRID_X ||
        position.y < 1 ||
        position.y > GRID_Y
    );
}

export function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

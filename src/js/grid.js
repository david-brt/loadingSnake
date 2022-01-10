let gameBoard = document.getElementById("gameBoard");
let videoPlayer = document.getElementById("movie_player");
let gameBoardStyle;
let gameBoardWidth;
let gameBoardHeight;
let gridX = Math.floor(gameBoardWidth / 16);
let gridY = Math.floor(gameBoardHeight / 16);

window.onresize = setGridSize;

export function setGridSize(){
    console.log("setting grid size");
    getGridSize();
    gameBoard.style.gridTemplateColumns = "repeat(" + gridX + ", 1fr)";
    gameBoard.style.gridTemplateRows = "repeat(" + gridY + ", 1fr)";
    gameBoard.style.width = gameBoardWidth + "px";
    gameBoard.style.height = gameBoardHeight + "px";
}

export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * gridX) + 1,
        y: Math.floor(Math.random() * gridY) + 1,
    };
}

export function middleGridPosition(){
    return { x: Math.floor(gridX / 2), y: Math.floor(gridY / 2) };
}

export function borderCollision(position) {
    return (
        position.x < 1 ||
        position.x > gridX ||
        position.y < 1 ||
        position.y > gridY
    );
}

export function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function getGridSize(){
    gameBoardStyle = document.defaultView.getComputedStyle(videoPlayer, null);
    gameBoardWidth = gameBoardStyle.getPropertyValue("width").replace("px", "");
    gameBoardHeight = gameBoardStyle.getPropertyValue("height").replace("px", "");
    gridX = Math.floor(gameBoardWidth / 16);
    gridY = Math.floor(gameBoardHeight / 16);
}
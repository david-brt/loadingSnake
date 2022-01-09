let videoPlayer;
let gameBoardWidth;
let gameBoardHeight;

const observer = new MutationObserver((mutations) => {
    for(let mutation of mutations){
        let nodes = mutation.addedNodes;
        if (!nodes) return;         //return if mutation is not an added node
        for (let i = 0; i < nodes.length; i++) {
            if(nodes[i].id === "movie_player"){
                videoPlayer = nodes[i];
                let gameBoardStyle = document.defaultView.getComputedStyle(videoPlayer, null);
                gameBoardWidth = gameBoardStyle.getPropertyValue("width").replace("px", "");
                gameBoardHeight = gameBoardStyle.getPropertyValue("height").replace("px", "");
                injectGameBoard(videoPlayer);
                import("./grid.js")
                    .then((module) => {
                    module.setGridSize();
                });
                import("./game.js")
                    .then((module) => {
                    module.checkStart();
                });
            }
          }
    }});

observer.observe(document.body, {
    childList: true
  , subtree: true
  , attributes: false
  , characterData: false
})

function injectGameBoard(targetNode){
    let gameBoard = document.createElement("div");
    targetNode.appendChild(gameBoard);
    gameBoard.id = "gameBoard";
    gameBoard.style.width = gameBoardWidth + "px";
    gameBoard.style.height = gameBoardHeight + "px";
    gameBoard.style.position = "absolute";
    gameBoard.style.zIndex = "10";
    gameBoard.style.pointerEvents = "none";
}
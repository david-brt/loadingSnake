let videoPlayer;
let videoPlayerStyle;
let gameBoardWidth;
let gameBoardHeight;

const observer = new MutationObserver((mutations) => {
    for(let mutation of mutations){
        let nodes = mutation.addedNodes;
        if (!nodes) return;         //return if mutation is not an added node
        for (let i = 0; i < nodes.length; i++) {
            if(!(nodes[i] instanceof HTMLElement)) return;          //return if mutation is not an HTML element
            else if(nodes[i].id === "movie_player"){
                videoPlayer = nodes[i];
                injectGameBoard(videoPlayer);
            }
            else if(nodes[i].getAttribute("class") === "ytp-spinner"){
                removeSpinner();
                import("./game.js")
                    .then((game) => {
                    game.newGame();
                });
            }
        }
    }
});

observer.observe(document.getElementsByTagName("html")[0], {
    childList: true
  , subtree: true
  , attributes: false
  , characterData: false
})

function injectGameBoard(targetNode){
    let gameBoard = document.createElement("div");
    videoPlayerStyle = document.defaultView.getComputedStyle(videoPlayer, null);
    gameBoardWidth = videoPlayerStyle.getPropertyValue("width").replace("px", "");
    gameBoardHeight = videoPlayerStyle.getPropertyValue("height").replace("px", "");
    targetNode.appendChild(gameBoard);
    gameBoard.id = "gameBoard";
    gameBoard.style.width = gameBoardWidth + "px";
    gameBoard.style.height = gameBoardHeight + "px";
    import("./animation.js").then((animation) => {
        animation.checkLoading();
    });
}

function removeSpinner(){
    let spinnerElements = document.getElementsByClassName("ytp-spinner-rotator");
    for (let spinnerElement of spinnerElements){
        spinnerElement.remove();
    }
}
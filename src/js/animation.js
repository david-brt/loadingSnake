export let isLoading = true;

export function circleSpin(){
    let div = document.createElement("div");
    document.getElementById("gameBoard").appendChild(div);
    div.id = "snakeSpinner";
    for(let i=0; i < 8; i++){
        let div = document.createElement("div");
        document.getElementById("snakeSpinner").appendChild(div);
    }
}

export function deathAnimation(n) {
    let food = document.getElementById("foodElement");
    let snake = document.getElementsByClassName("snake");
    if (n % 2 === 0) {
        for (let i = 0; i < snake.length; i++) {
            snake[i].style.opacity = 0;
        }
        food.style.opacity = 0;
    } else {
        for (let i = 0; i < snake.length; i++) {
            if (i < 12) {
                snake[i].style.opacity = (100 - i * 7) / 100;
            } else {
                snake[i].style.opacity = 0.2;
            }
        }
        food.style.opacity = 0.7;
    }
}

export function foodPulse(cycleCount) {
    if (cycleCount % 8 === cycleCount % 16) {
        document.getElementById("foodElement").style.opacity =
            (70 - (cycleCount % 8) * 8) / 100;
    }
}

export function checkLoading() {
    let spinner = document.getElementsByClassName("ytp-spinner")[0];
    spinner.addEventListener("animationstart", () => {
        isLoading = true;
        circleSpin();
    });
    spinner.addEventListener("animationcancel", () => {
        isLoading = false;
        document.getElementById("snakeSpinner").remove();
    })
}
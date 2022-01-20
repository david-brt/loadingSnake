import { useEffect, useState } from "react";
import './scoreboard.css';


function ScoreBoard(){
    const [score, setScore] = useState(0);
    const [highscore, setHighscore] = useState(0);
    let highscoreInitialized = false;

    useEffect(() => {
        chrome.storage.sync.get("score").then(({ score }) => { setScore(score) })
            .then(chrome.storage.local.get("highscore")
            .then((res) => {
                if (res?.highscore) {
                    highscoreInitialized = true;
                    setHighscore(res.highscore);
                }
                console.log(score + " score, " + highscoreInitialized);
                if (score > res?.highscore) {
                    chrome.storage.local.set({ "highscore": score }).then(() => { setHighscore(score) })
                }
            })
            .then(() => {
                if (!highscoreInitialized) {
                    chrome.storage.local.set({ "highscore": score }).then(() => { setHighscore(score) });
                }
            }));
    }, [score]);

    return (
        <div className = "scoreBoard">
            <div>Score: {score}</div>
            <div>Highscore: {highscore}</div>
        </div>
    )
}

export default ScoreBoard; 
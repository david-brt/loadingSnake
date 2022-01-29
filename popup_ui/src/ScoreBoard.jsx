import { useEffect, useState } from "react";
import './scoreboard.css';


function ScoreBoard() {
    const [score, setScore] = useState(0);
    const [highscore, setHighscore] = useState(0);

    useEffect(() => {
        getScore();
    }, [score]);

    async function getScore() {
        let { score } = await chrome.storage.sync.get("score");
        setScore(score);
        let { highscore } = await chrome.storage.local?.get("highscore");
        if (highscore === undefined) {
            await chrome.storage.local.set({ "highscore": score });
            highscore = 0;
        } else if (score > highscore) {
            await chrome.storage.local.set({ "highscore": score });
        };
        setHighscore(highscore);
    }

    return (
        <div className="scoreBoard">
            <div className="scoreTile">
                <div>Score</div>
                <div className='scoreCount'>{score}</div>
            </div>
            <div className="scoreTile">
                <div>Highscore</div>
                <div className='scoreCount'>{highscore}</div></div>
        </div>
    )
}

export default ScoreBoard; 
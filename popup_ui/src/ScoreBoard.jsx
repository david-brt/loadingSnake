import { useEffect, useState } from "react";
import './scoreboard.css';


function ScoreBoard(){
    const [score, setScore] = useState("0");
    useEffect(() => {
        chrome.storage.sync.get(['score']).then(({ score }) => setScore(score));
    }, []);
    return (
        <div className = "scoreBoard">score: {score}</div>
    )
}

export default ScoreBoard; 
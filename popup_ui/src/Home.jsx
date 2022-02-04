import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const rightArrow = require('../../assets/popup/arrow_right.svg').default;
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    getScore();
  }, [score]);

  async function getScore() {
    let { score } = await chrome.storage.sync.get('score');
    setScore(score);
    let { highscore } = await chrome.storage.local?.get('highscore');
    if (highscore === undefined) {
      await chrome.storage.local.set({ highscore: score });
      highscore = 0;
    } else if (score > highscore) {
      await chrome.storage.local.set({ highscore: score });
    }
    setHighscore(highscore);
  }

  return (
    <div>
      <div className="scoreBoard">
        <div className="scoreTile">
          <div>Score</div>
          <div className="scoreCount">{score}</div>
        </div>
        <div className="scoreTile">
          <div>Highscore</div>
          <div className="scoreCount">{highscore}</div>
        </div>
      </div>
      <Link to="/skins" className="menuWrapper">
        <div className="menuItem">
          <span>Change Snake Skin</span>
          <svg
            className="rightArrow"
            dangerouslySetInnerHTML={{ __html: rightArrow }}
          />
        </div>
      </Link>
    </div>
  );
}

export default Home;

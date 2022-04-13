import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import menu from './Menu.module.css';
import scoreboard from './Scoreboard.module.css';
import rightArrow from '../../assets/popup/arrow_right.svg';

function Home() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    getScore();
  }, [score]);

  async function getScore() {
    let { score } = await chrome.storage.sync.get('score');
    setScore(score);
    let { highscore } = await chrome.storage.local?.get('highscore');
    if (!highscore) {
      chrome.storage.local.set({ highscore: score });
      setHighscore(0);
    } else if (score > highscore) {
      chrome.storage.local.set({ highscore: score });
    }
    setHighscore(highscore);
  }

  return (
    <>
      <div className={scoreboard.wrapper}>
        <div className={scoreboard.tile}>
          <div>Score</div>
          <div className={scoreboard.counter}>{score}</div>
        </div>
        <div className={scoreboard.tile}>
          <div>Highscore</div>
          <div className={scoreboard.counter}>{highscore}</div>
        </div>
      </div>
      <Link to="/skins" className={menu.wrapper}>
        <div className={menu.entry}>
          <span>Change Skin</span>
          <span>
            <img className={menu['arrow-right']} src={rightArrow} />
          </span>
        </div>
      </Link>
    </>
  );
}

export default Home;

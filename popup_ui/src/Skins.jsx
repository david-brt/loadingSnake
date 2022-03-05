import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './skins.css';
import leftArrow from '../../assets/popup/arrow_left.svg';

function Skins() {
  const [activeSkin, setActiveSkin] = useState(
    chrome.storage.local.get('score').score
  );
  const skins = [
    { id: 0, color: '#ffffff', name: 'White' },
    { id: 1, color: '#000000', name: 'Black' }
  ];

  useEffect(() => {
    chrome.storage.local.get('skin').then((skin) => setActiveSkin(skin.skin));
  });

  function updateSkin(skin) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { color: skin.color });
    });
    setActiveSkin(skin.id);
    chrome.storage.local.set({ skin: skin.id });
  }
  return (
    <>
      <ul className="list">
        <li className="listEntry">
          <Link to="/" className="back">
            <span className="leftArrow">
              <img src={leftArrow} />
            </span>
            <span>Back</span>
          </Link>
        </li>
        {skins.map((skin) => (
          <li
            onClick={() => updateSkin(skin)}
            key={skin.id}
            className={
              'listEntry' + (skin.id == activeSkin ? ' activeSkinWrapper' : '')
            }
          >
            <div className="skinContent">
              <span
                className="colorIndicator"
                style={{ backgroundColor: skin.color }}
              ></span>
              <span>{skin.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Skins;

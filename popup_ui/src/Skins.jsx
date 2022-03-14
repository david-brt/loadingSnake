import { Colors } from './Colors.jsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shapes } from './Shapes.jsx';
import './skins.css';
import leftArrow from '../../assets/popup/arrow_left.svg';

function Skins() {
  const [activeSkin, setActiveSkin] = useState();
  const skins = [
    { id: 0, color: '#ffffff', name: 'White' },
    { id: 1, color: '#000000', name: 'Black' }
  ];

  useEffect(() => {
    chrome.storage.local.get('skin').then((skin) => setActiveSkin(skin.skin));
  }, []);

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
        <Link to="/">
          <li className="listEntry">
            <span>
              <img className="leftArrow" src={leftArrow} />
            </span>
            <span>Back</span>
          </li>
        </Link>
        <Shapes />
        <Colors skins={skins} updateSkin={updateSkin} activeSkin={activeSkin} />
      </ul>
    </>
  );
}

export default Skins;

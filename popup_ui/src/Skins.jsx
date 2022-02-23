import React from 'react';
import { useState } from 'react';
import './skins.css';

function Skins() {
  const [activeSkin, setActiveSkin] = useState();
  const skins = [
    { id: 0, color: '#ffffff', name: 'White' },
    { id: 1, color: '#000000', name: 'Black' }
  ];

  function updateSkin(skin) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { color: skin.color });
    });
    setActiveSkin(skin.id);
  }
  return (
    <ul className="skinList">
      {skins.map((skin) => (
        <li
          key={skin.id}
          className={
            'skinWrapper' + (skin.id == activeSkin ? ' activeSkinWrapper' : '')
          }
        >
          <div className="skinContent" onClick={() => updateSkin(skin)}>
            {skin.name}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Skins;

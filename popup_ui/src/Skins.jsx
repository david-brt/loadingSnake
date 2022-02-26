import React, { useEffect } from 'react';
import { useState } from 'react';
import './skins.css';

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

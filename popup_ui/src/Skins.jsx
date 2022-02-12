import React from 'react';
import { useState } from 'react';
import './skins.css';

function Skins() {
  const [skins, setSkins] = useState([
    { id: 1, color: '#ffffff', active: false, name: 'White' },
    { id: 2, color: '#000000', active: false, name: 'Black' }
  ]);
  function updateSkin(color) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { color: color });
    });
  }
  return (
    <ul className="skinList">
      {skins.map((skin) => (
        <li className="skinWrapper">
          <div
            key={skin.id}
            className="skinContent"
            onClick={() => updateSkin(skin.color)}
          >
            {skin.name}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Skins;

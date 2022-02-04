import React from 'react';
import './skins.css';

function Skins() {
  function setSkin(color) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { color: color });
    });
  }
  return (
    <ul className="skinList">
      <li className="skinWrapper">
        <div className="skinContent" onClick={() => setSkin('#ffffff')}>
          White
        </div>
      </li>
      <li className="skinWrapper">
        <div className="skinContent" onClick={() => setSkin('#000000')}>
          Black
        </div>
      </li>
    </ul>
  );
}

export default Skins;

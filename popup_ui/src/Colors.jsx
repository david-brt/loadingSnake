import React, { useEffect, useState } from 'react';
export function Colors({ skinsUrl }) {
  //refresh colors once fetch value is available
  const [colors, setColors] = useState({});
  const [activeColor, setActiveColor] = useState();

  //get colors on mount
  useEffect(async () => {
    let skins = await fetch(skinsUrl);
    skins = await skins.json();
    setColors(skins.colors);
  }, []);

  //get active color on mount
  useEffect(() => {
    chrome.storage.local.get('color').then(({ color }) => {
      setActiveColor(color);
    });
  }, []);

  function updateColor(color) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { color: color });
    });
    setActiveColor(color);
    chrome.storage.local.set({ color: color });
  }

  return (
    <>
      {Object.keys(colors).map((color) => (
        <li
          onClick={() => updateColor(color)}
          key={color}
          className={
            'listEntry' + (color == activeColor ? ' activeWrapper' : '')
          }
        >
          <div className="skinContent">
            <span
              className="colorIndicator"
              style={{
                backgroundColor: color
              }}
            ></span>
            <span>{color}</span>
          </div>
        </li>
      ))}
    </>
  );
}

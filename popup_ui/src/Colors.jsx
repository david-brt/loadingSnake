import React from 'react';
export function Colors({ skins, updateSkin, activeSkin }) {
  return (
    <>
      {skins.map((skin) => (
        <li
          onClick={() => updateSkin(skin)}
          key={skin.id}
          className={
            'listEntry' + (skin.id == activeSkin ? ' activeWrapper' : '')
          }
        >
          <div className="skinContent">
            <span
              className="colorIndicator"
              style={{
                backgroundColor: skin.color
              }}
            ></span>
            <span>{skin.name}</span>
          </div>
        </li>
      ))}
    </>
  );
}

import React, { useEffect, useState } from 'react';
import skins from './Skins.module.css';
export function Colors({ update, colors, activeColor }) {
  return (
    <>
      {Object.keys(colors).map((color) => (
        <li
          onClick={() => update('color', color)}
          key={color}
          className={
            skins['list-entry'] +
            ' ' +
            (color == activeColor ? skins['active-element'] : '')
          }
        >
          <div className={skins['skin-content']}>
            <span
              title={color}
              className={skins['color-preview']}
              style={{
                backgroundColor: colors[color]
              }}
            ></span>
            <span>{color}</span>
          </div>
        </li>
      ))}
    </>
  );
}

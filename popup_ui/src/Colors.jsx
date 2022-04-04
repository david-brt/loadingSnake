import React, { useEffect, useState } from 'react';
export function Colors({ update, colors, activeColor }) {
  return (
    <>
      {Object.keys(colors).map((color) => (
        <li
          onClick={() => update('color', color)}
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

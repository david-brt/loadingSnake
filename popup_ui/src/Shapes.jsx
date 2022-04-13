import React, { useEffect, useState } from 'react';
import skins from './Skins.module.css';

export function Shapes({ update, shapes, activeShape }) {
  return (
    <li className={skins['shape-wrapper']}>
      {Object.keys(shapes).map((shape) => (
        <svg
          key={shape}
          onClick={() => update('shape', shape)}
          className={
            skins.shape +
            ' ' +
            (shape == activeShape ? skins['active-element'] : '')
          }
          width="1.2rem"
          height="1.2rem"
          viewBox="0 0 8 8"
          dangerouslySetInnerHTML={{
            __html: shapes[shape]
          }}
        ></svg>
      ))}
    </li>
  );
}

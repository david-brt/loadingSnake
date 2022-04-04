import React, { useEffect, useState } from 'react';
export function Shapes({ update, shapes, activeShape }) {
  return (
    <li className="shapeWrapper">
      {Object.keys(shapes).map((shape) => (
        <svg
          key={shape}
          onClick={() => update('shape', shape)}
          className={'shape' + (shape == activeShape ? ' activeWrapper' : '')}
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

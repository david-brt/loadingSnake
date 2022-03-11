import React, { useEffect, useState } from 'react';
export function Shapes() {
  const shapesUrl = chrome.runtime.getURL('/skins/shapes.json');

  //refresh shapes once fetch value is available
  const [shapes, setShapes] = useState({});

  //fetch shapes on mount
  useEffect(async () => {
    let shapes = await fetch(shapesUrl);
    shapes = await shapes.json();
    setShapes(shapes);
  }, []);

  return (
    <li className="shapeWrapper">
      {Object.keys(shapes).map((shape) => (
        <svg
          key={shape}
          className="shape"
          xmlns="http://www.w3.org/2000/svg"
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

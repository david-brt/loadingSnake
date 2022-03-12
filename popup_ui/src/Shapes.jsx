import React, { useEffect, useState } from 'react';
export function Shapes() {
  const shapesUrl = chrome.runtime.getURL('/skins/shapes.json');
  //refresh shapes once fetch value is available
  const [shapes, setShapes] = useState({});
  const [activeShape, setActiveShape] = useState();

  //fetch shapes on mount
  useEffect(async () => {
    let shapes = await fetch(shapesUrl);
    shapes = await shapes.json();
    setShapes(shapes);
  }, []);

  //get active shape on mount
  useEffect(() => {
    chrome.storage.local.get('shape').then((shape) => {
      setActiveShape(shape.shape);
    });
  }, []);

  function updateShape(shape) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { shape: shape });
    });
    setActiveShape(shape);
    chrome.storage.local.set({ shape: shape });
  }

  return (
    <li className="shapeWrapper">
      {Object.keys(shapes).map((shape) => (
        <svg
          key={shape}
          onClick={() => updateShape(shape)}
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

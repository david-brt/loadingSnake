import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shapes } from './Shapes.jsx';
import { Colors } from './Colors.jsx';
import skinStyle from './Skins.module.css';
import leftArrow from '../../assets/popup/arrow_left.svg';

function Skins() {
  const skinsUrl = chrome.runtime.getURL('/skins/skins.json');
  const [shapes, setShapes] = useState({});
  const [colors, setColors] = useState({});
  const [skins, setSkins] = useState({});
  const [activeColor, setActiveColor] = useState();
  const [activeShape, setActiveShape] = useState();

  //get shapes and colors on mount
  useEffect(async () => {
    let skins = await fetch(skinsUrl);
    skins = await skins.json();
    setShapes(skins.shapes);
    setColors(skins.colors);
    setSkins(skins);
  }, []);

  //get active skin on mount
  useEffect(() => {
    chrome.storage.local.get('shape').then(({ shape }) => {
      setActiveShape(shape);
    });
    chrome.storage.local.get('color').then(({ color }) => {
      setActiveColor(color);
    });
  }, []);

  /**
   * This function will update a skin on the backend.
   * @param {string} assetType - Set to either "shape" or "color".
   * @param {string} asset - An svg or a color do define said element of the snake's skin.
   */
  function update(assetType, asset) {
    const setActive = {
      color: setActiveColor,
      shape: setActiveShape
    };
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { [assetType]: asset });
    });
    chrome.storage.local.set({ [assetType]: asset });
    setActive[assetType](asset);
  }

  return (
    <>
      <ul className={skinStyle.list}>
        <Link to="/">
          <li className={skinStyle['list-entry']}>
            <span>
              <img className={skinStyle['arrow-left']} src={leftArrow} />
            </span>
            <span>Back</span>
          </li>
        </Link>
        <Shapes update={update} shapes={shapes} activeShape={activeShape} />
        <Colors update={update} colors={colors} activeColor={activeColor} />
      </ul>
    </>
  );
}

export default Skins;

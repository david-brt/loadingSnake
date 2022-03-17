import { Colors } from './Colors.jsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shapes } from './Shapes.jsx';
import './skins.css';
import leftArrow from '../../assets/popup/arrow_left.svg';
import { skin } from '../../content_scripts/js/snake.js';

function Skins() {
  const skinsUrl = chrome.runtime.getURL('/skins/skins.json');

  return (
    <>
      <ul className="list">
        <Link to="/">
          <li className="listEntry">
            <span>
              <img className="leftArrow" src={leftArrow} />
            </span>
            <span>Back</span>
          </li>
        </Link>
        <Shapes skinsUrl={skinsUrl} />
        <Colors skinsUrl={skinsUrl} />
      </ul>
    </>
  );
}

export default Skins;

import React from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from './Home.jsx';
import Skins from './Skins.jsx';
import './popup.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skins" element={<Skins />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

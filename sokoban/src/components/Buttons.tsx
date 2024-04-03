import React from 'react';
import './Buttons.css';
import { Link } from 'react-router-dom';

export const Buttons = () => {
  return (
    <>
      <Link to={'/'} className="level-link">
        <img alt="close-btn" className="close-btn" src="./src/assets/images/close.png" />
      </Link>
      <Link to={'/'} className="level-link">
        <img alt="arrow-btn" className="arrow-btn" src="./src/assets/images/button-arrow.png" />
      </Link>
    </>
  );
};

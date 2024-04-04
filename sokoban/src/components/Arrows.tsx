import React from 'react'
import "./Arrows.css"

export const Arrows = () => {
  return (
    <>
      <div className="arrow-container">
        <img
          src="./src/assets/images/arrow-left-grey.png"
          alt="arrow-left"
          className="arrow"
        />
        <img
          src="./src/assets/images/arrow-right.png"
          alt="arrow-right"
          className="arrow right"
        />
      </div>
    </>
  );
}


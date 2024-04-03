import React from 'react'
import { LevelBox } from './LevelBox';
import { IBoxes } from '../interfaces';
import "./LevelBox.css"

const boxes: IBoxes[] = [
  { id: 0, levelVal: 1, stars: 'En av fem' },
  { id: 1, levelVal: 2, stars: 'En av fem' },
  { id: 2, levelVal: 3, stars: 'En av fem' },
  { id: 3, levelVal: 4, stars: 'En av fem' },
];

export const LevelBoxes = () => {
  return (
    <>
      <div className="boxes">
        {boxes.map(box => (
          <LevelBox key={box.id} box={box} levelVal={box.levelVal} />
        ))}
      </div>
    </>
  );
}


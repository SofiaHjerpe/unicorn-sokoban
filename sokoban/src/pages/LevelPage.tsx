import React, { useState } from 'react';
import '../pages/LevelPage.css';
import { Buttons } from '../components/Buttons';
import { TitleBackground } from '../components/TitleBackground';
import { Background } from '../components/Background';
import { Arrows } from '../components/Arrows';
import { LevelBoxes } from '../components/LevelBoxes';
import { IBoxes } from '../interfaces';
const boxes: IBoxes[] = [
  { id: 0, levelVal: 1, stars: 'En av fem' },
  { id: 1, levelVal: 2, stars: 'En av fem' },
  { id: 2, levelVal: 3, stars: 'En av fem' },
  { id: 3, levelVal: 4, stars: 'En av fem' },
];
export const LevelPage = () => {
  const [levelsView, setLevelsView] = useState(1);

  if (levelsView === 2) {
    boxes[0].levelVal = 5;
    boxes[1].levelVal = 6;
    boxes[2].levelVal = 7;
    boxes[3].levelVal = 8;
  }
  return (
    <div className="level-img">
     
      <div className="level-overlay">
        <Background />
        <TitleBackground />
        <Buttons />
        <Arrows levelsView={levelsView} setLevelsView={setLevelsView} />
        <LevelBoxes boxes={boxes} />
      </div>
    </div>
  );
};

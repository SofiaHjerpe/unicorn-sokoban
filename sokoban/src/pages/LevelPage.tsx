import React from 'react';
import '../pages/LevelPage.css';
import { Buttons } from '../components/Buttons';
import { TitleBackground } from '../components/TitleBackground';
import { Background } from '../components/Background';
import { Arrows } from '../components/Arrows';
import { LevelBoxes } from '../components/LevelBoxes';

export const LevelPage = () => {
  return (
    <div className="level-img">
      <div className="level-overlay">
        <Background />
        <TitleBackground />
        <Buttons />
        <Arrows />
        <LevelBoxes />
      </div>
    </div>
  );
};

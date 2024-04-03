import React from 'react';
import '../components/LevelPage.css';
import { Close } from '../components/Close';
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
        <Close />
        <Arrows />
        <LevelBoxes />
      </div>
    </div>
  );
};

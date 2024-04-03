import React from 'react';
import { IBoxes } from '../interfaces';
import "./LevelBox.css";
interface ILevelBoxProps {
  box: IBoxes
}
export const LevelBox = ({ box }: ILevelBoxProps) => {
  return (
    <div className="box-border">
      <div className="level-box">
        <h1 className="level-heading">{box.levelVal}</h1>
        <span>{box.stars}</span>
      </div>
    </div>
  );
};

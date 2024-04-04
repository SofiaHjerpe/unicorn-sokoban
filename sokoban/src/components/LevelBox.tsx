import { IBoxes } from '../interfaces';
import './LevelBox.css';
interface ILevelBoxProps {
  box: IBoxes;
  levelVal: number;
}
export const LevelBox = ({ box, levelVal }: ILevelBoxProps) => {
  let levelStar = 0;
  let score = '';
  if (levelVal !== null) {
    const starStorageName = 'Starstorage' + levelVal;
    let starStorage = localStorage.getItem(starStorageName);
    if (starStorage !== null) {
      let starInStorage = JSON.parse(starStorage);
      levelStar = starInStorage.star;
      if (levelStar > 0) {
        for (let i = 0; i < levelStar; i++) {
          score += '⭐';
        }
      }
    }
  }

  return (
    <div className="box-border">
      <div className="level-box">
        <h1 className="level-heading">{box.levelVal}</h1>
        <span>{score}</span>
      </div>
    </div>
  );
};

import { LevelBox } from './LevelBox';

import "./LevelBox.css"
import { IBoxes } from '../interfaces';
interface ILevelBoxesProps {
  boxes: IBoxes[];
}


export const LevelBoxes = ({boxes}: ILevelBoxesProps) => {
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


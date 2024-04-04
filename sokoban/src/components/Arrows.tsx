import React, { Dispatch } from 'react';
import './Arrows.css';
interface IArrowsProps {
  setLevelsView: Dispatch<React.SetStateAction<number>>;
  levelsView: number;
}
export const Arrows = ({ levelsView, setLevelsView }: IArrowsProps) => {
  let classArrowRight: string = 'arrow';
  let classArrowLeft: string = 'arrow';
  let imageSourceRight = 'arrow-right';
  let imageSourceLeft = 'arrow-left-grey';

  const setClass = setClassToArrow();
  const setClassLeft = setClassToLeftArrow();

  if (levelsView === 1) {
    imageSourceRight = 'arrow-right';
    imageSourceLeft = 'arrow-left-grey';
  } else if (levelsView === 2) {
    imageSourceRight = 'arrow-left-grey';
    imageSourceLeft = 'arrow-right';
  }

  function setClassToLeftArrow() {
    classArrowLeft = 'arrow';
    if (levelsView === 1) {
      classArrowLeft = 'arrow';
      return classArrowLeft;
    } else if (levelsView === 2) {
      classArrowLeft = 'arrow left';
      return classArrowLeft;
    }
  }

  function setClassToArrow() {
    if (levelsView === 1) {
      classArrowRight = 'arrow';
      return classArrowRight;
    } else if (levelsView === 2) {
      classArrowRight = 'arrow right';
      return classArrowRight;
    }
  }

  

  return (
    <>
      <div className="arrow-container">
        <button className="arrow-right-btn" onClick={() => setLevelsView(1)}>
          <img src={`./src/assets/images/${imageSourceLeft}.png`} alt="arrow-left" className={setClassLeft} />
        </button>
        <button className="arrow-right-btn" onClick={() => setLevelsView(2)}>
          <img src={`./src/assets/images/${imageSourceRight}.png`} alt="arrow-right" className={setClass} />
        </button>
      </div>
    </>
  );
};

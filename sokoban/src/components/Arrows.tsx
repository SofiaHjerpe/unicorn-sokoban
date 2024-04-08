import React, { Dispatch } from 'react';
import './Arrows.css';
interface IArrowsProps {
  setLevelsView: Dispatch<React.SetStateAction<number>>;
  levelsView: number;
}
export const Arrows = ({ levelsView, setLevelsView }: IArrowsProps) => {
  let classArrowRight: string = 'arrow';
  let classArrowLeft: string = 'arrow';


  const setClass = setClassToArrow();
  const setClassLeft = setClassToLeftArrow();

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
      classArrowRight = 'arrow right-before';
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
          <div className={setClassLeft} />
        </button>
        <button className="arrow-right-btn" onClick={() => setLevelsView(2)}>
          <div className={setClass} />
        </button>
      </div>
    </>
  );
};

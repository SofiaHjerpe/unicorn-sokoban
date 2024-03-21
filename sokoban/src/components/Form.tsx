import React, { Dispatch, FormEventHandler } from "react";
import "./Form.css";
import { GamePlans } from "../Globals";
interface IChangeLevelProps {
  changeLevel: (level: number) => void;
  levelValue: number;
  setLevel: Dispatch<React.SetStateAction<number>>;
}
export const Form = ({
  changeLevel,
  levelValue,
  setLevel,
}: IChangeLevelProps) => {
  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    changeLevel(levelValue);
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        <select
          className="select"
          title="select level"
          value={levelValue}
          onChange={(e) => setLevel(+e.target.value)}
        >
          {GamePlans.map((_level, index) => (
            <option key={index} value={index + 1}>
              Level {index + 1}
            </option>
          ))}
        </select>
        <button className="submit-btn" type="submit">
          Go to level
        </button>
      </form>
    </>
  );
};

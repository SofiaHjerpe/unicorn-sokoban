import React, { Dispatch, FormEventHandler } from "react";
import "./Form.css";
import { GameArray } from "../Globals";
interface IChangeLevelProps {
  changeLevel: (level: number) => void;
  levelValue: string;
  setLevel: Dispatch<React.SetStateAction<string>>;
}
export const Form = ({ changeLevel, levelValue, setLevel }: IChangeLevelProps) => {
  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    changeLevel(parseInt(levelValue));
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        <select className="select" title="select level" onChange={(e) => setLevel(e.target.value)}>
          {GameArray.map((level, index) => (
            <option key={index} value={index +1}>
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

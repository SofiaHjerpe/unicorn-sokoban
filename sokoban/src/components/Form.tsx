import React, { Dispatch, FormEventHandler } from "react";
import "./Form.css";
interface IChangeLevelProps {
  changeLevel: (level: string) => void;
  levelValue: string;
  setLevel: Dispatch<React.SetStateAction<string>>;
}
export const Form = ({ changeLevel, levelValue, setLevel }: IChangeLevelProps) => {

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    changeLevel(levelValue);
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        <select className="select" title="select level" onChange={(e) => setLevel(e.target.value)}>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </select>
        <button className="submit-btn" type="submit">
          Go to level
        </button>
      </form>
    </>
  );
};

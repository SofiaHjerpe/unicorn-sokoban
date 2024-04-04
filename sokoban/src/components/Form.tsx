import React, { FormEventHandler, useContext } from "react";
import "./Form.css";
import { GamePlans } from "../Globals";
import { GameContext } from "../context/GameContextProvider";
interface IFormProps {
  changeLevel: (newLevel: number) => void;
}
export const Form = ({changeLevel}: IFormProps) => {
  const {levelValue, setLevelValue,} = useContext(GameContext);
  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    changeLevel(levelValue);
  };
 
  let setLevel = setLevelValue;

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

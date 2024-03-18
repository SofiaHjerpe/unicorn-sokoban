import React, { FormEventHandler, useContext } from "react";
import "./Form.css";
import { GamePlans } from "../Globals";
import { GameContext } from "../context/GameContextProvider";

export const Form = () => {
  const {value, setLevelValue, changeLevel} = useContext(GameContext);
  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    changeLevel(parseInt(levelValue));
  };
  let levelValue = value;
  let setLevel = setLevelValue;

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        <select className="select" title="select level" onChange={(e) => setLevel(e.target.value)}>
          {GamePlans.map((level, index) => (
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

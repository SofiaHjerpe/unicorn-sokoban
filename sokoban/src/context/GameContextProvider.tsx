import React, { Dispatch, ReactElement, createContext, useState } from "react";
import { GamePlans } from "../Globals";

interface IContext {
  newGameBoard: any[];
  setNewGameBoard: Dispatch<React.SetStateAction<any[]>>;
  value: string;
  setLevelValue: Dispatch<React.SetStateAction<string>>;
  changeLevel: (level: number) => void;
}

interface IGameContextProvider {
  children: ReactElement;
}

export const GameContext = createContext({} as IContext);
export const GameContextProvider = ({ children }: IGameContextProvider) => {
  const [newGameBoard, setNewGameBoard] = useState<any[]>(GamePlans[0]);
  const [value, setLevelValue] = useState("");

  const changeLevel = (level: number) => {
    GamePlans.map((plan, index) => (level === index + 1 ? setNewGameBoard(plan) : null));
  };

  const values: IContext = {
    newGameBoard: newGameBoard,
    setNewGameBoard: setNewGameBoard,
    value: value,
    setLevelValue: setLevelValue,
    changeLevel: changeLevel
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

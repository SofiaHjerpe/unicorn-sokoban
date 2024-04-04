import React, { Dispatch, ReactElement, createContext, useState } from "react";
import { GamePlans } from "../Globals";

interface IContext {
  newGameBoard: any[];
  setNewGameBoard: Dispatch<React.SetStateAction<any[]>>;
  levelValue: number;
  setLevelValue: Dispatch<React.SetStateAction<number>>;
  numberOfCorrectBoxes: number;
  setNumberOfCorrectBoxes: Dispatch<React.SetStateAction<number>>;
  countBoardChange: number;
  setCountBoardChange: Dispatch<React.SetStateAction<number>>;
  winningMessage: string;
  setWinningMessage: Dispatch<React.SetStateAction<string>>;
}

interface IGameContextProvider {
  children: ReactElement;
}

export const GameContext = createContext({} as IContext);
export const GameContextProvider = ({ children }: IGameContextProvider) => {
  const [newGameBoard, setNewGameBoard] = useState<any[]>(GamePlans[0]);
  const [levelValue, setLevelValue] = useState(1);
  const [numberOfCorrectBoxes, setNumberOfCorrectBoxes] = useState(0);
  const [countBoardChange, setCountBoardChange] = useState(0);
  const [winningMessage, setWinningMessage] = useState("");


  const values: IContext = {
    newGameBoard: newGameBoard,
    setNewGameBoard: setNewGameBoard,
    levelValue: levelValue,
    setLevelValue: setLevelValue,
    numberOfCorrectBoxes: numberOfCorrectBoxes,
    setNumberOfCorrectBoxes: setNumberOfCorrectBoxes,
    countBoardChange: countBoardChange,
    setCountBoardChange: setCountBoardChange,
    winningMessage: winningMessage,
    setWinningMessage: setWinningMessage
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

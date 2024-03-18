import { useState } from "react";
import { GameArray } from "./Globals";
import { Form } from "./components/Form";
import InstructionButton from "./components/Instruction";
import "./game.css";

const colors: any = {
  w: "red",
  b: "brown",
  p: "green",
  "": "burlywood",
};

function App() {
  const [newGameBoard, setNewGameBoard] = useState(GameArray[0]);
  const [value, setLevelValue] = useState("");

  const changeLevel = (level: string) => {
    switch (level) {
      case "1":
        setNewGameBoard(GameArray[0]);
        break;
      case "2":
        setNewGameBoard(GameArray[1]);
        break;
      case "3":
        setNewGameBoard(GameArray[2]);
        break;
    }
  };
  const style = {
    height: (500 / newGameBoard[0].length) * newGameBoard.length,
  };

  return (
    <>
      <InstructionButton />
      <Form
        changeLevel={changeLevel}
        setLevel={setLevelValue}
        levelValue={value}
      />

      <main className="gameBoard" style={style}>
        {newGameBoard.map((row) =>
          row.map((cell: string, cellid: number) => (
            <div
              className="cell"
              key={cellid}
              style={{
                width: 500 / newGameBoard[0].length,
                backgroundColor: `${colors[cell]}`,
              }}
            >
              {cell}
            </div>
          ))
        )}
      </main>
    </>
  );
}

export default App;

import { useState } from "react";
import { GameArray } from "./Globals";
import { Form } from "./components/Form";
import "./game.css";

const colors: any = {
  w: "red",
  b: "brown",
  p: "green",
  "": "burlywood",
};

console.log("Hello world");

function App() {
  const [newGameBoard, setNewGameBoard] = useState(GameArray[0]);
  const [value, setLevelValue] = useState("");

  const changeLevel = (level: number) => {

    GameArray.map((levelArray, index) =>
      level === index ? setNewGameBoard(levelArray) : setNewGameBoard(GameArray[0])
    );
    
  };

  const style = { height: (500 / newGameBoard[0].length) * newGameBoard.length };

  return (
    <>
      <Form changeLevel={changeLevel} setLevel={setLevelValue} levelValue={value} />

      <main className="gameBoard" style={style}>
        {newGameBoard.map((row) =>
          row.map((cell: string, cellid: number) => (
            <div
              className="cell"
              key={cellid}
              style={{ width: 500 / newGameBoard[0].length, backgroundColor: `${colors[cell]}` }}
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

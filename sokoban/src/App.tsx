import { useState } from "react";
import { GamePlans } from "./Globals";
import { Form } from "./components/Form";
import "./game.css";

const colors: any = {
  w: "red",
  b: "brown",
  p: "green",
  "": "burlywood",
};


function App() {
  const [newGameBoard, setNewGameBoard] = useState<any[]>(GamePlans[0]);
  const [value, setLevelValue] = useState("");


  const changeLevel = (level: number) => {

    GamePlans.map((plan, index) =>
      level === index +1 ? setNewGameBoard(plan) : null
    );

  };

  const style = { height: (500 / newGameBoard.length) * newGameBoard.length };

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

import { useEffect, useState } from "react";
import { GamePlans } from "./Globals";
import { Form } from "./components/Form";
import "./game.css";
import { handleBoard } from "./player";

const backgoundImage: Record<string, string> = {
  w: "src/assets/images/wall.jpg",
  b: "src/assets/images/box.jpg",
  p: "src/assets/images/player.jpg",
  tp: "src/assets/images/player.jpg",
  "": "src/assets/images/floor.jpg",
  t: "src/assets/images/Target.jpg",
};

function App() {
  const [newGameBoard, setNewGameBoard] = useState<any[]>(GamePlans[0]);
  const [value, setLevelValue] = useState("");

  const changeLevel = (level: number) => {
    GamePlans.map((plan, index) => (level === index + 1 ? setNewGameBoard(plan) : null));
  };

  const style = { height: (500 / newGameBoard[0].length) * newGameBoard.length };

  const player = "p";
  const target = "t";
  const playerOnTarget = "tp";
  let x = -1;
  let y = -1;

  const handleKeyDown = (e: any) => {
    //find player coordinates on the gameBoard:
    for (let i = 0; i < newGameBoard.length; i++) {
      const innerArrayLength = newGameBoard[i].length;
      for (let j = 0; j < innerArrayLength; j++) {
        if (newGameBoard[i][j] == player || newGameBoard[i][j] == playerOnTarget) {
          x = j;
          y = i;
        }
      }
    }
    //set new game board:
    const newBoard = handleBoard(e, newGameBoard, player, x, y, target);
    setNewGameBoard(newBoard);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [newGameBoard]);

  return (
    <>
      <Form changeLevel={changeLevel} setLevel={setLevelValue} levelValue={value} />

      <main className="gameBoard" style={style}>
        {newGameBoard.map((row) =>
          row.map((cell: string, cellid: number) => (
            <div
              className="cellDiv"
              key={cellid}
              style={{
                width: 500 / newGameBoard[0].length,
                backgroundImage: `url(${backgoundImage[cell]})`,
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

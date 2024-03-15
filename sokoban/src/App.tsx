import { useEffect, useState } from "react";
import { GameArray } from "./Globals";
import { Form } from "./components/Form";
import "./game.css";
import { handleBoard } from "./player";

const backgoundImage: any = {
  w: "src/assets/images/wall.jpg",
  b: "src/assets/images/box.jpg",
  p: "src/assets/images/player.jpg",
  tp: "src/assets/images/player.jpg",
  "": "src/assets/images/floor.jpg",
  t: "src/assets/images/Target.jpg",
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

  const style = { height: (500 / newGameBoard[0].length) * newGameBoard.length };

  let player = "p";
  let target = "t";
  let playerOnTarget = "tp";
  let x = -1;
  let y = -1;

  const handleKeyDown = (e: any) => {
    //find player coordinates on the gameBoard:
    for (let i = 0; i < newGameBoard.length; i++) {
      let innerArrayLength = newGameBoard[i].length;
      for (let j = 0; j < innerArrayLength; j++) {
        if (newGameBoard[i][j] == player || newGameBoard[i][j] == playerOnTarget) {
          x = j;
          y = i;
        }
      }
    }
    //set new game board:
    let newBoard: any = handleBoard(e, newGameBoard, player, x, y, target);
    setNewGameBoard(newBoard);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

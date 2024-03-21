import { useEffect, useState } from "react";
import { GamePlans } from "./Globals";
import { Form } from "./components/Form";
import InstructionButton from "./components/Instruction";
import "./game.css";

const path = (img: string) => `src/assets/images/${img}.jpg`;
const backgoundImage: Record<string, string> = {
  w: path("wall"),
  b: path("box"),
  tb: path("box"),
  p: path("player"),
  tp: path("player"),
  "": path("floor"),
  t: path("target"),
};

function App() {
  const [newGameBoard, setNewGameBoard] = useState<any[]>(GamePlans[0]);
  const [value, setLevelValue] = useState("");

  const changeLevel = (level: number) => {
    GamePlans.map((plan, index) => (level === index + 1 ? setNewGameBoard(plan) : null));
    document.getElementById("gameStatus")!.innerText = '';
  };

  let x: number, y: number;
  newGameBoard.map((row: [], _y) => {
    row.map((cell: string, _x) => {
      if (cell.includes("p")) {
        x = _x;
        y = _y;
      }
    });
  });

  const keypress: any = {
    38: { x: 0, y: -1 }, // Arrow keys UP
    40: { x: 0, y: 1 }, // Arrow keys DOWN
    37: { x: -1, y: 0 }, // Arrow keys LEFT
    39: { x: 1, y: 0 }, // Arrow keys RIGHT

    87: { x: 0, y: -1 }, // W-key
    83: { x: 0, y: 1 }, // S-key
    65: { x: -1, y: 0 }, // A-key
    68: { x: 1, y: 0 }, // D-key
  };

  function handleKeyDown(
    e: any,
    d = keypress[e.keyCode],
    X = d.x,
    Y = d.y,
    staticObject = ["w", "b", "tb"],
    immutableObject = ["w"],
    moveAbleObject = ["b"]
  ) {
    let copyGameBoard = [...newGameBoard.map((row) => [...row])]; //  important so we don't mutate the state directly in global scope
    const cellOne = copyGameBoard[y + Y][x + X],
      cellTwo = copyGameBoard[y + Y * 2][x + X * 2]; // Calculate the indices of the cells affected by the movement cellOne => first cell, cellTwo => second cell

    if (immutableObject.includes(cellOne) || (staticObject.includes(cellOne) && staticObject.includes(cellTwo))) return; // Check if the movement is valid based on static objects array

    if (cellOne.includes("b")) {
      copyGameBoard[y + Y][x + X] = cellOne.replace("b", "p");
      copyGameBoard[y + Y * 2][x + X * 2] += "b";
    } else {
      copyGameBoard[y + Y][x + X] += "p";
    }
    copyGameBoard[y][x] = copyGameBoard[y][x].replace("p", ""); // Update the game board based on the type of movement
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //check if there is less free boxes than targets, if the box is stuck it turns into wall mechanic
  let staticBoard = [...copyGameBoard.map((row) => [...row])];
    staticBoard.map((row, y: number) => 
      row.map(
        (cell, x: number) =>
          cell.includes(moveAbleObject) && 
          (((immutableObject.includes(row[x + 1]) || immutableObject.includes(row[x - 1])) && // Check if the box is blocked by a wall and another moveable object
            (staticObject.includes(staticBoard[y + 1][x]) || staticObject.includes(staticBoard[y - 1][x]))) ||
            ((staticObject.includes(row[x + 1]) || staticObject.includes(row[x - 1])) &&
              (immutableObject.includes(staticBoard[y + 1][x]) || immutableObject.includes(staticBoard[y - 1][x])))) &&
          (staticBoard[y][x] = "w")
      )
    );
   
    const moveableObjectsInPlay: number = // Number of not locked boxes and targets still in play
      staticBoard.flatMap((cell) => cell.filter((cell: string) => cell.includes("b"))).length - 
      staticBoard.flatMap((cell) => cell.filter((cell: string) => cell.includes("t"))).length;
      
      document.getElementById("gameStatus")!.innerText = `${(moveableObjectsInPlay < 0)?'You might be stuck...':''}`
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      console.log(staticBoard);

    setNewGameBoard(copyGameBoard);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [newGameBoard]);

  const style = { height: (500 / newGameBoard[0].length) * newGameBoard.length };
  return (
    <>
      <InstructionButton />
      <Form changeLevel={changeLevel} setLevel={setLevelValue} levelValue={value} />

      <main className="gameBoard" style={style}>
        {newGameBoard.map((row, y: number) =>
          row.map((cell: string, x: number) => (
            <div
              className={`${[cell]}` == "tb" ? "boxOnTarget cellDiv" : `${[cell]}` == "b" ? "box cellDiv" : "cellDiv"}
              key={x}
              style={{
                width: 500 / newGameBoard[0].length,
                backgroundImage: `url(${backgoundImage[cell]})`,
              }}
            >
            </div>
          ))
        )}
      </main>
      <p id="gameStatus"></p>
    </>
  );
}

export default App;

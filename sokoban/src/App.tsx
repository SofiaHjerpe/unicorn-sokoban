import { useEffect, useState } from "react";
import { GamePlans } from "./Globals";
import { Form } from "./components/Form";
import InstructionButton from "./components/Instruction";
import "./game.css";
import Timer from "./components/Timer";

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
  const [countBoardChange, setCountBoardChange] = useState(0);

  const changeLevel = (level: number) => {
    GamePlans.map((plan, index) => (level === index + 1 ? setNewGameBoard(plan) : null));
    //for timer restart when level changes:
    setCountBoardChange((countBoardChange) => countBoardChange + 1);
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
    37: { x: -1, y: 0 },
    38: { x: 0, y: -1 },
    39: { x: 1, y: 0 },
    40: { x: 0, y: 1 },
  };

  function handleKeyDown(e: any, direction = keypress[e.keyCode], X = direction.x, Y = direction.y, staticObject = ["w", "b", "tb"]) {
    let cMap = [...newGameBoard.map((row) => [...row])]; // Clone the array and its nestled arrays - important so we don't mutate the state directly in global scope
    const I = cMap[y + Y][x + X],
      II = cMap[y + Y * 2][x + X * 2]; // Calculate the indices of the cells affected by the movement I => first cell, II => second cell

    if (I === "w" || (staticObject.includes(I) && staticObject.includes(II))) return; // Check if the movement is valid based on static objects array

    I.includes("b") ? (cMap[y + Y][x + X] = I.replace("b", "p")) && (cMap[y + Y * 2][x + X * 2] += "b") : (cMap[y + Y][x + X] += "p");
    cMap[y][x] = cMap[y][x].replace("p", ""); // Update the game board based on the type of movement

    setNewGameBoard(cMap);
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
        {newGameBoard.map((row) =>
          row.map((cell: string, cellid: number) => (
            <div
              className={`${[cell]}` == "tb" ? "boxOnTarget cellDiv" : `${[cell]}` == "b" ? "box cellDiv" : "cellDiv"}
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

      <Timer countBoardChange={countBoardChange} />
    </>
  );
}

export default App;

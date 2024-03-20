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
  const [numberOfCorrectBoxes, setNumberOfCorrectBoxes] = useState(0);
  const [newGameBoard, setNewGameBoard] = useState<any[]>(GamePlans[0]);
  const [value, setLevelValue] = useState("");
  const [winningMessage, setWinningMessage] = useState("");

  const changeLevel = (level: number) => {
    GamePlans.map((plan, index) => (level === index + 1 ? setNewGameBoard(plan) : null));
  };

  useEffect(() => {
    if (numberOfCorrectBoxes >= 4) {
      setTimeout(() => {
        changeLevel(2);
      }, 3000);
      setWinningMessage("Congratulations! You won!");
    } else {
      setWinningMessage("");
    }
  }, [numberOfCorrectBoxes]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [newGameBoard]);

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

  function handleKeyDown(
    e: any,
    direction = keypress[e.keyCode],
    X = direction.x,
    Y = direction.y,
    staticObject = ["w", "b", "tb"]
  ) {
    let cMap = [...newGameBoard.map((row) => [...row])]; // Clone the array and its nestled arrays - important so we don't mutate the state directly in global scope
    const I = cMap[y + Y][x + X],
      II = cMap[y + Y * 2][x + X * 2]; // Calculate the indices of the cells affected by the movement I => first cell, II => second cell

    if (I === "w" || (staticObject.includes(I) && staticObject.includes(II))) return; // Check if the movement is valid based on static objects array

    I.includes("b")
      ? (cMap[y + Y][x + X] = I.replace("b", "p")) && (cMap[y + Y * 2][x + X * 2] += "b")
      : (cMap[y + Y][x + X] += "p");
    cMap[y][x] = cMap[y][x].replace("p", ""); // Update the game board based on the type of movement

    setNewGameBoard(cMap);
  }

  const checkIfBoxAreCorrect = (item: any) => {
    if (`${[item]}` == "tb") {
      return "boxOnTarget cellDiv";
    } else if (`${[item]}` == "b") {
      return "box cellDiv";
    } else {
      return "cellDiv";
    }
  };

  useEffect(() => {
    let correctBoxes = 0;
    newGameBoard.forEach((row) => {
      row.forEach((cell: any) => {
        if (checkIfBoxAreCorrect(cell) === "boxOnTarget cellDiv") {
          correctBoxes += 1;
        }
      });
    });
    setNumberOfCorrectBoxes(correctBoxes);
  }, [newGameBoard]);

  const style = { height: (500 / newGameBoard[0].length) * newGameBoard.length };
  return (
    <>
      <InstructionButton />
      <Form changeLevel={changeLevel} setLevel={setLevelValue} levelValue={value} />
      <main className="gameBoard" style={style}>
        {newGameBoard.map((row) =>
          row.map((cell: string, cellid: number) => {
            const nameOfClass = checkIfBoxAreCorrect(cell);
            return (
              <div key={cellid} style={{ display: "inline-block" }}>
                <div
                  className={nameOfClass}
                  style={{
                    width: 500 / newGameBoard[0].length,
                    backgroundImage: `url(${backgoundImage[cell]})`,
                  }}
                >
                  {cell}
                </div>
              </div>
            );
          })
        )}
      </main>
      <p className="message">{winningMessage}</p>
    </>
  );
}

export default App;

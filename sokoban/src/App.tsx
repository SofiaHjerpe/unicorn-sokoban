import { useContext, useEffect, useState } from "react";
import { Form } from "./components/Form";
import InstructionButton from "./components/Instruction";
import "./game.css";
import Timer from "./components/Timer";
import { GameContext } from "./context/GameContextProvider";
import { GamePlans } from "./Globals";

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
  const { levelValue, setLevelValue, newGameBoard, setNewGameBoard } = useContext(GameContext);
  const [numberOfCorrectBoxes, setNumberOfCorrectBoxes] = useState(0);
  const [countBoardChange, setCountBoardChange] = useState(0);
  const [winningMessage, setWinningMessage] = useState("");

  const changeLevel = (newLevel: number) => {
    GamePlans.map((plan, index) => {
      if (index + 1 === newLevel) {
        setNewGameBoard(plan);
        setCountBoardChange((countBoardChange) => countBoardChange + 1);
      } else {
        null;
      }
      document.getElementById("gameStatus")!.innerText = "";
      setLevelValue(newLevel);
    });
  };
  useEffect(() => {
    //Winning check
    //If all targets are done, send winning information.
    const numberOfTargets = countTargets();
    if (numberOfCorrectBoxes >= numberOfTargets) {
      setTimeout(() => {
        changeLevel(levelValue + 1);
      }, 3000);
      //Reset after 6 seconds
      setTimeout(() => {
        setWinningMessage("");
      }, 6000);
      setWinningMessage("Congratulations! You won!");
    } else {
      setWinningMessage("");
    }
  }, [numberOfCorrectBoxes]);
  //Move up useEffects to here
  useEffect(() => {
    //Count the number of correct boxes and update the winning check. See row 29.
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
    38: { x: 0, y: -1 }, // Arrow keys UP
    40: { x: 0, y: 1 }, // Arrow keys DOWN
    37: { x: -1, y: 0 }, // Arrow keys LEFT
    39: { x: 1, y: 0 }, // Arrow keys RIGHT

    87: { x: 0, y: -1 }, // W-key
    83: { x: 0, y: 1 }, // S-key
    65: { x: -1, y: 0 }, // A-key
    68: { x: 1, y: 0 }, // D-key
  };
  const countTargets = () => {
    const copyOfBoard = [...newGameBoard.map((row) => [...row])];
    //How many targets is it in current board?
    const targets = copyOfBoard.flatMap((cell) =>
      cell.filter((cell: string) => cell.includes("t"))
    ).length;
    return targets;
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
    const copyGameBoard = [...newGameBoard.map((row) => [...row])]; //  important so we don't mutate the state directly in global scope
    const cellOne = copyGameBoard[y + Y][x + X],
      cellTwo = copyGameBoard[y + Y * 2][x + X * 2]; // Calculate the indices of the cells affected by the movement cellOne => first cell, cellTwo => second cell

    if (
      immutableObject.includes(cellOne) ||
      (staticObject.includes(cellOne) && staticObject.includes(cellTwo))
    )
      return; // Check if the movement is valid based on static objects array

    if (cellOne.includes("b")) {
      copyGameBoard[y + Y][x + X] = cellOne.replace("b", "p");
      copyGameBoard[y + Y * 2][x + X * 2] += "b";
    } else {
      copyGameBoard[y + Y][x + X] += "p";
    }
    copyGameBoard[y][x] = copyGameBoard[y][x].replace("p", ""); // Update the game board based on the type of movement

    //check if there is less free boxes than targets, if the box is stuck it turns into wall mechanic
    let staticBoard = [...copyGameBoard.map((row) => [...row])];
    staticBoard.map((row, y: number) =>
      row.map(
        (cell, x: number) =>
          cell.includes(moveAbleObject) &&
          (((immutableObject.includes(row[x + 1]) || immutableObject.includes(row[x - 1])) && // Check if the box is blocked by a wall and another moveable object
            (staticObject.includes(staticBoard[y + 1][x]) ||
              staticObject.includes(staticBoard[y - 1][x]))) ||
            ((staticObject.includes(row[x + 1]) || staticObject.includes(row[x - 1])) &&
              (immutableObject.includes(staticBoard[y + 1][x]) ||
                immutableObject.includes(staticBoard[y - 1][x])))) &&
          (staticBoard[y][x] = "w")
      )
    );

    const moveableObjectsInPlay: number = // Number of not locked boxes and targets still in play
      staticBoard.flatMap((cell) => cell.filter((cell: string) => cell.includes("b"))).length -
      staticBoard.flatMap((cell) => cell.filter((cell: string) => cell.includes("t"))).length;

    document.getElementById("gameStatus")!.innerText = `${
      moveableObjectsInPlay < 0 ? "You might be stuck..." : ""
    }`;

    setNewGameBoard(copyGameBoard);
  }

  const checkIfBoxAreCorrect = (cellItem: any) => {
    if (`${[cellItem]}` == "tb") {
      return "boxOnTarget cellDiv";
    } else if (`${[cellItem]}` == "b") {
      return "box cellDiv";
    } else {
      return "cellDiv";
    }
  };

  const style = {
    height: (500 / newGameBoard[0].length) * newGameBoard.length,
  };
  return (
    <>
      <InstructionButton />
      <Form />

      <main className="gameBoard" style={style}>
        {newGameBoard.map((row) =>
          row.map((cell: string, cellid: number) => {
            const nameOfClass = checkIfBoxAreCorrect(cell); //dynamic class, see checkIfBoxAreCorrect(cell).
            return (
              <div key={cellid} style={{ display: "inline-block" }}>
                <div
                  className={nameOfClass}
                  style={{
                    width: 500 / newGameBoard[0].length,
                    backgroundImage: `url(${backgoundImage[cell]})`,
                  }}
                ></div>
              </div>
            );
          })
        )}
      </main>

      <p className="winning-message">{winningMessage}</p>
      <p id="gameStatus"></p>
      <Timer countBoardChange={countBoardChange} />
    </>
  );
}

export default App;

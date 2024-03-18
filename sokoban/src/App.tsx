import { useEffect, useState } from "react";
import { GamePlans } from "./Globals";
import { Form } from "./components/Form";
import "./game.css";

const backgoundImage: Record<string, string> = {
  w: "src/assets/images/wall.jpg",
  b: "src/assets/images/box.jpg",
  tb: "src/assets/images/box.jpg",
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

  let targets: number = 7;
  
  //Get players coordinates
  let x: number = -2;
  let playerRow = newGameBoard.filter((row: any) => row.includes("p"));
  if (playerRow.length == 0) {
    playerRow = newGameBoard.filter((row: any) => row.includes("tp"));
    x = playerRow[0].indexOf("tp");
  } else {
    x = playerRow[0].indexOf("p");
  }
  let y: number = newGameBoard.indexOf(playerRow[0]);


  let boxArray: any = [];
  newGameBoard.map((row: any, i: any) => row.map((tile: any, j: any) => tile === "b" && boxArray.push({ x: j, y: i })));

  //get boxes next to walls to check if next step is possible:
  let boxLocked = boxArray.filter(
    (box: any) => (newGameBoard[box.y + 1][box.x] == "w" || newGameBoard[box.y - 1][box.x] == "w") && (newGameBoard[box.y][box.x + 1] == "w" || newGameBoard[box.y][box.x - 1] == "w")
  );

  const keypress: any = {
    37: { x: -1, y: 0 },
    38: { x: 0, y: -1 },
    39: { x: 1, y: 0 },
    40: { x: 0, y: 1 },
  };

  useEffect(() => {
    function handleKeyDown(e: any, xy = keypress[e.keyCode], X = xy.x, Y = xy.y) {
      //X: step in horizontal: +1 = one step to right, -1 = one step to left
      //Y: step in vertical: +1 = one step down, -1 = 1 step up
      //xy: this is the steps above as an object, for example {x:1, y; 0} -> one step to the right but you are in the same row

      let copiedMap = [...newGameBoard];

      /*--- MOVE THE BOX ---*/
      //Do not do anything if the new place etc ...
      //would be a wall.
      //is a box, and next to the box there is a wall.
      //is a box on target, but next to this box there is another box.
      //is a box on target, but next to this box there is another box that is on target.
      if (
        copiedMap[y + Y][x + X] === "w" ||
        (copiedMap[y + Y][x + X] === "b" && copiedMap[y + Y * 2][x + X * 2] === "w") ||
        (copiedMap[y + Y][x + X] === "b" && copiedMap[y + Y * 2][x + X * 2] === "b") ||
        (copiedMap[y + Y][x + X] === "tb" && copiedMap[y + Y * 2][x + X * 2] === "w") ||
        (copiedMap[y + Y][x + X] === "b" && copiedMap[y + Y * 2][x + X * 2] === "tb") ||
        (copiedMap[y + Y][x + X] === "tb" && copiedMap[y + Y * 2][x + X * 2] === "b") ||
        (copiedMap[y + Y][x + X] === "tb" && copiedMap[y + Y * 2][x + X * 2] === "tb")
      ) {
        return;
      }
      //Move the box, if the new place is a ...
      //box, but the box can move.
      //target
      //empty
      else if (copiedMap[y + Y][x + X] === "b" || copiedMap[y + Y][x + X] === "tb") {
        if (copiedMap[y + Y * 2][x + X * 2] == "t") {
          copiedMap[y + Y * 2][x + X * 2] = "tb";
        } else if (copiedMap[y + Y * 2][x + X * 2] == "") {
          copiedMap[y + Y * 2][x + X * 2] = "b";
        }

        //Handle old place of box...
        if (copiedMap[y + Y][x + X] == "b") {
          copiedMap[y + Y][x + X] = "";
        } else if (copiedMap[y + Y][x + X] == "tb") {
          copiedMap[y + Y][x + X] = "t";
        }
      }

      /*--- MOVE THE PLAYER ---*/
      if (copiedMap[y + Y][x + X] == "t") {
        copiedMap[y + Y][x + X] = "tp";
      } else if (copiedMap[y + Y][x + X] == "") {
        copiedMap[y + Y][x + X] = "p";
      }
      //Handle old place of player...
      if (copiedMap[y][x] == "tp") {
        copiedMap[y][x] = "t";
      } else {
        copiedMap[y][x] = "";
      }

      setNewGameBoard(copiedMap);
    }

    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [newGameBoard]);

  const style = { height: (500 / newGameBoard[0].length) * newGameBoard.length };
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
      {boxArray.length - boxLocked.length < targets && <div id="impossibleDiv">Impossible to win</div>}
    </>
  );
}

export default App;

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

  let [newMap, setNewMap] = useState(GamePlans[0]);
  let targets: number = 7;
  /*   let targetArray: any = [];
  newMap.map((row: any, i: any) => row.map((tile: any, j: any) => tile === "t" && targetArray.push({ x: j, y: i })));
  let targets = targetArray.length; */

  //Get players coordinates
  //the map may or may not have p. If there is no p then there is tp:
  let x: number = -2;
  let playerRow = newMap.filter((row: any) => row.includes("p"));
  if (playerRow.length == 0) {
    playerRow = newMap.filter((row: any) => row.includes("tp"));
    x = playerRow[0].indexOf("tp");
  } else {
    x = playerRow[0].indexOf("p");
  }
  let y: number = newMap.indexOf(playerRow[0]);

  //get all boxes into an array
  let boxArray: any = [];
  newMap.map((row: any, i: any) => row.map((tile: any, j: any) => tile === "b" && boxArray.push({ x: j, y: i })));

  //get boxes next to walls to check if next step is possible:
  let boxLocked = boxArray.filter(
    (box: any) => (newMap[box.y + 1][box.x] == "w" || newMap[box.y - 1][box.x] == "w") && (newMap[box.y][box.x + 1] == "w" || newMap[box.y][box.x - 1] == "w")
  );
  if (boxArray.length - boxLocked.length < targets) {
    console.log("Impossible to win");
  }

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
      //xy: this is the steps above as an object, for example {x:1, y:0} -> one step to the right but you are in the same row

      //if we do not more: do nothing
      if (!xy) return;
      let copiedMap = [...newMap];

      /*--- MOVE THE BOX ---*/
      //if new place would be a wall-> do not do anything
      //if the new place is a box, and next to the box there is a wall -> do not to anything
      //if the new place is a box, but next to this box there is another box -> do not to anything
      //if the new place is a box with target, but next to this box there is another box -> do not to anything
      //if the new place is a box, but next to this box there is another box that is on target -> do not to anything
      //if the new place is a box on target, but next to this box there is another box -> do not to anything
      //if the new place is a box on target, but next to this box there is another box that is on target -> do not to anything
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
      //if the new place is a box, but the box can move -> move the box, make player old place to floor
      else if (copiedMap[y + Y][x + X] === "b" || copiedMap[y + Y][x + X] === "tb") {
        //if the new place is target -> tb
        if (copiedMap[y + Y * 2][x + X * 2] == "t") {
          copiedMap[y + Y * 2][x + X * 2] = "tb";
          //copiedMap[y + Y * 2][x + X * 2].style.backgroundColor = "red";
        }
        //if the new place is empty -> b
        else if (copiedMap[y + Y * 2][x + X * 2] == "") {
          copiedMap[y + Y * 2][x + X * 2] = "b";
        }
        //if the old place is just b -> then change back to empty
        if (copiedMap[y + Y][x + X] == "b") {
          copiedMap[y + Y][x + X] = "";
        }
        //if the old place is tb -> then change back to target
        else if (copiedMap[y + Y][x + X] == "tb") {
          copiedMap[y + Y][x + X] = "t";
        }
      }
      /*--- MOVE THE PLAYER ---*/
      //if the new place is t -> change is to tp
      if (copiedMap[y + Y][x + X] == "t") {
        copiedMap[y + Y][x + X] = "tp";
      }
      //if the new place is empty -> change it to p
      else if (copiedMap[y + Y][x + X] == "") {
        copiedMap[y + Y][x + X] = "p";
      }
      //if the old place is tp -> then change back to t
      if (copiedMap[y][x] == "tp") {
        copiedMap[y][x] = "t";
      } else {
        copiedMap[y][x] = "";
      }

      setNewMap(copiedMap);
    }

    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [newMap]);

  const style = { height: (500 / newGameBoard[0].length) * newGameBoard.length };
  return (
    <>
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
      {boxArray.length - boxLocked.length < targets && <div id="impossibleDiv">Impossible to win</div>}
    </>
  );
}

export default App;

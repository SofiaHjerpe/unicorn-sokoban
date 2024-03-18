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

  let x: number = -2;
  let playerRow = newGameBoard.filter((row: any) => row.includes("p"));
  if (playerRow.length == 0) {
    playerRow = newGameBoard.filter((row: any) => row.includes("tp"));
    x = playerRow[0].indexOf("tp");
  } else {
    x = playerRow[0].indexOf("p");
  }
  let y: number = newGameBoard.indexOf(playerRow[0]);

  const keypress: any = {
    37: { x: -1, y: 0 },
    38: { x: 0, y: -1 },
    39: { x: 1, y: 0 },
    40: { x: 0, y: 1 },
  };

  function handleKeyDown(e: any, direction = keypress[e.keyCode], X = direction.x, Y = direction.y, staticObject = ["w", "b", "tb"]) {
    let cMap = [...newGameBoard.map((row) => [...row])];
    const I = cMap[y + Y][x + X], II = cMap[y + Y * 2][x + X * 2];

    if (I === "w" || (staticObject.includes(I) && staticObject.includes(II))) return;

    I.includes("b") ? (cMap[y + Y][x + X] = I.replace("b", "p")) && 
    (cMap[y + Y * 2][x + X * 2] += "b") : (cMap[y + Y][x + X] += "p");
    cMap[y][x] = cMap[y][x].replace("p", "");

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

// import { useContext } from "react"
// // import { GameContext } from "./context/GameContextProvider"
import { useState } from "react";
import { GameBoard } from "./Globals";
import "./game.css";

const colors: any = {
  w: "red",
  b: "brown",
  g: "green",
};
console.log("ok");
function App() {
  // //   const {gamePlan} = useContext(GameContext);

  const [newGameBoard, setNewGameBoard] = useState(GameBoard);

  return (
    <>
      <main
        style={{
          width: 500,
          height: (500 / newGameBoard[0].length) * newGameBoard.length,
        }}
      >
        {newGameBoard.map((row) =>
          row.map((cell: string, cellid: number) => (
            <div
              className="cell"
              key={cellid}
              style={{
                width: 500 / newGameBoard[0].length,
                backgroundColor: `${colors[cell]}`,
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

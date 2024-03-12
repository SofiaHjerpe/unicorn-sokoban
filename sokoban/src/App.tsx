// import { useContext } from "react"
// // import { GameContext } from "./context/GameContextProvider"
import { useState } from "react";
import { GameBoard } from "./Globals";
import "./game.css";

const colors: any = {
  w: "blue",
  b: "brown",
  p: "green",
};

function App() {
  // //   const {gamePlan} = useContext(GameContext);

  const [newGameBoard, setNewGameBoard] = useState(GameBoard);

  console.log("Detta är ett test");

  return (
    <>
      <main style={{ width: 500, height: 500, backgroundColor: "yellow" }}>
        {newGameBoard.map((row) =>
          row.map((cell: string, cellid: number) => (
            <div key={cellid} style={{ width: 500 / newGameBoard[0].length, backgroundColor: `${colors[cell]}` }}>
              {cell}
            </div>
          ))
        )}
      </main>
    </>
  );
}

export default App;

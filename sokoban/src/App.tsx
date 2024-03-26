import { useEffect, useState } from 'react';
import { GamePlans } from './Globals';
import { Form } from './components/Form';
import InstructionButton from './components/Instruction';
import './game.css';
import Timer from './components/Timer';

import { GameLogic } from "./GameLogic/GameBoard";
import { MoveLogic } from "./GameLogic/Movement";

const path = (img: string) => `src/assets/images/${img}.jpg`;
const backgoundImage: Record<string, string> = {
  w: path('wall'),
  b: path('box'),
  tb: path('box'),
  p: path('player'),
  tp: path('player'),
  '': path('floor'),
  t: path('target'),
};



function App() {
  const [numberOfCorrectBoxes, setNumberOfCorrectBoxes] = useState(0);
  const [newGameBoard, setNewGameBoard] = useState<any[]>(GamePlans[0]);
  const [levelValue, setLevelValue] = useState(1);
  const [countBoardChange, setCountBoardChange] = useState(0);
  const [winningMessage, setWinningMessage] = useState('');

  const changeLevel = (newLevel: number) => {
    GamePlans.map((plan, index) => {
      if (index + 1 === newLevel) {
        setNewGameBoard(plan);
        setCountBoardChange(countBoardChange => countBoardChange + 1);
      } else {
        null;
      }
      document.getElementById('gameStatus')!.innerText = '';
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
        setWinningMessage('');
      }, 6000);
      setWinningMessage('Congratulations! You won!');
    } else {
      setWinningMessage('');
    }
  }, [numberOfCorrectBoxes]);
  //Move up useEffects to here
  useEffect(() => {
    //Count the number of correct boxes and update the winning check. See row 29.
    let correctBoxes = 0;
    newGameBoard.forEach(row => {
      row.forEach((cell: any) => {
        if (checkIfBoxAreCorrect(cell) === 'boxOnTarget cellDiv') {
          correctBoxes += 1;
        }
      });
    });
    setNumberOfCorrectBoxes(correctBoxes);
  }, [newGameBoard]);

  const worldData = GameLogic([...newGameBoard.map((newRow) => [...newRow])]);
  const worldGameBoard = [...newGameBoard.map((row) => [...row])];

  const handleMovement = (e: any) => {
    console.table(worldData.cells);
    MoveLogic(e, worldData, worldGameBoard);
    setNewGameBoard(worldGameBoard);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleMovement);
    return function cleanup() {
      document.removeEventListener("keydown", handleMovement);
    };
  }, [newGameBoard]);


  const countTargets = () => {
    const copyOfBoard = [...newGameBoard.map(row => [...row])];
    //How many targets is it in current board?

    const targets = copyOfBoard.flatMap((cell) => cell.filter((cell: string) => cell.includes("t"))).length;
    return targets;
  };

  const checkIfBoxAreCorrect = (cellItem: any) => {
    if (`${[cellItem]}` == 'tb') {
      return 'boxOnTarget cellDiv';
    } else if (`${[cellItem]}` == 'b') {
      return 'box cellDiv';
    } else {
      return 'cellDiv';
    }
  };

  const style = {
    height: (500 / newGameBoard[0].length) * newGameBoard.length,
  };
  return (
    <>
      <InstructionButton />
      <Form changeLevel={changeLevel} setLevel={setLevelValue} levelValue={levelValue} />
      <main className="gameBoard" style={style}>
        {newGameBoard.map(row =>
          row.map((cell: string, cellid: number) => {
            const nameOfClass = checkIfBoxAreCorrect(cell); //dynamic class, see checkIfBoxAreCorrect(cell).
            return (
              <div
                key={cellid}
                style={{
                  display: 'inline-block',
                }}>
                <div
                  className={nameOfClass}
                  style={{
                    width: 500 / newGameBoard[0].length,
                    backgroundImage: `url(${backgoundImage[cell]})`,
                  }}></div>
              </div>
            );
          }),
        )}
      </main>

      <p className="winning-message">{winningMessage}</p>
      <p id="gameStatus"></p>
      <Timer countBoardChange={countBoardChange} />
    </>
  );
}

export default App;

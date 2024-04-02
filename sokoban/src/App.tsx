import { useEffect, useState, useRef } from 'react';
import { GamePlans } from './Globals';
import { Form } from './components/Form';
import InstructionButton from './components/Instruction';
import './game.css';
import Timer from './components/Timer';

import { GameLogic } from './GameLogic/GameBoard';
import { MoveLogic } from './GameLogic/Movement';
import { GameStatus } from './GameLogic/GameStatus';
import { getClientSize, getWallBorders } from './GameLogic/Render';
import { ObjectType } from './GameLogic/Logics';

const path = (img: string) => `src/assets/images/${img}`;
const backgoundImage: Record<string, string> = {
  w: path('wall.webp'),
  b: path('box.jpg'),
  tb: path('box.jpg'),
  t: path('target.png'),
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
      GS.isGameUnsolveable;
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

  const worldData = GameLogic([...newGameBoard.map(newRow => [...newRow])]);
  const worldGameBoard = [...newGameBoard.map(row => [...row])];
  const GS = GameStatus(worldData.cells);
  const [direction, setDirection] = useState(-1);

  console.table(GS);

  const handleMovement = (e: any) => {
    const m = MoveLogic(e, worldData, worldGameBoard);
    const newDirection = m?.d.x != 0 ? m?.d.x : direction;

    setDirection(newDirection);
    setNewGameBoard(m?.world);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleMovement);
    return function cleanup() {
      document.removeEventListener('keydown', handleMovement);
    };
  }, [worldData, worldGameBoard]);

  const countTargets = () => {
    const copyOfBoard = [...newGameBoard.map(row => [...row])];
    //How many targets is it in current board?

    const targets = copyOfBoard.flatMap(cell => cell.filter((cell: string) => cell.includes('t'))).length;
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

  const style = getClientSize(window.innerWidth * 0.8, window.innerHeight * 0.8, newGameBoard);

  return (
    <>
      <InstructionButton />
      <Form changeLevel={changeLevel} setLevel={setLevelValue} levelValue={levelValue} />
      <main className="gameBoard" style={style}>
        {newGameBoard.map((row, _y) =>
          row.map((cell: string, _x: number) => {
            const nameOfClass = checkIfBoxAreCorrect(cell); //dynamic class, see checkIfBoxAreCorrect(cell).
            return (
              <div
                key={_x}
                style={{
                  display: 'inline-block',
                }}>
                <div
                  className={nameOfClass}
                  style={{
                    backgroundImage: `url(${backgoundImage[cell]})`,
                    ...getWallBorders(_y, _x, worldData, newGameBoard),
                  }}>
                  {ObjectType.isCharacter.some(value => cell.includes(value)) && (
                    <img
                      src={path(worldData.yx(_y, _x + direction).isPortable ? 'miner2.gif' : 'miner.gif')}
                      id="player"
                      style={{ transform: `scaleX(${direction})` }}
                    />
                  )}
                </div>
              </div>
            );
          }),
        )}
        {GS.returnLoserMessage()}
      </main>

      <p className="winning-message">{winningMessage}</p>

      <Timer countBoardChange={countBoardChange} />
    </>
  );
}

export default App;

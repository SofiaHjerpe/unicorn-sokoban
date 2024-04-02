import { useEffect, useState, useRef } from 'react';
import { GamePlans } from './Globals';
import { Form } from './components/Form';
import InstructionButton from './components/Instruction';
import './game.css';
import Timer from './components/Timer';

import { GameLogic } from './GameLogic/GameBoard';
import { MoveLogic } from './GameLogic/Movement';
import { GetMoveTrackersLocalStorage, GetPushTrackersLocalStorage } from './GameLogic/TrackersLocalStorage';
import { GameStatus } from './GameLogic/GameStatus';
import { getClientSize, getWallBorders } from './GameLogic/Render';
import { ObjectType, playerSkin } from './GameLogic/Logics';
import Statistics from './components/Statistics';

const path = (img: string) => `src/assets/images/${img}`;
const backgoundImage: Record<string, string> = {
  w: path('wall.jpg'),
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
      if (newLevel == 1) {
        //changing level: getting local storage for moveTracker
        GetMoveTrackersLocalStorage(1);
        GetPushTrackersLocalStorage(1);
      }
      if (index + 1 === newLevel) {
        setNewGameBoard(plan);
        setCountBoardChange(countBoardChange => countBoardChange + 1);

        //changing level: getting local storage for moveTracker
        GetMoveTrackersLocalStorage(newLevel);
        GetPushTrackersLocalStorage(newLevel);
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

  const [skin, setSkin]: any = useState('farmerFront');
  const handleMovement = (e: any) => {
    const m = MoveLogic(levelValue, e, worldData, worldGameBoard);
    setSkin(Object.keys(playerSkin).filter(key => JSON.stringify(playerSkin[key]) === JSON.stringify(m?.d)));
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
      <section id="gameBoradWithStatistics">
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
                      <img src={`src/assets/images/${skin}.png`} id="player" />
                    )}
                  </div>
                </div>
              );
            }),
          )}
          {GS.returnLoserMessage()}
        </main>
        <Statistics countBoardChange={countBoardChange} levelValue={levelValue} />
      </section>

      <p className="winning-message">{winningMessage}</p>
      {/* <p id="gameStatus"></p> */}
    </>
  );
}

export default App;

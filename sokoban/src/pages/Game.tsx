import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GamePlans } from '../Globals';
import { Form } from '../components/Form';
import InstructionButton from '../components/Instruction';
import Timer from '../components/Timer';
import '../game.css';

import { GameLogic } from '../GameLogic/GameBoard';
import { MoveLogic } from '../GameLogic/Movement';
import { GetMoveTrackersLocalStorage, GetPushTrackersLocalStorage } from '../GameLogic/TrackersLocalStorage';
import { GameStatus } from '../GameLogic/GameStatus';
import Statistics from '../components/Statistics';

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

function Game() {
  const [numberOfCorrectBoxes, setNumberOfCorrectBoxes] = useState(0);
  const [newGameBoard, setNewGameBoard] = useState<unknown[]>(GamePlans[0]);
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
      const status = document.getElementById('gameStatus');
      if (status !== null) status.innerText = '';
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
      row.forEach((cell: unknown) => {
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

  console.table(GS);
  const handleMovement = (e: any) => {
    MoveLogic(levelValue, e, worldData, worldGameBoard);
    setNewGameBoard(worldGameBoard);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleMovement);
    return function cleanup() {
      document.removeEventListener('keydown', handleMovement);
    };
  }, [newGameBoard]);

  const countTargets = () => {
    const copyOfBoard = [...newGameBoard.map(row => [...row])];
    //How many targets is it in current board?

    const targets = copyOfBoard.flatMap(cell => cell.filter((cell: string) => cell.includes('t'))).length;
    return targets;
  };

  const checkIfBoxAreCorrect = (cellItem: unknown) => {
    if (`${[cellItem]}` == 'tb') {
      return 'boxOnTarget cellDiv';
    } else if (`${[cellItem]}` == 'b') {
      return 'box cellDiv';
    } else {
      return 'cellDiv';
    }
  };
  console.log(levelValue);
  const style = {
    height: (500 / newGameBoard[0].length) * newGameBoard.length,
  };

  return (
    <>
      <InstructionButton />
      <Form changeLevel={changeLevel} setLevel={setLevelValue} levelValue={levelValue} />
      <section id="gameBoradWithStatistics">
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
                  <Outlet />
                </div>
              );
            }),
          )}
        </main>
        <Statistics countBoardChange={countBoardChange} levelValue={levelValue} />
      </section>
      {GS.returnLoserMessage()}
      <p className="winning-message">{winningMessage}</p>
      {/* <p id="gameStatus"></p> */}
    </>
  );
}

export default Game;

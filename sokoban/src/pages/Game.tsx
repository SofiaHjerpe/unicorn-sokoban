import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GamePlans } from '../Globals';
import { Form } from '../components/Form';
import InstructionButton from '../components/Instruction';
import { GameLogic } from '../GameLogic/GameBoard';
import { MoveLogic } from '../GameLogic/Movement';
import {
  GetMoveTrackersLocalStorage,
  GetPushTrackersLocalStorage,
  GetStarsStorage,
  GetTimerLocalStorage,
} from '../GameLogic/TrackersLocalStorage';
import { GameStatus } from '../GameLogic/GameStatus';
import { getClientSize, getWallBorders } from '../GameLogic/Render';
import { ObjectType } from '../GameLogic/Logics';
import Statistics from '../components/Statistics';
import '../game.css';

const path = (img: string) => `../src/assets/images/${img}`;
const backgoundImage: Record<string, string> = {
  w: path('wall.webp'),
  b: path('box.jpg'),
  tb: path('box.jpg'),
  t: path('target.png'),
};

function Game() {
  const [numberOfCorrectBoxes, setNumberOfCorrectBoxes] = useState(0);
  const [newGameBoard, setNewGameBoard] = useState<any[]>(GamePlans[0]);
  const [levelValue, setLevelValue] = useState(1);
  const [countBoardChange, setCountBoardChange] = useState(0);
  const [winningMessage, setWinningMessage] = useState('');
  const [loosingMessage, setLoosingMessage] = useState('');
  localStorage.setItem('losingStorage', 'false');

  const changeLevel = (newLevel: number) => {
    GamePlans.map((plan, index) => {
      if (newLevel == 1) {
        //changing level: getting local storage for moveTracker and timer
        GetMoveTrackersLocalStorage(1);
        GetPushTrackersLocalStorage(1);
        GetTimerLocalStorage(1);
        localStorage.setItem('winningStorage', 'false');
        GetStarsStorage(1);
      }
      if (index + 1 === newLevel) {
        setNewGameBoard(plan);
        setCountBoardChange(countBoardChange => countBoardChange + 1);

        //changing level: getting local storage for moveTracker and timer
        GetMoveTrackersLocalStorage(newLevel);
        GetPushTrackersLocalStorage(newLevel);
        GetTimerLocalStorage(newLevel);
        localStorage.setItem('winningStorage', 'false');
        GetStarsStorage(newLevel);
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
    const numberOfTargets = GS.targets;
    if (numberOfCorrectBoxes >= numberOfTargets) {
      localStorage.setItem('winningStorage', 'true');
      setTimeout(() => {
        changeLevel(levelValue + 1);
      }, 3000);
      //Reset after 6 seconds
      setTimeout(() => {
        setWinningMessage('');
      }, 6000);
      const audioElement = new Audio('/src/assets/win.wav');
      let isMutedMusic = localStorage.getItem('Muted');
      if (isMutedMusic == 'false') audioElement.play();
      setWinningMessage('Congratulations! You won!');
    } else if (GS.returnLoserMessage() !== null) {
      setTimeout(() => {
        setLoosingMessage('GAME OVER - YOU ARE STUCK!');
      }, 1000);
    } else {
      setWinningMessage('');
      setLoosingMessage('');
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
  //console.table(GS);

  const handleMovement = (e: any) => {
    if (
      e.keyCode == 65 ||
      e.keyCode == 83 ||
      e.keyCode == 68 ||
      e.keyCode == 87 ||
      e.keyCode == 37 ||
      e.keyCode == 38 ||
      e.keyCode == 39 ||
      e.keyCode == 40
    ) {
      const m = MoveLogic(levelValue, e, worldData, worldGameBoard);
      const newDirection = m?.d.x != 0 ? m?.d.x : direction;

      setDirection(newDirection);
      setNewGameBoard(m?.world);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleMovement);
    return function cleanup() {
      document.removeEventListener('keydown', handleMovement);
    };
  }, [worldData, worldGameBoard]);

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
                      <img
                        alt="player"
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
          {loosingMessage.length > 2 && <p id="loserMessage">{loosingMessage}</p>}
        </main>
        <Statistics countBoardChange={countBoardChange} levelValue={levelValue} />
      </section>

      <p className="winning-message">{winningMessage}</p>
      <Link to={'/levels'}>LevelPage</Link>
      <Link to={'/settings'}>Settings</Link>
      <Link to={'/'}>Main page</Link>
    </>
  );
}

export default Game;

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GamePlans } from '../Globals';
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
import { ObjectType, playerSkin } from '../GameLogic/Logics';
import Statistics from '../components/Statistics';
import '../game.css';
import selectButton from '../assets/images/select-button.png';
import infoButton from '../assets/images/info.png';
import settingsButton from '../assets/images/settings.png';
// import mainButton from '../assets/images/main.png';
const path = (img: string) => `../src/assets/images/${img}`;
const backgoundImage: Record<string, string> = {
  w: path('wall.jpg'),
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
  //localStorage.setItem('losingStorage', 'false');

  const { id } = useParams();

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
  }, [numberOfCorrectBoxes, newGameBoard]);

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

  const checkIfBoxAreCorrect = (cellItem: any) => {
    if (`${[cellItem]}` == 'tb') {
      return 'boxOnTarget cellDiv';
    } else if (`${[cellItem]}` == 'b') {
      return 'box cellDiv';
    } else {
      return 'cellDiv';
    }
  };
  useEffect(() => {
    switch (id) {
      case '1':
        changeLevel(1);
        break;
      case '2':
        changeLevel(2);
        break;
      case '3':
        changeLevel(3);
        break;
      case '4':
        changeLevel(4);
        break;
    }
  }, [id]);
  const style = getClientSize(window.innerWidth * 0.8, window.innerHeight * 0.8, newGameBoard);

  return (
    <>
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
                      <img src={`../src/assets/images/${skin}.png`} id="player" />
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
      <Link to={'/levels'}>
        {' '}
        <img src={selectButton} className="select-button" alt="select" style={{ width: '120px', height: 'auto' }} />
      </Link>
      <Link to={'/info'}>
        {' '}
        <img src={infoButton} className="info-button" alt="info" />
      </Link>
      <Link to={'/settings'}>
        {' '}
        <img src={settingsButton} className="setting-button" alt="setting" />
      </Link>
      {/* <Link to={'/main'}> <img src={mainButton} className="main-button" alt="main" />
          </Link> */}
    </>
  );
}

export default Game;

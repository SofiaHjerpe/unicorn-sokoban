import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GamePlans } from '../Globals';
import { GameLogic } from '../GameLogic/GameBoard';
import { MoveLogic } from '../GameLogic/Movement';
import { audio1 } from '../audios';
import {
  GetMoveTrackersLocalStorage,
  GetPushTrackersLocalStorage,
  GetStarsStorage,
  GetTimerLocalStorage,
} from '../GameLogic/TrackersLocalStorage';
import { GameStatus } from '../GameLogic/GameStatus';
import { getClientSize, getWallBorders } from '../GameLogic/Render';
import { playerSkin } from '../GameLogic/Logics';
import Statistics from '../components/Statistics';
import '../game.css';
import selectButton from '../assets/images/select-button.png';
import infoButton from '../assets/images/info.png';
import settingsButton from '../assets/images/settings.png';

function Game() {
  const [numberOfCorrectBoxes, setNumberOfCorrectBoxes] = useState(0);
  const [newGameBoard, setNewGameBoard] = useState<any[]>(GamePlans[0]);
  const [levelValue, setLevelValue] = useState(1);
  const [countBoardChange, setCountBoardChange] = useState(0);
  const [winningMessage, setWinningMessage] = useState('');
  const [loosingMessage, setLoosingMessage] = useState('');

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
      case '5':
        changeLevel(5);
        break;
      case '6':
        changeLevel(6);
        break;
      case '7':
        changeLevel(7);
        break;
      case '8':
        changeLevel(8);
        break;
    }
  }, [id]);

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
      setWinningMessage('Congratulations! You won!');
      const audioElement = new Audio(`${audio1}`);
      let isMutedMusic = localStorage.getItem('Muted');
      if (isMutedMusic == 'false') audioElement.play();
    } else if (GS.returnLoserMessage() !== null) {
      setTimeout(() => {
        setLoosingMessage('GAME OVER - YOU ARE STUCK!');
      }, 1000);
    } else {
      setWinningMessage('');
      setLoosingMessage('');
    }
  }, [numberOfCorrectBoxes]);

  useEffect(() => {
    //Count the number of correct boxes and update the winning check. See row 29.
    let correctBoxes = 0;
    newGameBoard.forEach(row => {
      row.forEach((cell: any) => {
        if (checkIfBoxAreCorrect(cell) === 'boxOnTarget cellDiv box') {
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
      return 'boxOnTarget cellDiv box';
    } else if (`${[cellItem]}` == 'b') {
      return 'box cellDiv';
    } else if (`${[cellItem]}` == 't') {
      return 't cellDiv';
    } else if (`${[cellItem]}` == 'w') {
      return 'w cellDiv';
    } else if (`${[cellItem]}` == 'tp') {
      return setAnimation(skin);
    } else if (`${[cellItem]}` == 'p') {
      return setAnimation(skin);
    } else {
      return 'cellDiv';
    }
  };

  const setAnimation = (skin: any) => {
    if (`${[skin]}` == 'farmerFront') {
      return ' player farmerFront';
    } else if (`${[skin]}` == 'farmerBack') {
      return 'player farmerBack';
    } else if (`${[skin]}` == 'farmerLeft') {
      return 'player farmerLeft';
    } else if (`${[skin]}` == 'farmerRight') {
      return 'player farmerRight';
    } else {
      return 'player farmerFront';
    }
  };

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
                      ...getWallBorders(_y, _x, worldData, newGameBoard),
                    }}></div>
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
        <img src={selectButton} className="select-button" alt="select" style={{ width: '120px', height: 'auto' }} />
      </Link>
      <Link to={'/info'}>
        <img src={infoButton} className="info-button" alt="info" />
      </Link>
      <Link to={'/settings'}>
        <img src={settingsButton} className="setting-button" alt="setting" />
      </Link>
    </>
  );
}

export default Game;

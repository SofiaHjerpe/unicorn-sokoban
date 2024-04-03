import { SetStarStorage } from '../GameLogic/TrackersLocalStorage';
import Timer from './Timer';

const Statistics = ({ countBoardChange, levelValue }: any) => {
  const moveStorageName = 'Movestorage' + levelValue;
  let moveStorage = localStorage.getItem(moveStorageName);
  let numberOfMovements = JSON.parse(moveStorage!)?.move;

  const pushStorageName = 'Pushstorage' + levelValue;
  let pushStorage = localStorage.getItem(pushStorageName);
  let numberOfPushes = JSON.parse(pushStorage!)?.push;

  const timerStorageName = 'Timerstorage' + levelValue;
  let timerStorage = localStorage.getItem(timerStorageName);
  let time = JSON.parse(timerStorage!)?.millisec / 60;

  let stars = 0;

  let afterWinning = localStorage.getItem('winningStorage');

  if (afterWinning == 'true') {
    if (numberOfMovements < 81 && numberOfPushes < 31 && time < 15) stars = 5;
    else if (
      (numberOfMovements >= 81 && numberOfMovements < 140) ||
      (numberOfPushes >= 41 && numberOfPushes < 70) ||
      (time >= 15 && time < 30)
    )
      stars = 4;
    else if (
      (numberOfMovements >= 141 && numberOfMovements < 160) ||
      (numberOfPushes >= 71 && numberOfPushes < 100) ||
      (time >= 31 && time < 60)
    )
      stars = 3;
    else if (
      (numberOfMovements >= 161 && numberOfMovements < 240) ||
      (numberOfPushes >= 101 && numberOfPushes < 120) ||
      (time >= 61 && time < 80)
    )
      stars = 2;
    else stars = 1;
  }

  SetStarStorage(levelValue, stars);

  let score = '';
  for (let i = 0; i < stars; i++) {
    score += '⭐';
  }

  return (
    <div id="statisticsDiv">
      <h3>Your statistics:</h3>
      <div className="statisticData">
        <span>Moves: </span>
        {numberOfMovements}
      </div>
      <div className="statisticData">
        <span>Pushes: </span>
        {numberOfPushes}
      </div>

      <Timer countBoardChange={countBoardChange} levelValue={levelValue} />
      <p id="starsInStatistics">{afterWinning == 'true' && score}</p>
    </div>
  );
};

export default Statistics;

import Timer from './Timer';

const Statistics = ({ countBoardChange, levelValue }: any) => {
  const moveStorageName = 'Movestorage' + levelValue;
  let moveStorage = localStorage.getItem(moveStorageName);
  let numberOfMovements = JSON.parse(moveStorage!).move;

  const pushStorageName = 'Pushstorage' + levelValue;
  let pushStorage = localStorage.getItem(pushStorageName);
  let numberOfPushes = JSON.parse(pushStorage!).push;

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

      <Timer countBoardChange={countBoardChange} />
    </div>
  );
};

export default Statistics;

import { useEffect, useState } from 'react';
import { SetTimerLocalStorage } from './../GameLogic/TrackersLocalStorage';

interface ITimerProps {
  countBoardChange: number;
  levelValue: number;
}

const Timer = ({ countBoardChange, levelValue }: ITimerProps) => {
  const [milliseconds, setMilliSeconds] = useState(0);
  let ranOnce = true;

  useEffect(() => {
    //reset to zero after level change:
    setMilliSeconds(0);
    SetTimerLocalStorage(levelValue, 0);
    //set millisecond: 1000/16
    let interval: any = null;
    if (ranOnce) {
      interval = setInterval(() => {
        setMilliSeconds(milliseconds => milliseconds + 1);   
        SetTimerLocalStorage(levelValue, milliseconds);
      }, 1000 / 58.826);
    } else if (!ranOnce && milliseconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [countBoardChange]);

  //get second, minute, hour from millisecond
  let countedSecond = Math.floor(milliseconds / 60);
  let countedMinute = Math.floor(milliseconds / 60 / 60);
  let countedHour = Math.floor(milliseconds / 60 / 60 / 60);

  function getTime(countedTime: number) {
    let resetTime = countedTime;
    if (countedTime == 60) {
      resetTime = 0;
    }
    if (countedTime > 60) {
      resetTime = resetTime % 60;
    }
    return resetTime;
  }

  let secondToFormat = getTime(countedSecond);
  let minuteToFormat = getTime(countedMinute);
  let hourToFormat = getTime(countedHour);

  //formatting:
  let formattedSeconds = secondToFormat < 10 ? '0' + secondToFormat : secondToFormat;
  let formattedMinutes = minuteToFormat < 10 ? '0' + minuteToFormat : minuteToFormat;
  let formattedHours = hourToFormat < 10 ? '0' + hourToFormat : hourToFormat;

  /*   SetTimerLocalStorage(levelValue, milliseconds); */
  return (
    <div id="timerDiv">
      <p id="timerText">
        {hourToFormat > 0 ? formattedHours + ':' : ''}
        {minuteToFormat > 0 ? formattedMinutes + ':' : ''}
        {formattedSeconds}
      </p>
    </div>
  );
};

export default Timer;

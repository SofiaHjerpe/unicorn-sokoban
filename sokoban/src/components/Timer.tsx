import { useEffect, useState } from "react";

const Timer = ({ countBoardChange }: any) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let ranOnce = true;

  useEffect(() => {
    //reset to zero after level change:
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    //set seconds:
    let interval: any = null;
    if (ranOnce) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!ranOnce && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [countBoardChange]);

  //reset after 24 or 60
  if (hours == 24) {
    setHours(0);
  }
  if (minutes == 60) {
    setMinutes(0);
    setHours((minutes) => minutes + 1);
  }
  if (seconds == 60) {
    setSeconds(0);
    setMinutes((minutes) => minutes + 1);
  }

  let formattedHours = hours < 10 ? "0" + hours : hours;
  let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  return (
    <div id="timerDiv">
      <p id="timerText">
        {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </p>
    </div>
  );
};

export default Timer;

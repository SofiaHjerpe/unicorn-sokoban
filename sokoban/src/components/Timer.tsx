import React, { useEffect, useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTimer(timer + 1);
    }, 1000);
  }, []);

  return <div>{timer}</div>;
};

export default Timer;

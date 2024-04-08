export const GetMoveTrackersLocalStorage = (level: number) => {
  const moveStorageName = 'Movestorage' + level;
  const tracker = {
    level: level,
    move: 0,
  };
  localStorage.setItem(moveStorageName, JSON.stringify(tracker));
};

export const GetPushTrackersLocalStorage = (level: number) => {
  const pushStorageName = 'Pushstorage' + level;
  const tracker = {
    level: level,
    push: 0,
  };
  localStorage.setItem(pushStorageName, JSON.stringify(tracker));
};

export const SetMoveTrackersLocalStorage = (levelValue: number) => {
  const moveStorageName = 'Movestorage' + levelValue;
  let moveStorage = localStorage.getItem(moveStorageName);
  if (!moveStorage || moveStorage == null) {
    GetMoveTrackersLocalStorage(levelValue);
    const tracker = {
      level: levelValue,
      move: 1,
    };
    localStorage.setItem(moveStorageName, JSON.stringify(tracker));
  } else {
    var oldTracker = JSON.parse(moveStorage);
    let newTracker = {
      level: levelValue,
      move: oldTracker.move + 1,
    };
    localStorage.setItem(moveStorageName, JSON.stringify(newTracker));
  }
};

export const SetPushTrackersLocalStorage = (levelValue: number) => {
  const pushStorageName = 'Pushstorage' + levelValue;
  let pushStorage = localStorage.getItem(pushStorageName);
  if (!pushStorage || pushStorage == null) {
    const tracker = {
      level: levelValue,
      push: 1,
    };
    localStorage.setItem(pushStorageName, JSON.stringify(tracker));
  } else {
    var oldTracker = JSON.parse(pushStorage);
    let newTracker = {
      level: levelValue,
      push: oldTracker.push + 1,
    };
    localStorage.setItem(pushStorageName, JSON.stringify(newTracker));
  }
};

export const GetTimerLocalStorage = (level: number) => {
  const timerStorageName = 'Timerstorage' + level;
  const tracker = {
    level: level,
    millisec: 0,
  };
  localStorage.setItem(timerStorageName, JSON.stringify(tracker));
};

export const SetTimerLocalStorage = (levelValue: number) => {
  const timerStorageName = 'Timerstorage' + levelValue;
  let timerStorage = localStorage.getItem(timerStorageName)!;

  var oldTracker = JSON.parse(timerStorage);
  let newTracker = {
    level: levelValue,
    millisec: oldTracker.millisec + 1,
  };

  let afterWinning = localStorage.getItem('winningStorage');
  if (afterWinning == 'false') {
    localStorage.setItem(timerStorageName, JSON.stringify(newTracker));
  }
};

export const GetStarsStorage = (level: number) => {
  const starStorageName = 'Starstorage' + level;
  const tracker = {
    level: level,
    star: 0,
  };
  localStorage.setItem(starStorageName, JSON.stringify(tracker));
};

export const SetStarStorage = (levelValue: number, stars: number) => {
  const starStorageName = 'Starstorage' + levelValue;
  let starStorage = localStorage.getItem(starStorageName);
  if (!starStorage || starStorage == null) {
    const tracker = {
      level: levelValue,
      star: 0,
    };
    localStorage.setItem(starStorageName, JSON.stringify(tracker));
  } else {
    let newTracker = {
      level: levelValue,
      star: stars,
    };
    localStorage.setItem(starStorageName, JSON.stringify(newTracker));
  }
};

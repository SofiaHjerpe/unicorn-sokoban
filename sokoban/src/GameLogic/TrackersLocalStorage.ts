export const GetMoveTrackersLocalStorage = (level: number) => {
  const moveStorageName = 'Movestorage' + level;
  let moveStorage = localStorage.getItem(moveStorageName);
  if (!moveStorage || moveStorage == null) {
    const tracker = {
      level: level,
      move: 0,
    };
    localStorage.setItem(moveStorageName, JSON.stringify(tracker));
  }
};

export const GetPushTrackersLocalStorage = (level: number) => {
  const pushStorageName = 'Pushstorage' + level;
  let pushStorage = localStorage.getItem(pushStorageName);
  if (!pushStorage || pushStorage == null) {
    const tracker = {
      level: level,
      push: 0,
    };
    localStorage.setItem(pushStorageName, JSON.stringify(tracker));
  }
};

export const SetMoveTrackersLocalStorage = (levelValue: number) => {
  const moveStorageName = 'Movestorage' + levelValue;
  let moveStorage = localStorage.getItem(moveStorageName);
  if (!moveStorage || moveStorage == null) {
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

export const PushTrackersLocalStorage = (level: number) => {
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

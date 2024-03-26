export const MoveTrackersLocalStorage = (level: number) => {
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

import { ObjectType } from './Logics';

export const GameStatus = ([...data]) => {
  const targets = data.filter(cell => ObjectType.isTarget.some(value => cell.object.includes(value))).length;
  const players = data.filter(cell => ObjectType.isCharacter.some(value => cell.object.includes(value))).length;
  const boxes = data.filter(cell => ObjectType.isPortable.some(value => cell.object.includes(value))).length;

  const boxesOnTarget = data.filter(
    cell =>
      ObjectType.isTarget.some(value => cell.object.includes(value)) &&
      ObjectType.isPortable.some(value => cell.object.includes(value)),
  ).length;
  const lockedBoxes = data.filter(cell => cell.isLocked || cell.isOnTarget).length;

  const freeBoxes = boxes - lockedBoxes;
  const targetLeftToFill = targets - boxesOnTarget;
  const isGameUnsolveable = targetLeftToFill > freeBoxes;
  const isGameSolved = boxesOnTarget === targets;

  function returnLoserMessage() {
    if (isGameUnsolveable) {
      const audioElement = new Audio('/src/assets/over.wav');
      audioElement.play();
      return (
        <>
          <p id="gameStatus">GAME OVER - YOU ARE STUCK!</p>
        </>
      );
    }
  }

  return {
    targets,
    boxes,
    boxesOnTarget,
    players,
    lockedBoxes,
    freeBoxes,
    targetLeftToFill,
    isGameUnsolveable,
    isGameSolved,
    returnLoserMessage,
  };
};

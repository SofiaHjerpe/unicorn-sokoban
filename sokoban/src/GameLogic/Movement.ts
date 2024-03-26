import { ObjectType, validKeyboardKeys } from './Logics';

export const MoveLogic = (
  levelValue: any,
  e: any,
  go: any,
  world: any,
  d = validKeyboardKeys[e.keyCode],
) => {
  const self = go.cells.find((cell: any) =>
    cell.object.includes(ObjectType.isCharacter),
  );
  const player = [...self.object].find(item =>
    ObjectType.isCharacter.includes(item),
  );

  const direction = (distance: number) =>
    go.yx(self.y + d.y * distance, self.x + d.x * distance);

  // get what value that is direction(1).object and ObjectType.isPortable
  const portableObject = [...direction(1).object].find(item =>
    ObjectType.isPortable.includes(item),
  );

  portableObject &&
    direction(2).isFree &&
    (direction(2).object += portableObject) &&
    (direction(1).object = direction(1).object.replace(
      portableObject,
      player,
    )) &&
    (self.object = self.object.replace(player, ''));

  direction(1).isFree &&
    (go.yx(self.y + d.y, self.x + d.x).object += player) &&
    (self.object = self.object.replace(player, ''));

  world.map((row: any, y: number) => {
    row.map((_: string, x: number) => {
      row[x] = go.yx(y, x).object;
    });
  });

  //count and save player movement: all movement on all level
  /*   let playerMovementCountFromStorage: any = Number(
    localStorage.getItem('playerMovementStorage'),
  );
  if (direction(1).isFree || (portableObject && direction(2).isFree)) {
    localStorage.setItem(
      'playerMovementStorage',
      playerMovementCountFromStorage + 1,
    );
  } */

  if (direction(1).isFree || (portableObject && direction(2).isFree)) {
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
  }

  if (portableObject && direction(2).isFree) {
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
  }

  //count and save push movement on all level
  /*   let playerPushMovementCountFromStorage: any = Number(
    localStorage.getItem('playerPushMovementStorage'),
  );
  if (portableObject && direction(2).isFree) {
    localStorage.setItem(
      'playerPushMovementStorage',
      playerPushMovementCountFromStorage + 1,
    );
  } */

  return world;
};

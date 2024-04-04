import { ObjectType, validKeyboardKeys } from './Logics';
import { SetMoveTrackersLocalStorage, SetPushTrackersLocalStorage } from './TrackersLocalStorage';

export const MoveLogic = (levelValue: any, e: any, go: any, world: any, d = validKeyboardKeys[e.keyCode]) => {
  if (d === undefined) return;
  const self = go.cells.find((cell: any) => cell.object.includes(ObjectType.isCharacter));
  const player = [...self.object].find(item => ObjectType.isCharacter.includes(item));

  const direction = (distance: number) => go.yx(self.y + d.y * distance, self.x + d.x * distance);

  // get what value that is direction(1).object and ObjectType.isPortable
  const portableObject = [...direction(1).object].find(item => ObjectType.isPortable.includes(item));

  portableObject &&
    direction(2).isFree &&
    (direction(2).object += portableObject) &&
    (direction(1).object = direction(1).object.replace(portableObject, player)) &&
    (self.object = self.object.replace(player, ''));

  direction(1).isFree &&
    (go.yx(self.y + d.y, self.x + d.x).object += player) &&
    (self.object = self.object.replace(player, ''));

  world.map((row: any, y: number) => {
    row.map((_: string, x: number) => {
      row[x] = go.yx(y, x).object;
    });
  });

  //save player move and push into localStorage. SOUND
  if (direction(1).isFree) {
    SetMoveTrackersLocalStorage(levelValue);
    const audioElement = new Audio('/src/assets/move.wav');
    let isMutedMusic = localStorage.getItem('Muted');
    if (isMutedMusic == 'false') audioElement.play();
  }
  if (portableObject && direction(2).isFree) {
    SetPushTrackersLocalStorage(levelValue);
    const audioElement = new Audio('/src/assets/push.wav');
    let isMutedMusic = localStorage.getItem('Muted');
    if (isMutedMusic == 'false') audioElement.play();
  }

  if (portableObject && direction(2).isTarget) {
    const audioElement = new Audio('/src/assets/moveSound.wav');
    let isMutedMusic = localStorage.getItem('Muted');
    if (isMutedMusic == 'false') audioElement.play();
  }

  return { world, d };
};

export const ObjectType: Record<string, string[]> = {
  isStatic: ['w'], // Objects that are solid and can't be moved
  isPortable: ['b'], // Objects that can be moved
  isCharacter: ['p'], // The player
  isTarget: ['t'],

  get isFree(){
    return [...new Set([...this.isTarget, ''])]
  }
};

export const up = 'up';
export const down = 'down';
export const left = 'left';
export const right = 'right';

export const validKeyboardKeys: any = {
  38: { x: 0, y: -1 }, // Arrow keys UP
  40: { x: 0, y: 1 }, // Arrow keys DOWN
  37: { x: -1, y: 0 }, // Arrow keys LEFT
  39: { x: 1, y: 0 }, // Arrow keys RIGHT

  87: { x: 0, y: -1 }, // W-key
  83: { x: 0, y: 1 }, // S-key
  65: { x: -1, y: 0 }, // A-key
  68: { x: 1, y: 0 }, // D-key
};

export const playerSkin: any = {
  'farmerBack': { x: 0, y: -1 }, // Arrow keys UP
  'farmerFront': { x: 0, y: 1 }, // Arrow keys DOWN
  'farmerLeft': { x: -1, y: 0 }, // Arrow keys LEFT
  'farmerRight': { x: 1, y: 0 }, // Arrow keys RIGHT
};

export const ObjectType: Record<string, string[]> = {
  isStatic: ["w"],
  isPortable: ["b"],
  isFree: ["", "t"],
  isCharacter: ["p"],
};

export const up = "up";
export const down = "down";
export const left = "left";
export const right = "right";

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

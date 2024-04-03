import { ObjectType, up, down, right, left } from './Logics';

export const GameLogic = (board: [...any], cells: [...any] = []) => {
  const CELL = (y: number, x: number) => {
    let cellType = cells[cells.find(cell => cell.y == y && cell.x == x).id];
    for (const key in ObjectType) {
      cellType[key] = ObjectType[key].some(value => cellType.object.includes(value));
    }
    if (cellType.isStatic || cellType.isPortable) cellType.isFree = false;
    if (cellType.isPortable && cellType.isTarget) cellType.isOnTarget = true;
    return cellType;
  };

  board.map((row, y: number) =>
    row.map((object: string, x: number) => {
      cells.push({ id: cells.length, y, x, object });
      CELL(y, x);
    }),
  );

  const GO = (direction: string, self: any, distance: number = 1) => {
    if (self.y > 0 && direction == up) {
      return CELL(self.y - distance, self.x);
    } else if (self.y < board.length - 1 && direction == down) {
      return CELL(self.y + distance, self.x);
    } else if (self.x > 0 && direction == left) {
      return CELL(self.y, self.x - distance);
    } else if (self.x < board[0].length - 1 && direction == right) {
      return CELL(self.y, self.x + distance);
    }
  };

  // Check if cells around cell is walkable
  cells.map(cell => {
    if (cell.isPortable) {
      cell.canPushUp = !GO(up, cell)?.isStatic && !GO(up, cell)?.isPortable;
      cell.canPushDown = !GO(down, cell)?.isStatic && !GO(down, cell)?.isPortable;
      cell.canPushLeft = !GO(left, cell)?.isStatic && !GO(left, cell)?.isPortable;
      cell.canPushRight = !GO(right, cell)?.isStatic && !GO(right, cell)?.isPortable;

      cell.yStuck = GO(up, cell)?.isStatic || GO(down, cell)?.isStatic;
      cell.xStuck = GO(left, cell)?.isStatic || GO(right, cell)?.isStatic;

      cell.staticUp = GO(up, cell)?.isStatic;
      cell.staticDown = GO(down, cell)?.isStatic;
      cell.staticLeft = GO(left, cell)?.isStatic;
      cell.staticRight = GO(right, cell)?.isStatic;
    }
  });

  // Initialize yStuck and xStuck before using them
  cells.map(cell => {
    if (cell.isPortable) {
      cell.isLocked =
        (cell.yStuck && cell.xStuck) ||
        (cell.yStuck && (GO(left, cell).yStuck || GO(right, cell).yStuck)) ||
        (cell.xStuck && (GO(up, cell).xStuck || GO(down, cell).xStuck));
    }
  });

  cells.map(cell => {
    if (cell.isPortable) {
      cell.yLocked = GO(up, cell)?.isLocked || GO(down, cell)?.isLocked;
      cell.xLocked = GO(left, cell)?.isLocked || GO(right, cell)?.isLocked;
    }
  });

  cells.map(cell => {
    if (cell.isPortable) {
      cell.isLocked =
        ((cell.yStuck || cell.yLocked) && (cell.xStuck || cell.xLocked)) ||
        (cell.yStuck && (GO(left, cell).yStuck || GO(right, cell).yStuck)) ||
        (cell.xStuck && (GO(up, cell).xStuck || GO(down, cell).xStuck));
    }
  });

  cells.map(cell => {
    cell.up = GO(up, cell);
    cell.down = GO(down, cell);
    cell.left = GO(left, cell);
    cell.right = GO(right, cell);
  });

  function yx(y: number, x: number) {
    return cells.find(cell => cell.y == y && cell.x == x);
  }

  return { cells, yx };
};

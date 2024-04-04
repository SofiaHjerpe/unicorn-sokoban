
export const getClientSize = (screenX: number, screenY: number, board: any, y = board.length, x = board[0].length) => {
  const cellHeight = screenY / y,
    cellWidth = screenX / x;
  const size = Math.min(cellHeight, cellWidth);

  return {
    gridTemplateColumns: `repeat(${x}, ${size}px)`,
    gridTemplateRows: `repeat(${y}, ${size}px)`,
    width: `${size * x}px`,
    height: `${size * y}px`,
    backgroundSize: `${size}px`,
  };
};

export const getWallBorders = (y: number, x: number, e: any, w: any, returnData: {} = {}) => {
  const borderType = '4px ridge #222';

  if (e.yx(y, x).isStatic && !e.yx(y, x).up?.isStatic) {
    returnData = { ...returnData, borderTop: borderType };
  }
  if (e.yx(y, x).isStatic && !e.yx(y, x).down?.isStatic) {
    returnData = { ...returnData, borderBottom: borderType };
  }
  if (e.yx(y, x).isStatic && !e.yx(y, x).left?.isStatic) {
    returnData = { ...returnData, borderLeft: borderType };
  }
  if (e.yx(y, x).isStatic && !e.yx(y, x).right?.isStatic) {
    returnData = { ...returnData, borderRight: borderType };
  }

  const _y = w.length - 1;
  const _x = w[0].length - 1;
  const backgroundColor = '#307DA4';

  if (e.yx(y, x).isFree) {
    while (e.yx(y, x).isFree) {
      if (e.yx(y, x).up?.isStatic) {
        break;
      }
      if (y <= 0) {
        return { ...returnData, backgroundColor: backgroundColor };
      }
      y -= 1;
    }
    while (e.yx(y, x).isFree) {
      if (e.yx(y, x).down?.isStatic) {
        break;
      }
      if (y >= _y) {
        return { ...returnData, backgroundColor: backgroundColor };
      }
      y += 1;
    }
    while (e.yx(y, x).isFree) {
      if (e.yx(y, x).left?.isStatic) {
        break;
      }
      if (x <= 0) {
        return { ...returnData, backgroundColor: backgroundColor };
      }
      x -= 1;
    }
    while (e.yx(y, x).isFree) {
      if (e.yx(y, x).right?.isStatic) {
        break;
      }
      if (x >= _x) {
        return { ...returnData, backgroundColor: backgroundColor };
      }
      x += 1;
    }
  }

  return returnData;
};

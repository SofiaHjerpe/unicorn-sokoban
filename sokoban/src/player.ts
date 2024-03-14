export function handleBoard(e: any, newGameBoard: any, player: any, x: any, y: any, target: any) {
  let copy = [...newGameBoard];
  let newX = x;
  let newY = y;

  switch (e.key) {
    case "ArrowUp":
      newX = x - 1;
      break;
    case "ArrowDown":
      newX = x + 1;
      break;
    case "ArrowLeft":
      newY = y - 1;
      break;
    case "ArrowRight":
      newY = y + 1;
      break;
    default:
      return newGameBoard;
  }

  if (newX >= 0 && newX < copy.length && newY >= 0 && newY < copy[0].length && copy[newX][newY] !== "w") {
    //player old place
    copy[x][y] = copy[x][y] === target + player ? target : "";
    //player new place
    copy[newX][newY] = copy[newX][newY] === target ? target + player : player;
  }

  return copy;
}

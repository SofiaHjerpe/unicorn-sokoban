export function handleBoard(e: any, newGameBoard: any, player: any, x: any, y: any, target: any) {
  let newX = x;
  let newY = y;

  switch (e.key) {
    case "ArrowUp":
      newY = y - 1;
      break;
    case "ArrowDown":
      newY = y + 1;
      break;
    case "ArrowLeft":
      newX = x - 1;
      break;
    case "ArrowRight":
      newX = x + 1;
      break;
    default:
      return newGameBoard;
  }

  let copy = [...newGameBoard];
  if (copy[newY][newX] !== "w") {
    //player old place
    copy[y][x] = copy[y][x] === target + player ? target : "";
    //player new place
    copy[newY][newX] = copy[newY][newX] === target ? target + player : player;
  }

  return copy;
}

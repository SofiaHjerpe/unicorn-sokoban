export function handleBoard(e: any, newGameBoard: any, player: any, x: any, y: any, target: any) {
  if (e.key === "ArrowUp" && newGameBoard[x - 1][y] !== "w") {
    //get recent game board:
    let copy = [...newGameBoard];
    //player's old place: change back from player to target or empty
    copy[x][y] = copy[x][y] == player ? "" : target;
    //player's new place: if there is a target, keep target but show player
    copy[x - 1][y] = copy[x - 1][y] == target ? copy[x - 1][y] + player : player;
    //set new game board
    return copy;
  } else if (e.key === "ArrowDown" && newGameBoard[x + 1][y] !== "w") {
    let copy = [...newGameBoard];
    copy[x][y] = copy[x][y] == player ? "" : target;
    copy[x + 1][y] = copy[x + 1][y] == target ? copy[x + 1][y] + player : player;
    return copy;
  } else if (e.key === "ArrowLeft" && newGameBoard[x][y - 1] !== "w") {
    let copy = [...newGameBoard];
    copy[x][y] = copy[x][y] == player ? "" : target;
    copy[x][y - 1] = copy[x][y - 1] == target ? copy[x][y - 1] + player : player;
    return copy;
  } else if (e.key === "ArrowRight" && newGameBoard[x][y + 1] !== "w") {
    let copy = [...newGameBoard];
    copy[x][y] = copy[x][y] == player ? "" : target;
    copy[x][y + 1] = copy[x][y + 1] == target ? copy[x][y + 1] + player : player;
    return copy;
  } else return newGameBoard;
}

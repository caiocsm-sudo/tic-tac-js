/* 
  TODO: Game logic understanding
*/

// selectors
const gameBoard = document.querySelectorAll(".game-cell");
const playerSymbol = document.querySelector("#player-symbol");
const button = document.querySelectorAll(".btn");
const modalWindow = document.querySelector("#md");
const gameOver = document.querySelector("#game-over");

const boardArray = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const oneDimensionBoard = new Array(9).fill("");
const player = ["X", "O"];

let winCounter = 0;
let result = undefined;
let turn = 1;

const setPlayerTurn = () => {
  turn = turn === 1 ? 0 : 1;
  playerSymbol.textContent = player[turn];
};

const checkPlayerWin = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      oneDimensionBoard[a] &&
      oneDimensionBoard[a] === oneDimensionBoard[b] &&
      oneDimensionBoard[a] === oneDimensionBoard[c]
    ) {
      // Someone has won
      return oneDimensionBoard[a];
    }
  }

  if (oneDimensionBoard.every((cell) => cell !== "")) {
    // It's a draw
    return "Draw";
  }

  // If no winner or draw, return undefined
  return undefined;
};

const playAgain = () => {
  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i].classList.remove("clicked");
    gameBoard[i].innerText = "";
  }

  for (let i = 0; i < oneDimensionBoard.length; i++) {
    oneDimensionBoard[i] = "";
  }

  winCounter = 0;
  result = undefined;
  turn = 0;
};

const openModalWindow = (result) => {
  modalWindow.classList.remove("hidden");

  /*
    * Pegadinha que eu botei pra quem fica apertando não no play again
  */

  winCounter = ++winCounter;
  if (winCounter >= 2) {
    if (winCounter == 4) {
      gameOver.textContent = "Vou reiniciar fds 😠";
      setTimeout(() => {
        playAgain();
        modalWindow.classList.add("hidden");
      }, 2000);
      return;
    }
    gameOver.textContent = "Aperta pra jogar dnv porra 🖕";
    return;
  }

  if (result === "Draw") {
    gameOver.textContent = `It's a ${result}! 😒`;
  }
  gameOver.textContent = `Player ${result} won! 🙌😎`;
};

const clickEventHandler = () => {
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      if (e.target.classList.contains("clicked")) return;
      const t = e.target;

      // using JavaScript bleeding edge features for creating multiple variables with an array;
      const [col, row] = [
        t.parentNode.dataset.col - 1,
        t.parentNode.dataset.row - 1,
      ];

      t.parentNode.dataset.symbol = player[turn];
      t.innerHTML = player[turn];
      t.classList.add("clicked");

      // boardArray[col][row] = player[turn];

      // times 3, which is the number of columns
      const index = col + row * 3;
      oneDimensionBoard[index] = player[turn];

      result = checkPlayerWin();

      if (typeof result !== "undefined") {
        openModalWindow(result);
      }

      // console.table(boardArray);

      setPlayerTurn();
    }

    if (e.target.classList.contains("no")) {
      modalWindow.classList.add("hidden");
    }

    if (e.target.classList.contains("yes")) {
      modalWindow.classList.add("hidden");
      playAgain();
    }
  });
};

const gameLogic = () => {
  setPlayerTurn(); // this set the turn to 0, that's why player start on 1.
  clickEventHandler();
};

gameLogic();

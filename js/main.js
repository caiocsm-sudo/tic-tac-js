/* 
  next time i'll do it in TypeScript and, maybe, with React too...
*/

/* 
  TODO: Game winning logic, modal window, character styling and player colours too;
  TODO: Refactor the code later

  IDEAS: Creating a game class and put all methods inside it
*/

// selectors
const gameBoard = document.querySelectorAll(".game-cell");
const playerSymbol = document.querySelector("#player-symbol");
const button = document.querySelectorAll(".btn");

const player = ["X", "O"];

const boardArray = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let turn = 1;

const setPlayerTurn = () => {
  if (turn === 0) {
    turn = 1;
    playerSymbol.textContent = player[turn];
  } else {
    turn = 0;
    playerSymbol.textContent = player[turn];
  }
};

const checkPlayerWin = () => {
  const boardWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const i of boardWin) {
    const [a, b, c] = i;

    console.log(a, b, c);
  }
};

const playAgain = () => {
  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i].classList.remove("clicked");
    gameBoard[i].innerText = "";
  }

  for (let i = 0; i < boardArray.length; i++) {
    for (let j = 0; j < boardArray.length; j++) {
      boardArray[i][j] = "";
    }
  }

  turn = 0;
  console.log(boardArray);
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

      boardArray[col][row] = player[turn];

      console.table(boardArray);

      setPlayerTurn();
    }
    if (e.target.classList.contains("yes")) {
      playAgain();
    }
  });
};

const gameLogic = () => {
  setPlayerTurn(); // this set the turn to 0, that's why player start on 1.
  clickEventHandler();
  checkPlayerWin();
  // console.log(boardArray);
};

gameLogic();

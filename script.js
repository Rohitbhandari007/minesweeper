let gameContainer = document.querySelector(".game-container");
let gameArea = document.querySelector(".game-area");
let gameOverDiv = document.querySelector(".game-over");
let scoreDiv = document.querySelector(".score-board");
let gridSize = 150;

function generateRandomArray(ArrayLength) {
  const randomArray = [];
  const min = 1;
  const max = gridSize;

  while (randomArray.length < ArrayLength) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    if (!randomArray.includes(randomNumber)) {
      randomArray.push(randomNumber);
    }
  }

  return randomArray;
}
let blockedPathArray = generateRandomArray(20);

function genrateMinesArray(ArrayLength) {
  const randomArray = [];
  const min = 1;
  const max = gridSize;

  while (randomArray.length < ArrayLength) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    if (
      !randomArray.includes(randomNumber) &&
      !randomArray.includes(blockedPathArray)
    ) {
      randomArray.push(randomNumber);
    }
  }

  return randomArray;
}

let minesArray = genrateMinesArray(20);
let path = [];
let gameOverBool = false;
let gameStatus = "running";
let score = 0;

scoreDiv.innerHTML = "Score: " + score;

const gameOver = () => {
  gameOverBool = true;
  gameOverDiv.style.transition = "0.2s ease";

  gameOverDiv.style.opacity = "1";
  gameStatus = "stop";
  console.log(gameStatus, "--inside game over function");
};
const calculateMines = (cellId) => {
  let cell = document.getElementById(cellId);

  let totalThreats = 0;
  let n = cellId;

  let leftSide = parseInt(n) - 1;
  let rightSide = parseInt(n) + 1;
  let topLeft = parseInt(n) - 16;
  let topMiddle = parseInt(n) - 15;
  let topRight = parseInt(n) - 14;
  let bottomLeft = parseInt(n) + 14;
  let bottomMiddle = parseInt(n) + 15;
  let bottomRight = parseInt(n) + 16;

  let threatsAroundCell = [
    leftSide,
    rightSide,
    topLeft,
    topMiddle,
    topRight,
    bottomLeft,
    bottomMiddle,
    bottomRight,
  ];
  console.log(threatsAroundCell);
  minesArray.forEach((item) => {
    if (threatsAroundCell.includes(item)) {
      totalThreats++;
      cell.innerHTML = totalThreats;
    } else {
      cell.innerHTML = totalThreats;
    }
  });
};
const selectPath = (cell) => {
  cell.addEventListener("click", () => {
    if (
      blockedPathArray.includes(parseInt(cell.id)) === false &&
      minesArray.includes(parseInt(cell.id)) === false &&
      gameStatus === "running"
    ) {
      cell.style.background = "rgb(70, 157, 85)";
      cell.style.borderColor = "rgb(70, 157, 85)";
      if (path.includes(cell.id)) {
        console.log("hi");
      } else {
        calculateMines(cell.id);
        path.push(cell.id);
        score++;
        scoreDiv.innerHTML = "Score: " + score;
      }
    }
    if (
      minesArray.includes(parseInt(cell.id)) === true &&
      gameStatus === "running"
    ) {
      cell.style.background = "rgb(210, 136, 136)";
      gameOver();
    }
  });
};

const createBlockedPath = (cellArray) => {
  cellArray.forEach((item) => {
    let cell = document.getElementById(item);

    cell.style.background = "#333";
    cell.style.cursor = "default";
  });
};

const createMinesc = (cellArray) => {
  cellArray.forEach((item) => {
    let cell = document.getElementById(item);

    // cell.style.background = "red";
  });
};
const createGrid = () => {
  for (let i = 1; i <= gridSize; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.id = i;
    // cell.innerHTML = cell.id;
    console.log(gameStatus);

    selectPath(cell);

    gameArea.appendChild(cell);
  }
};

const startGame = () => {
  createGrid();
  createBlockedPath(blockedPathArray);
  createMinesc(minesArray);
  document.querySelector(".start-game-btn").style.display = "none";
  document.querySelector(".restart-game-btn").style.display = "flex";

  document.querySelector(".score-board").style.opacity = "1";
};

const restartGame = () => {
  window.parent.location = window.parent.location.href;
  // startGame();
};

let gameContainer = document.querySelector(".game-container");
let gameArea = document.querySelector(".game-area");
let gameOverDiv = document.querySelector(".game-over");
let scoreDiv = document.querySelector(".score-board");
let gridSize = 150;
console.log(gameArea);

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

let minesArray = genrateMinesArray(10);
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

const selectPath = (status, cell) => {
  cell.addEventListener("click", () => {
    console.log(gameStatus);
    if (
      blockedPathArray.includes(parseInt(cell.id)) === false &&
      minesArray.includes(parseInt(cell.id)) === false &&
      gameStatus === "running"
    ) {
      console.log(cell.id);
      cell.style.background = "rgb(70, 157, 85)";
      cell.style.borderColor = "rgb(70, 157, 85)";
      path.push(cell.id);
      score++;
      scoreDiv.innerHTML = "Score: " + score;
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

    cell.style.background = "gray";
    cell.style.cursor = "default";
  });
};

const createMinesc = (cellArray) => {
  cellArray.forEach((item) => {
    let cell = document.getElementById(item);

    cell.style.background = "none";
  });
};
const createGrid = () => {
  for (let i = 1; i <= gridSize; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.id = i;
    console.log(gameStatus);

    selectPath(gameStatus, cell);

    gameArea.appendChild(cell);
  }
};
createGrid();
createBlockedPath(blockedPathArray);
createMinesc(minesArray);

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

let foodX = 130;
let foodY = 70;

let dx = 10;
let dy = 0;
let score = 0;
let gameRunning = true;

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.strokeRect(0, 0, 300, 300);

function drawSnakePart(part) {
  ctx.fillStyle = "lightgreen";
  ctx.strokeStyle = "darkgreen";
  ctx.fillRect(part.x, part.y, 10, 10);
  ctx.strokeRect(part.x, part.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function changeDirection(event) {
  const LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;
  const key = event.keyCode;
  const goingUp = dy === -10,
    goingDown = dy === 10;
  const goingLeft = dx === -10,
    goingRight = dx === 10;

  if (key === LEFT && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (key === UP && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (key === RIGHT && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (key === DOWN && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function advanceSnake() {
  // Mouving head
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Eat food
  if (head.x === foodX && head.y === foodY) {
    increaseScore();
    randFood();
  } else {
    snake.pop();
  }

  // Wall collision
  if (head.x < 0 || head.x >= 300 || head.y < 0 || head.y >= 300) {
    quitGame();
  }

  // Body collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      quitGame();
      break;
    }
  }
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, 300, 300);
  ctx.strokeRect(0, 0, 300, 300);
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "darkred";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

function increaseScore() {
  score++;
  document.getElementById("score").innerText = `Score : ${score}`;
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function randFood() {
  foodX = randomTen(0, gameCanvas.width - 10);
  foodY = randomTen(0, gameCanvas.height - 10);
}

function main() {
  if (!gameRunning) return;
  setTimeout(() => {
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    main();
  }, 100);
}

function quitGame() {
  gameRunning = false;
  const popup = document.getElementById("gameOverPopup");
  popup.style.display = "block";
  document.getElementById("retryBtn").onclick = () => {
    popup.style.display = "none";
    resetGame();
    main();
  };
}

function resetGame() {
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ];
  dx = 10;
  dy = 0;
  score = 0;
  document.getElementById("score").innerText = `Score : ${score}`;
  randFood();
  gameRunning = true;
}

main();
document.addEventListener("keydown", changeDirection);

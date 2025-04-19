const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

// Border
ctx.strockeStyle = "black";
ctx.lineWidth = 2;
ctx.strokeRect(0, 0, 300, 300);
ctx.stroke();

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

function drawSnakePart(snakePart) {
  ctx.fillStyle = "lightgreen";
  ctx.strokestyle = "darkgreen";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

const dx = 10;
const dy = 10;
function snakeGoRight() {
  const head = { x: snake[0].x + dx, y: snake[0].y };
  snake.unshift(head);
  snake.pop();
  //Recurcive call
  //Base case (change direction)
  //0.3 sec from each call
}

function snakeGoLeft() {
  const head = { x: snake[0].x - dx, y: snake[0].y };
  snake.unshift(head);
  snake.pop();
  //Recurcive call
  //Base case (change direction)
  //0.3 sec from each call
}

function snakeGoUp() {
  const head = { x: snake[0].x, y: snake[0].y - dy };
  snake.unshift(head);
  snake.pop();
  //Recurcive call
  //Base case (change direction)
  //0.3 sec from each call
}

function snakeGoDown() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
  //Recurcive call
  //Base case (change direction)
  //0.3 sec from each call
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

setTimeout(function onTick() {
  clearCanvas();
  snakeGoRight();
  drawSnake();
}, 1000);

drawSnake();

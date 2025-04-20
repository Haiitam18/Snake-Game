const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

let foodX = 0;
let foodY = 0;

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

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

let dx = 10;
let dy = 0;
function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    drawFood();
  } else {
    snake.pop();
  }
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function main() {
  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    main();
    document.addEventListener("keydown", changeDirection);
  }, 100);
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function randFood() {
  foodX = randomTen(0, gameCanvas.width - 10);
  foodY = randomTen(0, gameCanvas.height - 10);
}

function drawFood() {
  randFood();
  ctx.fillStyle = "red";
  ctx.strokestyle = "darkred";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

snake.forEach(function isFoodOnSnake(part) {
  const foodIsOnSnake = part.x == foodX && part.y == foodY;
  if (foodIsOnSnake) {
    createFood();
  }
});

main();

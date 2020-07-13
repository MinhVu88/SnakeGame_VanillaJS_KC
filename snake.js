import { getDirection } from "./input.js";

export const snakeSpeed = 5;

const snake = [{ x: 11, y: 11 }];

let newSegments = 0;

export function snakeGrows(amount) {
  newSegments += amount;
}

export function snakeEats(foodPosition, { ignoreHead = false } = {}) {
  return snake.some((snakeSegment, index) => {
    if (ignoreHead && index === 0) return false;

    return equalPositions(snakeSegment, foodPosition);
  });
}

function equalPositions(position1, position2) {
  return position1.x === position2.x && position1.y === position2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snake.push({ ...snake[snake.length - 1] });
  }

  newSegments = 0;
}

export function getSnakeHead() {
  return snake[0];
}

export function snakeTouchesItself() {
  return snakeEats(snake[0], { ignoreHead: true });
}

export function update() {
  console.log("update snake");

  addSegments();

  const direction = getDirection();

  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }

  snake[0].x += direction.x;

  snake[0].y += direction.y;
}

export function draw(gameBoard) {
  console.log("draw snake");

  snake.forEach(segment => {
    const snakeElement = document.createElement("div");

    snakeElement.style.gridRowStart = segment.y;

    snakeElement.style.gridColumnStart = segment.x;

    snakeElement.classList.add("snake");

    gameBoard.appendChild(snakeElement);
  });
}

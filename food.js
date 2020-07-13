import { snakeEats, snakeGrows } from "./snake.js";
import { getRandomGridPosition } from "./grid.js";

let food = getRandomPosition();

const snakeGrowthRate = 1;

export function update() {
  if (snakeEats(food)) {
    snakeGrows(snakeGrowthRate);

    food = getRandomPosition();
  }
}

export function draw(gameBoard) {
  console.log("draw food");

  const foodElement = document.createElement("div");

  foodElement.style.gridRowStart = food.y;

  foodElement.style.gridColumnStart = food.x;

  foodElement.classList.add("food");

  gameBoard.appendChild(foodElement);
}

function getRandomPosition() {
  let newPosition;

  while (newPosition == null || snakeEats(newPosition)) {
    newPosition = getRandomGridPosition();
  }

  return newPosition;
}

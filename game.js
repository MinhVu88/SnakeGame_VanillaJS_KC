import { snakeSpeed, update as updateSnake, draw as drawSnake, getSnakeHead, snakeTouchesItself } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { isOutsideGameBoard } from "./grid.js";

let lastRenderTime = 0,
  gameOver = false;

const gameBoard = document.querySelector("#game-board");

function game(currentTime) {
  if (gameOver) {
    if (confirm("You lost. Press ok to restart.")) {
      window.location = "/";
    }

    return;
  }

  window.requestAnimationFrame(game);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  lastRenderTime = currentTime;

  update();

  draw();
}

window.requestAnimationFrame(game);

function update() {
  updateSnake();

  updateFood();

  updateGameStatus();
}

function draw() {
  gameBoard.innerHTML = "";

  drawSnake(gameBoard);

  drawFood(gameBoard);
}

function updateGameStatus() {
  gameOver = isOutsideGameBoard(getSnakeHead()) || snakeTouchesItself();
}

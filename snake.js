import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;

let snakeBody = [{ x: 11, y: 11 }];

let newSegments = 0;

export function update() {
  const inputDirection = getInputDirection();

  addSegments();

  snakeBody = snakeBody.reduce((pv, el, index, arr) => {
    if (index === 0) {
      pv.push({ x: el.x + inputDirection.x, y: el.y + inputDirection.y });
    } else {
      pv.push(arr[index - 1]);
    }
    return pv;
  }, []);

}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position) {
  return snakeBody.some((el) => {
    return equalPositions(el, position);
  });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection(){

    return snakeBody.slice(1).some(x => equalPositions(x,snakeBody[0]));

}

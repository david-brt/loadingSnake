import { INITIAL_LENGTH } from './game.js';
import { getInputdirection } from './input.js';
import { middleGridPosition, equalPositions } from './grid.js';

export const SNAKE_SPEED = 20;
export let snakeBody;
const shapesUrl = chrome.runtime.getURL('/skins/shapes.json');
let shapeSvg = await chrome.storage.local.get('shape').then((shape) => {
  return getShape(shape.shape);
});
let gridCenter = middleGridPosition();
let newSegments = 0;
export let skin = (await chrome.storage.local.get('color')).color;

chrome.runtime.onMessage.addListener((msg) => {
  let color = msg.color;
  let shape = msg.shape;
  if (color) {
    skin = color;
    chrome.storage.local.set({ color: color });
  } else if (shape) {
    getShape(shape).then((shape) => {
      shapeSvg = shape;
    });
    console.log(getShape(shape));
    chrome.storage.local.set({ shape: shape });
  }
});

export function update() {
  addSegments();
  const inputDirection = getInputdirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  for (let i = 0; i < snakeBody.length; i++) {
    if (
      i > INITIAL_LENGTH &&
      snakeBody[i].x === snakeBody[i - 1].x &&
      snakeBody[i].y === snakeBody[i - 1].y
    ) {
      break;
    } else {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridColumnStart = snakeBody[i].x;
      snakeElement.style.gridRowStart = snakeBody[i].y;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.viewBox.baseVal.width = 8;
      svg.viewBox.baseVal.height = 8;
      svg.innerHTML = shapeSvg;
      svg.style.fill = skin;
      snakeElement.classList.add('snake');
      snakeElement.appendChild(svg);
      gameBoard.appendChild(snakeElement);
      if (i < 12) {
        snakeElement.style.opacity = (100 - i * 7) / 100;
      }
    }
  }
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  if (snakeBody !== []) {
    return snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return equalPositions(segment, position);
    });
  }
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeCollision() {
  return onSnake(getSnakeHead(), { ignoreHead: true });
}

export function reset() {
  snakeBody = [snakeStartingPoint()];
}

async function getShape(shape) {
  let shapes = await fetch(shapesUrl);
  shapes = await shapes.json();
  console.log(shapes[shape]);
  return shapes[shape];
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
}

export function snakeStartingPoint() {
  gridCenter = middleGridPosition();
  switch (true) {
    case equalPositions(getInputdirection(), { x: -1, y: 0 }): //left arrow
      return { x: gridCenter.x - 1, y: gridCenter.y + 2 };
    case equalPositions(getInputdirection(), { x: 0, y: -1 }): //top arrow
      return { x: gridCenter.x - 1, y: gridCenter.y - 2 };
    case equalPositions(getInputdirection(), { x: 1, y: 0 }): //right arrow
      return { x: gridCenter.x + 2, y: gridCenter.y - 1 };
    case equalPositions(getInputdirection(), { x: 0, y: 1 }): //down arrow
      return { x: gridCenter.x + 2, y: gridCenter.y + 1 };
  }
}

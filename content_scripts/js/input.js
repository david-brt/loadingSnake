import { gameOver, newGame } from './game.js';
import { isLoading } from './animation.js';

let inputDirection = { x: 0, y: 0 };
let lastInputDirection;

document.addEventListener(
  'keydown',
  (e) => {
    let arrowKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
    if (!arrowKeys.includes(e.key)) return;
    if (!document.activeElement.id === 'movie_player') return;

    switch (e.key) {
      case 'ArrowLeft':
        if (lastInputDirection.x === 0) {
          inputDirection = { x: -1, y: 0 };
        }
        break;
      case 'ArrowUp':
        if (lastInputDirection.y === 0) {
          inputDirection = { x: 0, y: -1 };
        }
        break;
      case 'ArrowRight':
        if (lastInputDirection.x === 0) {
          inputDirection = { x: 1, y: 0 };
        }
        break;
      case 'ArrowDown':
        if (lastInputDirection.y === 0) {
          inputDirection = { x: 0, y: 1 };
        }
        break;
    }

    if (!gameOver || isLoading || e.shiftKey) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (gameOver && (isLoading || e.shiftKey)) {
      newGame();
    }
  },
  true
);

export function getInputdirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}

export function setInputDirection(newDirection) {
  inputDirection = newDirection;
}

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const GRID_SIZE = 20;

export const Direction = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];

interface Position {
  x: number;
  y: number;
}

const getHighestScore = () => {
  const storedScore = localStorage.getItem("snakeHighestScore");
  return storedScore ? parseInt(storedScore, 10) : 0;
};

interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  speed: number;
  paused: boolean;
  over: boolean;
  highestScore: number;
}

const initialState: GameState = {
  snake: [{ x: 10, y: 10 }],
  food: { x: 5, y: 5 },
  direction: Direction.RIGHT,
  score: 0,
  speed: 5,
  paused: false,
  over: false,
  highestScore: getHighestScore(),
};

function nextPosition(pos: Position, dir: Direction): Position {
  let { x, y } = pos;
  switch (dir) {
    case Direction.UP:
      x--;
      break;
    case Direction.DOWN:
      x++;
      break;
    case Direction.LEFT:
      y--;
      break;
    case Direction.RIGHT:
      y++;
      break;
  }
  return {
    x: ((x + GRID_SIZE - 1) % GRID_SIZE) + 1,
    y: ((y + GRID_SIZE - 1) % GRID_SIZE) + 1,
  };
}

function randomPosition(snake: Position[]): Position {
  let pos = null;
  while (pos === null || onSnake(snake, pos)) {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE) + 1,
      y: Math.floor(Math.random() * GRID_SIZE) + 1,
    };
  }
  return pos;
}

function onSnake(snake: Position[], pos: Position, skipHead = false): boolean {
  if (!pos) return false;
  return snake.some((segment, i) => {
    if (skipHead && i === 0) return false; // Skip the head if specified
    return segment.x === pos.x && segment.y === pos.y;
  });
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveSnake(state) {
      const newHead = nextPosition(state.snake[0], state.direction);
      state.snake.unshift(newHead);
      state.snake.pop();
    },
    setDirection(state, action: PayloadAction<Direction>) {
      state.direction = action.payload;
    },
    eatFood(state) {
      if (
        state.snake[0].x === state.food.x &&
        state.snake[0].y === state.food.y
      ) {
        state.snake.push({ ...state.snake[state.snake.length - 1] });
        state.food = randomPosition(state.snake);
        state.score += 10;
        if (state.score % 50 === 0) {
          state.speed += 1;
        }
        if (state.score > state.highestScore) {
          state.highestScore = state.score;
          localStorage.setItem("snakeHighestScore", state.score.toString());
        }
      }
    },
    checkCollision(state) {
      const head = state.snake[0];
      if (onSnake(state.snake, head, true)) {
        state.over = true;
        state.paused = true;
      }
    },
    togglePause(state) {
      state.paused = !state.paused;
    },
    resetGame() {
      return { ...initialState, highestScore: getHighestScore() };
    },
  },
});

export const {
  moveSnake,
  setDirection,
  eatFood,
  checkCollision,
  togglePause,
  resetGame,
} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;
export default gameSlice.reducer;

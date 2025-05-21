import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moveSnake,
  checkCollision,
  eatFood,
  togglePause,
  Direction,
  setDirection,
  selectGame,
  resetGame,
} from "@/store/gameSlice";

const isValidDirectionChange = (
  currentDirection: Direction,
  newDirection: string
): boolean => {
  if (currentDirection === null) return true;
  if (
    (currentDirection === Direction.DOWN && newDirection === "ArrowUp") ||
    (currentDirection === Direction.UP && newDirection === "ArrowDown") ||
    (currentDirection === Direction.RIGHT && newDirection === "ArrowLeft") ||
    (currentDirection === Direction.LEFT && newDirection === "ArrowRight")
  ) {
    return false;
  }
  return true;
};

export function useGameEngine() {
  const dispatch = useDispatch();
  const game = useSelector(selectGame);
  const intervalRef = useRef<number | null>(null);
  const directionQueue = useRef<Direction[]>([]);

  const reset = useCallback(() => {
    dispatch(resetGame());
    directionQueue.current = [];
  }, [dispatch]);

  const toggleGame = useCallback(() => {
    dispatch(togglePause());
  }, [dispatch]);

  const setNewDirection = useCallback(
    (newDirection: string) => {
      // Get the last direction in the queue or current direction
      const lastDirection =
        directionQueue.current.length > 0
          ? directionQueue.current[directionQueue.current.length - 1]
          : game.direction;

      if (isValidDirectionChange(lastDirection, newDirection)) {
        switch (newDirection) {
          case "ArrowUp":
            directionQueue.current.push(Direction.UP);
            break;
          case "ArrowDown":
            directionQueue.current.push(Direction.DOWN);
            break;
          case "ArrowLeft":
            directionQueue.current.push(Direction.LEFT);
            break;
          case "ArrowRight":
            directionQueue.current.push(Direction.RIGHT);
            break;
          case " ":
            dispatch(togglePause());
            break;
          case "r":
          case "R":
            dispatch(resetGame());
            directionQueue.current = [];
            break;
        }
      }
    },
    [dispatch, game.direction]
  );

  // Game loop
  useEffect(() => {
    if (game.paused || game.over) return;

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      // Apply the next direction in the queue if available
      if (directionQueue.current.length > 0) {
        dispatch(setDirection(directionQueue.current.shift()!));
      }
      dispatch(moveSnake());
      dispatch(checkCollision());
      dispatch(eatFood());
    }, 1000 / game.speed);
    return () => clearInterval(intervalRef.current!);
  }, [game.paused, game.over, game.speed, dispatch]);

  // Keyboard Controls
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const handledKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        " ",
        "r",
        "R",
      ];
      if (handledKeys.includes(e.key)) {
        setNewDirection(e.key);
        e.preventDefault();
      }
    },
    [setNewDirection]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return {
    reset,
    toggleGame,
    setNewDirection,
  };
}

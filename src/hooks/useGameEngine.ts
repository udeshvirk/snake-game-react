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

  const reset = useCallback(() => {
    dispatch(resetGame());
  }, [dispatch]);

  const toggleGame = useCallback(() => {
    dispatch(togglePause());
  }, [dispatch]);

  const setNewDirection = useCallback(
    (newDirection: string) => {
      if (isValidDirectionChange(game.direction, newDirection)) {
        switch (newDirection) {
          case "ArrowUp":
            dispatch(setDirection(Direction.UP));
            break;
          case "ArrowDown":
            dispatch(setDirection(Direction.DOWN));
            break;
          case "ArrowLeft":
            dispatch(setDirection(Direction.LEFT));
            break;
          case "ArrowRight":
            dispatch(setDirection(Direction.RIGHT));
            break;
          case " ":
            dispatch(togglePause());
            break;
          case "r":
          case "R":
            dispatch(resetGame());
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

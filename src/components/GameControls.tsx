import { selectGame } from "@/store/gameSlice";
import React from "react";
import { useSelector } from "react-redux";
interface GameControlsProps {
  reset: () => void;
  toggleGame: () => void;
  setNewDirection: (direction: string) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  reset,
  toggleGame,
  setNewDirection,
}) => {
  const { over, paused } = useSelector(selectGame);
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {/* Main game action button */}
      <div className="flex justify-center mb-2">
        {over ? (
          <button
            onClick={reset}
            className="cursor-pointer bg-snake-head hover:bg-snake-body text-white font-bold py-2 px-8 rounded-full shadow-lg transform transition hover:scale-105"
          >
            New Game
          </button>
        ) : (
          <button
            onClick={toggleGame}
            className={`${
              paused
                ? "bg-green-500 hover:bg-green-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white font-bold py-2 px-8 rounded-full shadow-lg transform transition hover:scale-105`}
          >
            {paused ? "Start" : "Pause"}
          </button>
        )}
      </div>

      {/* Direction controls for mobile/touch (visible on touch devices) */}
      <div className="flex flex-col items-center gap-2 md:hidden">
        <button
          onClick={() => setNewDirection("ArrowUp")}
          className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-2xl"
        >
          ↑
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => setNewDirection("ArrowLeft")}
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-2xl"
          >
            ←
          </button>
          <button
            onClick={() => setNewDirection("ArrowDown")}
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-2xl"
          >
            ↓
          </button>
          <button
            onClick={() => setNewDirection("ArrowRight")}
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-2xl"
          >
            →
          </button>
        </div>
      </div>

      {/* Instruction text */}
      <div className="text-center mt-2">
        <p className="text-sm text-gray-400 hidden md:block">
          Use arrow keys to move the snake
        </p>
        <p className="text-sm text-gray-400 md:hidden">
          Swipe or use buttons to control
        </p>
      </div>
    </div>
  );
};

export default GameControls;

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
  const handleButtonClick = (direction: string) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10); // 10ms vibration
    }
    setNewDirection(direction);
  };
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
      <div className="flex flex-col items-center gap-3 xl:hidden">
        <button
          onClick={() => handleButtonClick("ArrowUp")}
          className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-3xl shadow-lg"
          aria-label="Up"
        >
          {/* Up Arrow SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19V5m0 0l-7 7m7-7l7 7"
            />
          </svg>
        </button>
        <div className="flex gap-6">
          <button
            onClick={() => handleButtonClick("ArrowLeft")}
            className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-3xl shadow-lg"
            aria-label="Left"
          >
            {/* Left Arrow SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 12H5m0 0l7-7m-7 7l7 7"
              />
            </svg>
          </button>
          <button
            onClick={() => handleButtonClick("ArrowDown")}
            className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-3xl shadow-lg"
            aria-label="Down"
          >
            {/* Down Arrow SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v14m0 0l7-7m-7 7l-7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => handleButtonClick("ArrowRight")}
            className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-3xl shadow-lg"
            aria-label="Right"
          >
            {/* Right Arrow SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14m0 0l-7-7m7 7l-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Instruction text */}
      <div className="text-center mt-2">
        <p className="text-sm text-gray-400 hidden xl:block">
          Use arrow keys to move the snake
        </p>
        <p className="text-sm text-gray-400 xl:hidden">
          Use buttons to control
        </p>
      </div>
    </div>
  );
};

export default GameControls;

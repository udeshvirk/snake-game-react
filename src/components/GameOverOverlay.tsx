import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectGame } from "@/store/gameSlice";

interface GameOverOverlayProps {
  reset: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ reset }) => {
  const { score, highestScore } = useSelector(selectGame);

  const isNewHighScore = useMemo(
    () => score >= highestScore && score > 0,
    [score, highestScore]
  );

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg animate-game-over z-10">
      <section className="text-center p-8 bg-game-bg bg-opacity-90 rounded-xl shadow-2xl border border-grid-border transform transition-transform">
        <h2 className="text-white text-3xl font-bold mb-4">Game Over!</h2>
        <p className="text-gray-300 text-lg mb-2">
          Your score:{" "}
          <span className="text-food font-bold text-xl">{score}</span>
        </p>
        <p className="text-gray-300 text-lg mb-6">
          Best score:{" "}
          <span
            className={`font-bold text-xl ${
              isNewHighScore ? "text-food animate-pulse" : "text-snake-head"
            }`}
          >
            {highestScore}
          </span>
          {isNewHighScore && (
            <span className="ml-2 text-food">New High Score!</span>
          )}
        </p>
        <button
          onClick={reset}
          className="cursor-pointer bg-snake-head hover:bg-snake-body text-white font-bold py-2 px-8 rounded-full shadow-lg transform transition hover:scale-105"
        >
          Play Again
        </button>
      </section>
    </div>
  );
};

export default GameOverOverlay;

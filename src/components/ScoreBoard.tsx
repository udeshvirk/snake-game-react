import React from "react";
import { useSelector } from "react-redux";
import { selectGame } from "../store/gameSlice";

const ScoreBoard: React.FC = () => {
  const { score, highestScore } = useSelector(selectGame);

  return (
    <div className="text-center mb-4">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-snake-head to-food bg-clip-text text-transparent">
        Snake Game
      </h1>
      <div className="flex justify-center gap-6 text-xl">
        <span className="text-gray-500">
          Score: <span className="font-bold text-food">{score}</span>
        </span>
        <span className="text-gray-500">
          Best:{" "}
          <span className="font-bold text-snake-head">{highestScore}</span>
        </span>
      </div>
    </div>
  );
};

export default ScoreBoard;

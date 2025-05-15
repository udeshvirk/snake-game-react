import GameBoard from "@/components/GameBoard";
import ScoreBoard from "@/components/ScoreBoard";
import { useGameEngine } from "@/hooks/useGameEngine";
import { useSelector } from "react-redux";
import { selectGame } from "@/store/gameSlice";
import GameOverOverlay from "@/components/GameOverOverlay";
import GameControls from "@/components/GameControls";

function App() {
  const { reset, toggleGame, setNewDirection } = useGameEngine();
  const { over } = useSelector(selectGame);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full bg-gray-900 py-8 px-4 gap-6">
      <ScoreBoard />
      <div className="relative">
        <GameBoard />
        {over && <GameOverOverlay reset={reset} />}
      </div>
      <GameControls
        reset={reset}
        toggleGame={toggleGame}
        setNewDirection={setNewDirection}
      />
    </div>
  );
}

export default App;

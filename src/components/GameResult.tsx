import React from "react";
import { GameStatus } from "./types";
import { useGame } from "./GameContext";

interface GameResultProps {
  gameStatus: GameStatus;
}

export const GameResult: React.FC<GameResultProps> = ({ gameStatus }) => {
  const { resetGame } = useGame();

  if (gameStatus === "playing") return null;

  return (
    <div
      className={`
      px-6 py-4 transition-all duration-500 ease-in-out transform
      ${
        gameStatus === "won"
          ? "bg-green-100/90 backdrop-blur-sm"
          : "bg-red-100/90 backdrop-blur-sm"
      }
    `}
    >
      <div className="flex justify-between items-center">
        <p
          className={`
          text-lg font-semibold transition-all duration-300
          ${gameStatus === "won" ? "text-green-800" : "text-red-800"}
        `}
        >
          {gameStatus === "won"
            ? "🎉 Mouse escaped successfully!"
            : "😺 Cat caught the mouse!"}
        </p>
        <button
          onClick={resetGame}
          className={`
            px-4 py-2 rounded-lg text-white text-sm font-medium
            transform transition-all duration-300
            hover:scale-105 active:scale-95
            ${
              gameStatus === "won"
                ? "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200"
                : "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200"
            }
          `}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

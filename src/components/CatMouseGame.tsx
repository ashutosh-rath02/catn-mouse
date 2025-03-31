"use client";

import React, { useState } from "react";
import { StatusBar } from "./StatusBar";
import { InfoPanel } from "./InfoPanel";
import { GameBoard } from "./GameBoard";
import { GameResult } from "./GameResult";
import { GameProvider, useGame } from "./GameContext";

const GameHeader: React.FC = () => {
  const { turnCount } = useGame();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-violet-700 to-indigo-700 px-6 py-5 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold text-white tracking-wider">
          Cat & Mouse
        </h1>
        <div className="flex items-center space-x-4">
          <div className="bg-white/25 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="font-semibold text-white">
              Round: {Math.floor(turnCount / 2) + 1}
            </span>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="font-bold text-white">i</span>
          </button>
        </div>
      </div>
      <InfoPanel show={showInfo} />
    </>
  );
};

const GameContainer: React.FC = () => {
  const { catPosition, mousePosition, activePlayer, gameStatus } = useGame();

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-xl overflow-hidden mb-4">
      <GameHeader />

      <StatusBar
        activePlayer={activePlayer}
        gameStatus={gameStatus}
        catPosition={catPosition}
        mousePosition={mousePosition}
      />

      <GameBoard />

      <GameResult gameStatus={gameStatus} />
    </div>
  );
};

export const CatMouseGame: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen">
      <GameProvider>
        <GameContainer />
      </GameProvider>
      <footer className="mt-4 text-center text-indigo-600/80 font-medium">
        <p>
          Made with 🖱️ by{" "}
          <a
            href="https://twitter.com/v_ashu_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-800 transition-colors duration-200 underline decoration-dotted"
          >
            Ashutosh
          </a>
        </p>
      </footer>
    </div>
  );
};

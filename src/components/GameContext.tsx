import React, { createContext, useContext } from "react";
import { GameState, NodeIndex } from "./types";
import { useGameLogic } from "./useGameLogic";

interface GameContextType extends GameState {
  movePlayer: (nodeIndex: NodeIndex) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const gameLogic = useGameLogic();

  return (
    <GameContext.Provider value={gameLogic}>{children}</GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

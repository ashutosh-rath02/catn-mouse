import React from "react";
import { NodeIndex, Player, GameStatus } from "./types";
import { GAME_GRAPH } from "./constants";
import { getStatusMessage } from "@/lib/utils";

interface StatusBarProps {
  activePlayer: Player;
  gameStatus: GameStatus;
  catPosition: NodeIndex;
  mousePosition: NodeIndex;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activePlayer,
  gameStatus,
  catPosition,
  mousePosition,
}) => {
  return (
    <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-200 shadow-sm">
      <div className="flex items-center space-x-3">
        <div
          className={`
          w-4 h-4 rounded-full transform transition-all duration-300
          ${
            activePlayer === "mouse"
              ? "bg-blue-500 scale-110 shadow-lg shadow-blue-200"
              : "bg-red-500 scale-110 shadow-lg shadow-red-200"
          }
        `}
        ></div>
        <p className="text-lg font-medium text-gray-800 transition-all duration-300">
          {getStatusMessage(
            gameStatus,
            activePlayer,
            catPosition,
            mousePosition,
            GAME_GRAPH
          )}
        </p>
      </div>
    </div>
  );
};

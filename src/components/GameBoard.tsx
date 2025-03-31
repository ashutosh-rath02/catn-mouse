import React, { useState } from "react";
import { GameNode } from "./GameNode";
import { GameConnections } from "./GameConnections";
import { calculateNodePosition } from "@/lib/utils";
import { BOARD_WIDTH, BOARD_HEIGHT } from "./constants";
import { useGame } from "./GameContext";

export const GameBoard: React.FC = () => {
  const { catPosition, mousePosition, activePlayer, gameStatus, movePlayer } =
    useGame();

  const [hoverNode, setHoverNode] = useState<number | null>(null);

  return (
    <div className="p-6 flex justify-center items-center bg-gradient-to-b from-white to-indigo-50">
      <div className="relative">
        <svg
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
        >
          <GameConnections
            activePlayer={activePlayer}
            catPosition={catPosition}
            mousePosition={mousePosition}
          />

          {[0, 1, 2, 3, 4, 5].map((nodeIndex) => {
            const { x, y } = calculateNodePosition(nodeIndex);
            const isCat = nodeIndex === catPosition;
            const isMouse = nodeIndex === mousePosition;
            const isHovered = nodeIndex === hoverNode;

            return (
              <GameNode
                key={nodeIndex}
                index={nodeIndex}
                x={x}
                y={y}
                isCat={isCat}
                isMouse={isMouse}
                isHovered={isHovered}
                activePlayer={activePlayer}
                gameStatus={gameStatus}
                catPosition={catPosition}
                mousePosition={mousePosition}
                onClick={movePlayer}
                onMouseEnter={() => setHoverNode(nodeIndex)}
                onMouseLeave={() => setHoverNode(null)}
              />
            );
          })}

          <defs>
            <linearGradient
              id="catGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient
              id="mouseGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient
              id="validMoveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

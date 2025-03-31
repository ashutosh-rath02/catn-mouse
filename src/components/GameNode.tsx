import React from "react";
import { NodeIndex, Player, GameStatus } from "./types";
import { GAME_GRAPH } from "./constants";

interface GameNodeProps {
  index: number;
  x: number;
  y: number;
  isCat: boolean;
  isMouse: boolean;
  isHovered: boolean;
  activePlayer: Player;
  gameStatus: GameStatus;
  catPosition: NodeIndex;
  mousePosition: NodeIndex;
  onClick: (index: NodeIndex) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const GameNode: React.FC<GameNodeProps> = ({
  index,
  x,
  y,
  isCat,
  isMouse,
  isHovered,
  activePlayer,
  gameStatus,
  catPosition,
  mousePosition,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isValidMove =
    gameStatus === "playing" &&
    (activePlayer === "mouse"
      ? GAME_GRAPH[mousePosition].includes(index) && index !== catPosition
      : GAME_GRAPH[catPosition].includes(index));

  let nodeColor = "#d1d5db";
  let nodeGradient = "";
  let nodeStroke = "#9ca3af";
  let nodeStrokeWidth = 2;
  let nodeShadow = "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))";
  let nodeSize = 40;

  if (isCat) {
    nodeColor = "#ef4444";
    nodeGradient = "url(#catGradient)";
    nodeStroke = "#b91c1c";
    nodeShadow = "drop-shadow(0px 3px 3px rgba(0,0,0,0.2))";
    nodeSize = 44;
  } else if (isMouse) {
    nodeColor = "#3b82f6";
    nodeGradient = "url(#mouseGradient)";
    nodeStroke = "#1d4ed8";
    nodeShadow = "drop-shadow(0px 3px 3px rgba(0,0,0,0.2))";
    nodeSize = 48;
  } else if (isValidMove) {
    nodeColor = "#10b981";
    nodeGradient = "url(#validMoveGradient)";
    nodeStroke = "#059669";
    nodeStrokeWidth = 3;
    nodeShadow = "drop-shadow(0px 3px 3px rgba(0,0,0,0.15))";

    if (isHovered) {
      nodeSize = 44;
      nodeShadow = "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))";
    }
  }

  return (
    <g
      style={{ filter: nodeShadow }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="transition-all duration-200"
    >
      <rect
        x={x - nodeSize / 2}
        y={y - nodeSize / 2}
        width={nodeSize}
        height={nodeSize}
        rx={10}
        fill={nodeGradient || nodeColor}
        stroke={nodeStroke}
        strokeWidth={nodeStrokeWidth}
        className={isValidMove ? "cursor-pointer hover:opacity-90" : ""}
        onClick={() => isValidMove && onClick(index as NodeIndex)}
      />

      {(isCat || isMouse) && (
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="32"
          fontWeight="bold"
          className="select-none pointer-events-none"
        >
          {isCat ? "😸" : "🐭"}
        </text>
      )}
    </g>
  );
};

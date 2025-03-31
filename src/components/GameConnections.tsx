import React from "react";
import { NodeIndex, Player } from "./types";
import { CENTER_X, CENTER_Y, OUTER_RADIUS, GAME_GRAPH } from "./constants";
import { calculateNodePosition } from "@/lib/utils";

interface GameConnectionsProps {
  activePlayer: Player;
  catPosition: NodeIndex;
  mousePosition: NodeIndex;
}

export const GameConnections: React.FC<GameConnectionsProps> = ({
  activePlayer,
  catPosition,
  mousePosition,
}) => {
  const drawConnections = () => {
    const connections = [];
    const addedPairs = new Set<string>();

    for (let i = 0; i < GAME_GRAPH.length; i++) {
      for (const neighbor of GAME_GRAPH[i]) {
        const pairKey = [Math.min(i, neighbor), Math.max(i, neighbor)].join(
          "-"
        );
        if (addedPairs.has(pairKey)) continue;
        addedPairs.add(pairKey);

        const start = calculateNodePosition(i);
        const end = calculateNodePosition(neighbor);

        let path;

        if (i === 5 || neighbor === 5) {
          path = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
        } else {
          const midX = (start.x + end.x) / 2;
          const midY = (start.y + end.y) / 2;

          const vx = midX - CENTER_X;
          const vy = midY - CENTER_Y;
          const vLen = Math.sqrt(vx * vx + vy * vy);

          const nvx = vx / vLen;
          const nvy = vy / vLen;

          const curveDirection = i < neighbor ? 1 : -1;

          const curveIntensity = 0.3;

          const controlX =
            midX + curveDirection * curveIntensity * OUTER_RADIUS * nvx;
          const controlY =
            midY + curveDirection * curveIntensity * OUTER_RADIUS * nvy;

          path = `M ${start.x} ${start.y} Q ${controlX} ${controlY}, ${end.x} ${end.y}`;
        }

        const isActiveConnection =
          (activePlayer === "mouse" &&
            (i === mousePosition || neighbor === mousePosition)) ||
          (activePlayer === "cat" &&
            (i === catPosition || neighbor === catPosition));

        const strokeColor = isActiveConnection ? "#8a2be2" : "#a29bfe";
        const strokeWidth = isActiveConnection ? 4 : 3;
        const strokeOpacity = isActiveConnection ? 0.9 : 0.6;

        connections.push(
          <path
            key={pairKey}
            d={path}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeOpacity={strokeOpacity}
            className="transition-all duration-300"
          />
        );
      }
    }
    return connections;
  };

  return <>{drawConnections()}</>;
};

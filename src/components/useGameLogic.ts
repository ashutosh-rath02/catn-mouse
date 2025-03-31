import { useState } from "react";
import { NodeIndex, GameStatus, Player, GameState } from "./types";
import {
  GAME_GRAPH,
  INITIAL_CAT_POSITION,
  INITIAL_MOUSE_POSITION,
  INITIAL_PLAYER,
  WIN_ROUNDS,
} from "./constants";

interface GameLogic extends GameState {
  movePlayer: (nodeIndex: NodeIndex) => void;
  resetGame: () => void;
}

export const useGameLogic = (): GameLogic => {
  const [catPosition, setCatPosition] =
    useState<NodeIndex>(INITIAL_CAT_POSITION);
  const [mousePosition, setMousePosition] = useState<NodeIndex>(
    INITIAL_MOUSE_POSITION
  );
  const [activePlayer, setActivePlayer] = useState<Player>(INITIAL_PLAYER);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [turnCount, setTurnCount] = useState(0);

  const movePlayer = (nodeIndex: NodeIndex) => {
    if (gameStatus !== "playing") return;

    if (activePlayer === "mouse") {
      if (!GAME_GRAPH[mousePosition].includes(nodeIndex)) return;

      if (nodeIndex === catPosition) return;

      setMousePosition(nodeIndex);
      setActivePlayer("cat");
    } else {
      if (!GAME_GRAPH[catPosition].includes(nodeIndex)) return;

      if (nodeIndex === mousePosition) {
        setCatPosition(nodeIndex);
        setGameStatus("lost");
        return;
      }

      setCatPosition(nodeIndex);
      setActivePlayer("mouse");
      setTurnCount((prevTurnCount) => {
        const newTurnCount = prevTurnCount + 1;
        if (newTurnCount >= WIN_ROUNDS * 2 - 1) {
          setGameStatus("won");
        }
        return newTurnCount;
      });
    }
  };

  const resetGame = () => {
    setCatPosition(INITIAL_CAT_POSITION);
    setMousePosition(INITIAL_MOUSE_POSITION);
    setActivePlayer(INITIAL_PLAYER);
    setGameStatus("playing");
    setTurnCount(0);
  };

  return {
    catPosition,
    mousePosition,
    activePlayer,
    gameStatus,
    turnCount,
    movePlayer,
    resetGame,
  };
};

import { CENTER_X, CENTER_Y, OUTER_RADIUS } from "@/components/constants";
import { NodeIndex, NodePosition } from "@/components/types";

export const calculateNodePosition = (index: number): NodePosition => {
  if (index === 5) {
    return { x: CENTER_X, y: CENTER_Y };
  } else {
    const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2;
    const x = CENTER_X + OUTER_RADIUS * Math.cos(angle);
    const y = CENTER_Y + OUTER_RADIUS * Math.sin(angle);
    return { x, y };
  }
};

export const getStatusMessage = (
  gameStatus: string,
  activePlayer: string,
  catPosition: NodeIndex,
  mousePosition: NodeIndex,
  graph: number[][]
): string => {
  if (gameStatus === "won") return "Mouse escaped! Game over.";
  if (gameStatus === "lost") return "Cat caught the mouse! Game over.";

  if (activePlayer === "cat") {
    const canCatchMouse = graph[catPosition].includes(mousePosition);
    if (canCatchMouse)
      return "Cat can catch the mouse! Click on mouse to capture.";
  }

  return `${activePlayer === "mouse" ? "Mouse" : "Cat"}'s turn`;
};

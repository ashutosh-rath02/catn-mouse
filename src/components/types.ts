export type NodeIndex = 0 | 1 | 2 | 3 | 4 | 5;

export type GameStatus = "playing" | "won" | "lost";

export type Player = "mouse" | "cat";

export type Graph = number[][];

export interface NodePosition {
  x: number;
  y: number;
}

export interface GameState {
  catPosition: NodeIndex;
  mousePosition: NodeIndex;
  activePlayer: Player;
  gameStatus: GameStatus;
  turnCount: number;
}

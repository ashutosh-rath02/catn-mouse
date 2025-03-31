import { Graph } from "./types";

export const BOARD_WIDTH = 400;
export const BOARD_HEIGHT = 400;
export const CENTER_X = BOARD_WIDTH / 2;
export const CENTER_Y = BOARD_HEIGHT / 2;
export const OUTER_RADIUS = 150;

export const GAME_GRAPH: Graph = [
  [1, 5, 4],
  [0, 2],
  [1, 3, 5],
  [2, 4, 5],
  [0, 3],
  [0, 2, 3],
];

export const INITIAL_CAT_POSITION = 3;
export const INITIAL_MOUSE_POSITION = 1;
export const INITIAL_PLAYER = "mouse";
export const WIN_ROUNDS = 5;

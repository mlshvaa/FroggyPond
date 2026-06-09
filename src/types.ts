// один объект пруда
type PondObject = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  owned: number;
  fliesPerSecond: number;
};

// весь игровой стейт
type GameState = {
  flies: number;
  fish: number;
  objects: PondObject[];
  lastSeen: number;
};

export type { PondObject, GameState };

// Player type definition
export interface Player {
  id: string;
  name: string;
  wage: number;
  position: string;
  positionIndex: number; // 0 for starter, 1 for backup, 2 for third choice
}

// Position on the pitch
export interface Position {
  id: string;
  name: string; // e.g. "GK", "CB", "LB", etc.
  x: number; // x coordinate on the pitch (0-100)
  y: number; // y coordinate on the pitch (0-100)
  players: Player[]; // up to 3 players in this position
}

// Formation type
export interface Formation {
  id: string;
  name: string;
  positions: Position[];
}

// Squad with budget information
export interface Squad {
  id: string;
  name: string;
  formation: Formation;
  budget: number;
}
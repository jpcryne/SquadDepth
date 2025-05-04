import { Formation } from '../types';
import { getInitialPlayers } from './initialPlayers';

// Get initial players
const initialPlayers = getInitialPlayers();

// 4-3-3 Formation
export const formation433: Formation = {
  id: 'formation-433',
  name: '4-3-3',
  positions: [
    // Goalkeeper
    { id: 'gk', name: 'GK', x: 10, y: 50, players: initialPlayers['gk'] || [] },
    
    // Defenders
    { id: 'lb', name: 'LB', x: 27, y: 20, players: initialPlayers['lb'] || [] },
    { id: 'lcb', name: 'CB', x: 27, y: 40, players: initialPlayers['lcb'] || [] },
    { id: 'rcb', name: 'CB', x: 27, y: 60, players: initialPlayers['rcb'] || [] },
    { id: 'rb', name: 'RB', x: 27, y: 80, players: initialPlayers['rb'] || [] },
    
    // Midfielders
    { id: 'lcm', name: 'CM', x: 48, y: 30, players: initialPlayers['lcm'] || [] },
    { id: 'cdm', name: 'CDM', x: 48, y: 50, players: initialPlayers['cdm'] || [] },
    { id: 'rcm', name: 'CM', x: 48, y: 70, players: initialPlayers['rcm'] || [] },
    
    // Forwards
    { id: 'lw', name: 'LW', x: 70, y: 20, players: initialPlayers['lw'] || [] },
    { id: 'st', name: 'ST', x: 70, y: 50, players: initialPlayers['st'] || [] },
    { id: 'rw', name: 'RW', x: 70, y: 80, players: initialPlayers['rw'] || [] },
  ]
};

// Export available formations
export const formations: Formation[] = [
  formation433,
];

// Default formation
export const defaultFormation = formation433;
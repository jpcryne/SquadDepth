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
    { id: 'gk', name: 'GK', x: 14, y: 50, players: initialPlayers['gk'] || [] },
    
    // Defenders
    { id: 'lb', name: 'LB', x: 35, y: 20, players: initialPlayers['lb'] || [] },
    { id: 'lcb', name: 'CB', x: 35, y: 40, players: initialPlayers['lcb'] || [] },
    { id: 'rcb', name: 'CB', x: 35, y: 60, players: initialPlayers['rcb'] || [] },
    { id: 'rb', name: 'RB', x: 35, y: 80, players: initialPlayers['rb'] || [] },
    
    // Midfielders
    { id: 'lcm', name: 'CM', x: 56, y: 30, players: initialPlayers['lcm'] || [] },
    { id: 'cdm', name: 'CDM', x: 56, y: 50, players: initialPlayers['cdm'] || [] },
    { id: 'rcm', name: 'CM', x: 56, y: 70, players: initialPlayers['rcm'] || [] },
    
    // Forwards
    { id: 'lw', name: 'LW', x: 78, y: 20, players: initialPlayers['lw'] || [] },
    { id: 'st', name: 'ST', x: 78, y: 50, players: initialPlayers['st'] || [] },
    { id: 'rw', name: 'RW', x: 78, y: 80, players: initialPlayers['rw'] || [] },
  ]
};

// 4-4-2 Formation
export const formation442: Formation = {
  id: 'formation-442',
  name: '4-4-2',
  positions: [
    // Goalkeeper
    { id: 'gk', name: 'GK', x: 14, y: 50, players: initialPlayers['gk'] || [] },
    
    // Defenders
    { id: 'lb', name: 'LB', x: 35, y: 20, players: initialPlayers['lb'] || [] },
    { id: 'lcb', name: 'CB', x: 35, y: 40, players: initialPlayers['lcb'] || [] },
    { id: 'rcb', name: 'CB', x: 35, y: 60, players: initialPlayers['rcb'] || [] },
    { id: 'rb', name: 'RB', x: 35, y: 80, players: initialPlayers['rb'] || [] },
    
    // Midfielders
    { id: 'lm', name: 'LM', x: 56, y: 20, players: initialPlayers['lw'] || [] },
    { id: 'lcm2', name: 'CM', x: 56, y: 40, players: initialPlayers['lcm'] || [] },
    { id: 'rcm2', name: 'CM', x: 56, y: 60, players: initialPlayers['rcm'] || [] },
    { id: 'rm', name: 'RM', x: 56, y: 80, players: initialPlayers['rw'] || [] },
    
    // Forwards
    { id: 'lst', name: 'ST', x: 78, y: 40, players: initialPlayers['st'] || [] },
    { id: 'rst', name: 'ST', x: 78, y: 60, players: [] },
  ]
};

// Export available formations
export const formations: Formation[] = [
  formation433,
  formation442,
];

// Default formation
export const defaultFormation = formation433;
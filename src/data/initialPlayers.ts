import { Player } from '../types';

// Generate a unique ID for each player
const generatePlayerId = (name: string, position: string): string => {
  return `player-${name.toLowerCase()}-${position.toLowerCase()}-${Date.now()}`;
};

// Initial players for the 4-3-3 formation
export const getInitialPlayers = (): Record<string, Player[]> => ({
  // Goalkeeper
  'gk': [
    {
      id: generatePlayerId('Alisson', 'GK'),
      name: 'Alisson',
      wage: 150000,
      position: 'GK',
      positionIndex: 0
    },
    {
      id: generatePlayerId('Kelleher', 'GK'),
      name: 'Kelleher',
      wage: 40000,
      position: 'GK',
      positionIndex: 1
    }
  ],
  
  // Defenders
  'lb': [
    {
      id: generatePlayerId('Robertson', 'LB'),
      name: 'Robertson',
      wage: 100000,
      position: 'LB',
      positionIndex: 0
    }
  ],
  'lcb': [
    {
      id: generatePlayerId('Van Dijk', 'CB'),
      name: 'Van Dijk',
      wage: 220000,
      position: 'CB',
      positionIndex: 0
    }
  ],
  'rcb': [
    {
      id: generatePlayerId('Konate', 'CB'),
      name: 'Konate',
      wage: 70000,
      position: 'CB',
      positionIndex: 0
    }
  ],
  'rb': [
    {
      id: generatePlayerId('Alexander-Arnold', 'RB'),
      name: 'Alexander-Arnold',
      wage: 180000,
      position: 'RB',
      positionIndex: 0
    }
  ],
  
  // Midfielders
  'lcm': [
    {
      id: generatePlayerId('Phillips', 'CM'),
      name: 'Phillips',
      wage: 5000,
      position: 'CM',
      positionIndex: 0
    }
  ],
  'cdm': [
    {
      id: generatePlayerId('Mac Allister', 'CDM'),
      name: 'Mac Allister',
      wage: 150000,
      position: 'CDM',
      positionIndex: 0
    }
  ],
  'rcm': [
    {
      id: generatePlayerId('Szoboszlai', 'CM'),
      name: 'Szoboszlai',
      wage: 120000,
      position: 'CM',
      positionIndex: 0
    }
  ],
  
  // Forwards
  'lw': [
    {
      id: generatePlayerId('Diaz', 'LW'),
      name: 'Diaz',
      wage: 100000,
      position: 'LW',
      positionIndex: 0
    }
  ],
  'st': [
    {
      id: generatePlayerId('Nunez', 'ST'),
      name: 'Nunez',
      wage: 140000,
      position: 'ST',
      positionIndex: 0
    }
  ],
  'rw': [
    {
      id: generatePlayerId('Salah', 'RW'),
      name: 'Salah',
      wage: 350000,
      position: 'RW',
      positionIndex: 0
    }
  ]
});
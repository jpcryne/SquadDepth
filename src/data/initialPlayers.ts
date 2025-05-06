import { Player } from '../types';
import { parseCSV, groupBy } from '../utils/csvParser';

// Generate a unique ID for each player
const generatePlayerId = (name: string, position: string): string => {
  return `player-${name.toLowerCase()}-${position.toLowerCase()}-${Date.now()}`;
};

// Map position names to position IDs in formation
const positionMap: Record<string, string> = {
  'GK': 'gk',
  'LB': 'lb',
  'CB': 'lcb',  // Note: CB maps to both lcb and rcb positions
  'RB': 'rb',
  'CM': 'lcm',  // Note: CM maps to both lcm and rcm positions
  'CDM': 'cdm',
  'LW': 'lw',
  'ST': 'st',
  'RW': 'rw'
};

// Initial players loaded from CSV
let initialPlayersCache: Record<string, Player[]> | null = null;

export const getInitialPlayers = (): Record<string, Player[]> => {
  // Return cached players if available
  if (initialPlayersCache) {
    return initialPlayersCache;
  }
  
  // Default empty result
  const result: Record<string, Player[]> = {};
  
  // Try to fetch and parse the CSV file
  try {
    // Make synchronous fetch (only for initialization)
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/initialPlayers.csv', false); // false makes it synchronous
    xhr.send();
    
    if (xhr.status === 200) {
      const csvData = xhr.responseText;
      const players = parseCSV(csvData);
      
      // Convert CSV data to Player objects
      const playerObjects = players.map(player => ({
        id: generatePlayerId(player.name, player.position),
        name: player.name,
        wage: parseInt(player.wage, 10),
        position: player.position,
        positionIndex: 0 // Will be set correctly when adding to positions
      }));
      
      // Group by position
      const groupedByPosition = groupBy(playerObjects, 'position');
      
      // Map to formation positions
      Object.entries(groupedByPosition).forEach(([position, players]) => {
        const positionId = positionMap[position];
        
        if (positionId) {
          // Handle special cases: CB and CM need to be distributed
          if (position === 'CB') {
            // Distribute CBs evenly between lcb and rcb
            // Create copies of all CB players
            const allCBs = [...players];
            
            // Initialize arrays for both CB positions
            const lcbPlayers: Player[] = [];
            const rcbPlayers: Player[] = [];
            
            // Distribute CBs evenly between lcb and rcb
            while (allCBs.length > 0) {
              // Add to position with fewer players
              if (lcbPlayers.length <= rcbPlayers.length) {
                lcbPlayers.push({ ...allCBs.shift()!, positionIndex: lcbPlayers.length });
              } else {
                rcbPlayers.push({ ...allCBs.shift()!, positionIndex: rcbPlayers.length });
              }
            }
            
            result['lcb'] = lcbPlayers;
            result['rcb'] = rcbPlayers;
          } 
          else if (position === 'CM') {
            // First CM goes to lcm, second to rcm, the rest are distributed evenly
            // Create copies of all CM players
            const allCMs = [...players];
            
            // Take first for lcm
            const lcmPlayers = allCMs.splice(0, 1).map((p, i) => ({ ...p, positionIndex: i }));
            // Take next for rcm
            const rcmPlayers = allCMs.splice(0, 1).map((p, i) => ({ ...p, positionIndex: i }));
            
            // Add remaining CMs to both positions evenly
            while (allCMs.length > 0) {
              // Add to position with fewer players
              if (lcmPlayers.length <= rcmPlayers.length) {
                lcmPlayers.push({ ...allCMs.shift()!, positionIndex: lcmPlayers.length });
              } else {
                rcmPlayers.push({ ...allCMs.shift()!, positionIndex: rcmPlayers.length });
              }
            }
            
            result['lcm'] = lcmPlayers;
            result['rcm'] = rcmPlayers;
          }
          else {
            // Normal case - add players with correct positionIndex
            result[positionId] = players.map((player, index) => ({
              ...player,
              positionIndex: index
            }));
          }
        }
      });
      
      // Cache the result
      initialPlayersCache = result;
      return result;
    }
  } catch (error) {
    console.error('Failed to load initial players from CSV:', error);
  }
  
  // Return empty object if CSV loading fails
  return {};
};
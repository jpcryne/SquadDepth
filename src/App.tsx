import React, { useState } from 'react';
import { defaultFormation } from './data/formations';
import { Formation, Player } from './types';
import FootballPitch from './components/FootballPitch';
import BudgetPanel from './components/BudgetPanel';

const App: React.FC = () => {
  // State for the formation
  const [formation, setFormation] = useState<Formation>({ 
    ...defaultFormation,
    positions: defaultFormation.positions.map(pos => ({ ...pos, players: [...pos.players] }))
  });
  
  // State for the budget
  const [budget, setBudget] = useState<number>(4000000); // Default budget of £4M
  
  // Update player in a position
  const updatePlayerInPosition = (positionId: string, player: Player) => {
    setFormation(prev => {
      const newFormation = { ...prev };
      const positionIndex = newFormation.positions.findIndex(pos => pos.id === positionId);
      
      if (positionIndex === -1) return prev;
      
      const position = newFormation.positions[positionIndex];
      const playerIndex = position.players.findIndex(p => p.id === player.id);
      
      if (playerIndex === -1) {
        // Add new player
        position.players.push(player);
      } else {
        // Update existing player
        position.players[playerIndex] = player;
      }
      
      return newFormation;
    });
  };
  
  // Remove player from a position
  const removePlayerFromPosition = (positionId: string, playerId: string) => {
    setFormation(prev => {
      const newFormation = { ...prev };
      const positionIndex = newFormation.positions.findIndex(pos => pos.id === positionId);
      
      if (positionIndex === -1) return prev;
      
      const position = newFormation.positions[positionIndex];
      position.players = position.players.filter(player => player.id !== playerId);
      
      return newFormation;
    });
  };
  
  return (
    <div className="app" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Football Squad Depth Chart</h1>
        <p style={{ color: '#666' }}>Build your team and manage your budget</p>
      </header>
      
      <BudgetPanel
        formation={formation}
        budget={budget}
        setBudget={setBudget}
      />
      
      <FootballPitch
        formation={formation}
        updatePlayerInPosition={updatePlayerInPosition}
        removePlayerFromPosition={removePlayerFromPosition}
      />
    </div>
  );
};

export default App;
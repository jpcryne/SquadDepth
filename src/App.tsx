import React, { useState } from 'react';
import { defaultFormation, formations } from './data/formations';
import { Formation, Player } from './types';
import FootballPitch from './components/FootballPitch';
import BudgetPanel from './components/BudgetPanel';
import FormModal from './components/FormModal';
import FormationSelector from './components/FormationSelector';

const App: React.FC = () => {
  // State for the formation
  const [formation, setFormation] = useState<Formation>({ 
    ...defaultFormation,
    positions: defaultFormation.positions.map(pos => ({ ...pos, players: [...pos.players] }))
  });
  
  // Function to change formation
  const handleFormationChange = (newFormation: Formation) => {
    // Create a mapping of position IDs to players from the current formation
    const playerMap: Record<string, Player[]> = {};
    formation.positions.forEach(position => {
      playerMap[position.id] = [...position.players];
    });
    
    // Apply players from the old formation to the new formation where possible
    const newPositions = newFormation.positions.map(position => {
      // If position exists in old formation, keep the players
      const existingPlayers = playerMap[position.id] || [];
      return {
        ...position,
        players: [...existingPlayers]
      };
    });
    
    // Set the new formation with the preserved players
    setFormation({
      ...newFormation,
      positions: newPositions
    });
  };
  
  // State for the budget
  const [budget, setBudget] = useState<number>(4000000); // Default budget of £4M
  
  // State for modal form
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    player?: Player;
    positionId?: string;
    isEditing: boolean;
  }>({
    isOpen: false,
    isEditing: false
  });
  
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
  
  // Open form for adding a player
  const openAddPlayerForm = (positionId: string) => {
    setModalState({
      isOpen: true,
      positionId,
      isEditing: false
    });
  };
  
  // Open form for editing a player
  const openEditPlayerForm = (positionId: string, player: Player) => {
    setModalState({
      isOpen: true,
      positionId,
      player,
      isEditing: true
    });
  };
  
  // Close the modal
  const closeModal = () => {
    setModalState({
      isOpen: false,
      isEditing: false
    });
  };
  
  // Handle form submission
  const handleFormSubmit = (player: Player) => {
    if (modalState.positionId) {
      updatePlayerInPosition(modalState.positionId, player);
      closeModal();
    }
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
      
      <FormationSelector
        formations={formations}
        currentFormation={formation}
        onFormationChange={handleFormationChange}
      />
      
      <FootballPitch
        formation={formation}
        openAddPlayerForm={openAddPlayerForm}
        openEditPlayerForm={openEditPlayerForm}
        removePlayerFromPosition={removePlayerFromPosition}
      />
      
      {modalState.isOpen && (
        <FormModal
          player={modalState.player}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default App;
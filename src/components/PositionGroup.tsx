import React, { useState } from 'react';
import { Position, Player } from '../types';
import PlayerCard from './PlayerCard';
import PlayerForm from './PlayerForm';

interface PositionGroupProps {
  position: Position;
  updatePlayer: (positionId: string, player: Player) => void;
  removePlayer: (positionId: string, playerId: string) => void;
}

const PositionGroup: React.FC<PositionGroupProps> = ({ 
  position, 
  updatePlayer, 
  removePlayer 
}) => {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  
  const handleAddPlayer = (player: Player) => {
    updatePlayer(position.id, {
      ...player,
      position: position.name,
      positionIndex: position.players.length
    });
    setIsAddingPlayer(false);
  };
  
  const handleEditPlayer = (player: Player) => {
    updatePlayer(position.id, player);
    setEditingPlayer(null);
  };
  
  const availableSlots = 3 - position.players.length;
  
  return (
    <div 
      className="position-group"
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '120px',
        zIndex: 1, // Base z-index for position groups
      }}
    >
      <div 
        className="position-label"
        style={{
          background: '#333',
          color: 'white',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '8px',
          fontSize: '12px',
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 2, // Higher than the base position group but lower than forms
          pointerEvents: 'none' // Makes the label transparent to mouse clicks
        }}
      >
        {position.name}
      </div>
      
      <div className="player-stack" style={{ width: '100%' }}>
        {position.players.map((player) => (
          <PlayerCard 
            key={player.id}
            player={player}
            onRemove={(id) => removePlayer(position.id, id)}
            onEdit={(player) => setEditingPlayer(player)}
          />
        ))}
        
        {availableSlots > 0 && !isAddingPlayer && !editingPlayer && (
          <button 
            onClick={() => setIsAddingPlayer(true)}
            style={{
              width: '100%',
              padding: '8px',
              background: '#e0e0e0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '4px',
              fontSize: '12px',
            }}
          >
            + Add Player
          </button>
        )}
        
        {isAddingPlayer && (
          <div style={{ position: 'relative', zIndex: 100 }}>
            <PlayerForm 
              onSubmit={handleAddPlayer}
              onCancel={() => setIsAddingPlayer(false)}
            />
          </div>
        )}
        
        {editingPlayer && (
          <div style={{ position: 'relative', zIndex: 100 }}>
            <PlayerForm 
              player={editingPlayer}
              onSubmit={handleEditPlayer}
              onCancel={() => setEditingPlayer(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionGroup;
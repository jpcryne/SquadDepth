import React from 'react';
import { Position, Player } from '../types';
import PlayerCard from './PlayerCard';

interface PositionGroupProps {
  position: Position;
  onAddPlayer: () => void;
  onEditPlayer: (player: Player) => void;
  onRemovePlayer: (playerId: string) => void;
}

const PositionGroup: React.FC<PositionGroupProps> = ({ 
  position,
  onAddPlayer,
  onEditPlayer,
  onRemovePlayer
}) => {
  
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
        alignItems: 'center',
        width: '200px',
        zIndex: 1
      }}
    >
      {/* Position label on the left */}
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
          marginRight: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          flexShrink: 0
        }}
      >
        {position.name}
      </div>
      
      {/* Player stack on the right */}
      <div className="player-stack" style={{ 
        width: '140px',
        position: 'relative'
      }}>
        {position.players.map((player) => (
          <PlayerCard 
            key={player.id}
            player={player}
            onRemove={() => onRemovePlayer(player.id)}
            onEdit={() => onEditPlayer(player)}
          />
        ))}
        
        {availableSlots > 0 && (
          <button 
            onClick={onAddPlayer}
            style={{
              width: '100%',
              padding: '8px',
              background: '#e0e0e0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '4px',
              fontSize: '12px',
              position: 'relative',
              zIndex: 10, // Higher than position labels
              pointerEvents: 'auto' // Ensure this button is always clickable
            }}
          >
            + Add Player
          </button>
        )}
      </div>
    </div>
  );
};

export default PositionGroup;
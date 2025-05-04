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
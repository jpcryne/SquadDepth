import React from 'react';
import { Formation, Player } from '../types';
import PositionGroup from './PositionGroup';

interface FootballPitchProps {
  formation: Formation;
  openAddPlayerForm: (positionId: string) => void;
  openEditPlayerForm: (positionId: string, player: Player) => void;
  removePlayerFromPosition: (positionId: string, playerId: string) => void;
}

const FootballPitch: React.FC<FootballPitchProps> = ({ 
  formation, 
  openAddPlayerForm,
  openEditPlayerForm,
  removePlayerFromPosition 
}) => {
  return (
    <div 
      className="football-pitch"
      style={{
        width: '100%',
        height: '600px',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        backgroundImage: 'url(/pitch.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        overflow: 'visible', // Changed from hidden to visible
        isolation: 'isolate', // Creates a new stacking context for better z-index handling
      }}
    >
      {/* Render position labels in a separate layer below everything */}
      {formation.positions.map((position) => (
        <div
          key={`label-${position.id}`}
          style={{
            position: 'absolute',
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -80%)', // Move label up
            zIndex: 1,
            pointerEvents: 'none' // Make completely transparent to clicks
          }}
        >
          <div 
            style={{
              background: '#333',
              color: 'white',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              pointerEvents: 'none'
            }}
          >
            {position.name}
          </div>
        </div>
      ))}
      
      {/* Render position groups with players separately */}
      {formation.positions.map((position) => (
        <PositionGroup
          key={position.id}
          position={position}
          onAddPlayer={() => openAddPlayerForm(position.id)}
          onEditPlayer={(player) => openEditPlayerForm(position.id, player)}
          onRemovePlayer={(playerId) => removePlayerFromPosition(position.id, playerId)}
        />
      ))}
    </div>
  );
};

export default FootballPitch;
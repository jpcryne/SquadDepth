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
      {/* Position labels are now handled in the PositionGroup component */}
      
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
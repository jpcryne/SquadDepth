import React from 'react';
import { Formation } from '../types';
import PositionGroup from './PositionGroup';

interface FootballPitchProps {
  formation: Formation;
  updatePlayerInPosition: (positionId: string, player: any) => void;
  removePlayerFromPosition: (positionId: string, playerId: string) => void;
}

const FootballPitch: React.FC<FootballPitchProps> = ({ 
  formation, 
  updatePlayerInPosition, 
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
      }}
    >
      {formation.positions.map((position) => (
        <PositionGroup
          key={position.id}
          position={position}
          updatePlayer={updatePlayerInPosition}
          removePlayer={removePlayerFromPosition}
        />
      ))}
    </div>
  );
};

export default FootballPitch;
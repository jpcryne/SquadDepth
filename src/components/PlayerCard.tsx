import React from 'react';
import { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  onRemove: (id: string) => void;
  onEdit: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onRemove, onEdit }) => {
  return (
    <div 
      className="player-card"
      style={{
        background: 'white',
        padding: '6px 8px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        margin: '4px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        width: '100%',
        minWidth: '100px',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 3, // Higher than position labels but lower than forms
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        marginRight: '4px',
        minWidth: '40px',
        maxWidth: '100%'
      }}>
        <strong>{player.name}</strong>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ 
          backgroundColor: '#f0f0f0', 
          padding: '2px 6px', 
          borderRadius: '10px',
          fontSize: '10px',
          marginRight: '8px',
          whiteSpace: 'nowrap'
        }}>
          £{player.wage.toLocaleString()}/wk
        </span>
        
        {/* Edit icon */}
        <div 
          onClick={() => onEdit(player)}
          style={{
            cursor: 'pointer',
            marginRight: '8px',
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4CAF50',
            fontSize: '14px'
          }}
          title="Edit player"
        >
          ✎
        </div>
        
        {/* Remove icon */}
        <div 
          onClick={() => onRemove(player.id)}
          style={{
            cursor: 'pointer',
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f44336',
            fontSize: '16px'
          }}
          title="Remove player"
        >
          ✕
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
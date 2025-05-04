import React, { useState } from 'react';
import { Player } from '../types';

interface PlayerFormProps {
  player?: Player;
  onSubmit: (player: Player) => void;
  onCancel: () => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, onSubmit, onCancel }) => {
  const [name, setName] = useState(player?.name || '');
  const [wage, setWage] = useState(player?.wage || 0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) return;
    
    onSubmit({
      id: player?.id || `player-${Date.now()}`,
      name,
      wage,
      position: player?.position || '',
      positionIndex: player?.positionIndex || 0,
    });
    
    // Reset form
    setName('');
    setWage(0);
  };
  
  return (
    <div
      style={{
        position: 'fixed', // Changed from absolute to fixed
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px', // Fixed width
        zIndex: 1000, // Even higher z-index
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)' // Add overlay
      }}
    >
      <form 
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '16px',
          borderRadius: '8px',
          width: '100%',
          border: '3px solid #4CAF50',
        }}
    >
      <div style={{ marginBottom: '8px' }}>
        <label 
          htmlFor="name"
          style={{ 
            display: 'block', 
            marginBottom: '4px',
            fontSize: '12px',
          }}
        >
          Player Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '12px',
          }}
        />
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <label 
          htmlFor="wage"
          style={{ 
            display: 'block', 
            marginBottom: '4px',
            fontSize: '12px',
          }}
        >
          Weekly Wage (£):
        </label>
        <input
          id="wage"
          type="number"
          value={wage}
          onChange={(e) => setWage(Number(e.target.value))}
          min="0"
          step="1000"
          required
          style={{
            width: '100%',
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '12px',
          }}
        />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '6px 12px',
            background: '#f0f0f0',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            padding: '6px 12px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          {player ? 'Update' : 'Add'} Player
        </button>
      </div>
    </form>
    </div>
  );
};

export default PlayerForm;
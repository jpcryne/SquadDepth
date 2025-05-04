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
    <form 
      onSubmit={handleSubmit}
      style={{
        background: 'white',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        width: '100%',
        marginTop: '8px',
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
  );
};

export default PlayerForm;
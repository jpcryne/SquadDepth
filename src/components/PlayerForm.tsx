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
  const [wageInput, setWageInput] = useState(player?.wage?.toString() || '');
  
  // Handle wage input changes
  const handleWageChange = (value: string) => {
    setWageInput(value);
    
    // Update actual wage value (as number) only if input is valid
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      // Round to nearest 100 when input changes
      const roundedValue = Math.round(numValue / 100) * 100;
      setWage(roundedValue);
    }
  };
  
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
    setWageInput('');
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        width: '100%',
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
          value={wageInput}
          onChange={(e) => handleWageChange(e.target.value)}
          min="0"
          step="100"
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
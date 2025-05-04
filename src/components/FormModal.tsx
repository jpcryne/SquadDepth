import React from 'react';
import { Player } from '../types';
import PlayerForm from './PlayerForm';

interface FormModalProps {
  player?: Player;
  onSubmit: (player: Player) => void;
  onCancel: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ player, onSubmit, onCancel }) => {
  // Stop propagation on the container to prevent clicks from closing the modal
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
      onClick={onCancel}
    >
      <div
        style={{
          width: '300px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '3px solid #4CAF50',
          padding: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
        onClick={handleContainerClick}
      >
        <h3 style={{ marginTop: 0, marginBottom: '16px', textAlign: 'center' }}>
          {player ? 'Edit Player' : 'Add Player'}
        </h3>
        <PlayerForm 
          player={player}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default FormModal;
import React from 'react';
import { Formation } from '../types';

interface FormationSelectorProps {
  formations: Formation[];
  currentFormation: Formation;
  onFormationChange: (formation: Formation) => void;
}

const FormationSelector: React.FC<FormationSelectorProps> = ({
  formations,
  currentFormation,
  onFormationChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFormationId = e.target.value;
    const selectedFormation = formations.find(f => f.id === selectedFormationId);
    
    if (selectedFormation) {
      onFormationChange(selectedFormation);
    }
  };
  
  return (
    <div style={{ marginBottom: '15px', textAlign: 'center' }}>
      <label 
        htmlFor="formation-select" 
        style={{ marginRight: '10px', fontWeight: 'bold' }}
      >
        Formation:
      </label>
      <select
        id="formation-select"
        value={currentFormation.id}
        onChange={handleChange}
        style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {formations.map(formation => (
          <option key={formation.id} value={formation.id}>
            {formation.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormationSelector;
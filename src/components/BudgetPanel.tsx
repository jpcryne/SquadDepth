import React from 'react';
import { Formation } from '../types';

interface BudgetPanelProps {
  formation: Formation;
  budget: number;
  setBudget: (budget: number) => void;
}

const BudgetPanel: React.FC<BudgetPanelProps> = ({ formation, budget, setBudget }) => {
  // Calculate total wages (converting weekly to yearly)
  const totalYearlyWages = formation.positions.reduce((total, position) => {
    const positionWages = position.players.reduce((sum, player) => sum + (player.wage * 52), 0);
    return total + positionWages;
  }, 0);
  
  // Calculate remaining budget
  const remainingBudget = budget - totalYearlyWages;
  
  // Determine if over budget
  const isOverBudget = remainingBudget < 0;
  
  return (
    <div
      className="budget-panel"
      style={{
        background: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        maxWidth: '900px',
        margin: '0 auto 20px',
      }}
    >
      <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Squad Budget</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <label 
            htmlFor="budget"
            style={{ 
              display: 'block', 
              marginBottom: '4px',
              fontWeight: 'bold',
            }}
          >
            Yearly Budget (£):
          </label>
          <input
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            min="0"
            step="10000"
            style={{
              width: '200px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>Total Yearly Wages:</span> £{totalYearlyWages.toLocaleString()}
          </div>
          <div style={{ 
            fontWeight: 'bold', 
            color: isOverBudget ? '#f44336' : '#4CAF50'
          }}>
            <span>Remaining:</span> £{remainingBudget.toLocaleString()}
          </div>
        </div>
      </div>
      
      {isOverBudget && (
        <div
          style={{
            background: '#ffebee',
            color: '#f44336',
            padding: '8px 16px',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          Warning: You are £{Math.abs(remainingBudget).toLocaleString()} over budget!
        </div>
      )}
    </div>
  );
};

export default BudgetPanel;
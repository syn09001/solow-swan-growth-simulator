
import React, { useState } from 'react';
import { SolowParams } from '../types';

interface ParameterControlsProps {
  params: SolowParams;
  onParamChange: (param: keyof SolowParams, value: number) => void;
}

const ParameterControlRow: React.FC<{
  label: string;
  paramKey: keyof SolowParams;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (param: keyof SolowParams, value: number) => void;
  description: string;
}> = ({ label, paramKey, value, min, max, step, onChange, description }) => {
  const [percentChange, setPercentChange] = useState<string>('');

  const handleApplyPercentChange = () => {
    const change = parseFloat(percentChange);
    if (isNaN(change)) return;
    
    // Calculate the new value based on the percentage change
    const newValue = value * (1 + change / 100);
    
    // Clamp the new value within the slider's min/max bounds
    const clampedValue = Math.max(min, Math.min(max, newValue));

    onChange(paramKey, clampedValue);
    setPercentChange(''); // Reset input after applying
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyPercentChange();
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label htmlFor={paramKey} className="font-medium text-sm text-gray-700 dark:text-gray-300" title={description}>
          {label} ({paramKey})
        </label>
        <span className="text-sm font-semibold text-brand-primary bg-blue-100 dark:bg-blue-900/50 dark:text-blue-200 px-2 py-1 rounded-md">
          {value.toFixed(3)}
        </span>
      </div>
      <input
        type="range"
        id={paramKey}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(paramKey, parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex items-center gap-2">
        <input
            type="number"
            value={percentChange}
            onChange={(e) => setPercentChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g. 5 or -10"
            className="w-full text-sm p-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
            aria-label={`Percentage change for ${label}`}
        />
        <button
            onClick={handleApplyPercentChange}
            className="text-sm bg-brand-secondary hover:bg-gray-600 text-white font-semibold py-1.5 px-3 rounded-md transition-colors whitespace-nowrap"
            title={`Apply a ${percentChange || '...'}% change to ${label}`}
        >
            Apply %
        </button>
      </div>
    </div>
  );
};

const ParameterControls: React.FC<ParameterControlsProps> = ({ params, onParamChange }) => {
  const parameterConfig = [
    { label: "Savings Rate", paramKey: "s", min: 0.01, max: 0.99, step: 0.01, description: "Fraction of output saved and invested." },
    { label: "Depreciation Rate", paramKey: "delta", min: 0.01, max: 0.2, step: 0.005, description: "Fraction of capital that wears out each period." },
    { label: "Population Growth", paramKey: "n", min: -0.02, max: 0.1, step: 0.005, description: "Growth rate of the labor force." },
    { label: "Technology Growth", paramKey: "g", min: 0, max: 0.1, step: 0.005, description: "Growth rate of labor efficiency (technology)." },
    { label: "Capital Share", paramKey: "alpha", min: 0.1, max: 0.8, step: 0.01, description: "Share of output attributed to capital in the production function." },
    { label: "Productivity", paramKey: "A", min: 0.5, max: 5, step: 0.1, description: "Total Factor Productivity (a scaling factor)." },
  ];

  return (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2">Model Parameters</h2>
      {parameterConfig.map(config => (
        <ParameterControlRow
          key={config.paramKey}
          label={config.label}
          paramKey={config.paramKey as keyof SolowParams}
          value={params[config.paramKey as keyof SolowParams]}
          min={config.min}
          max={config.max}
          step={config.step}
          onChange={onParamChange}
          description={config.description}
        />
      ))}
    </div>
  );
};

export default ParameterControls;

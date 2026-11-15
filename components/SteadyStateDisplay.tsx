import React from 'react';
import { SolowVars } from '../types';

interface SteadyStateDisplayProps {
  title: string;
  steadyState: SolowVars;
  className?: string;
}

const StatCard: React.FC<{ label: string; value: number, description: string }> = ({ label, value, description }) => (
  <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md text-center" title={description}>
    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{value.toFixed(3)}</p>
  </div>
);

const SteadyStateDisplay: React.FC<SteadyStateDisplayProps> = ({ title, steadyState, className }) => {
  return (
    <div className={`bg-light-card dark:bg-dark-card p-4 rounded-lg shadow border-l-4 ${className}`}>
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="k*" value={steadyState.k} description="Capital per effective worker"/>
        <StatCard label="y*" value={steadyState.y} description="Output per effective worker"/>
        <StatCard label="c*" value={steadyState.c} description="Consumption per effective worker"/>
        <StatCard label="i*" value={steadyState.i} description="Investment per effective worker"/>
        <StatCard label="w*" value={steadyState.w} description="Real wage per effective worker"/>
        <StatCard label="r*" value={steadyState.r} description="Real interest rate (net)"/>
      </div>
    </div>
  );
};

export default SteadyStateDisplay;

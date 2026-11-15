
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SolowParams, SolowVars, TimePoint } from './types';
import { useSolowModel } from './hooks/useSolowModel';
import ParameterControls from './components/ParameterControls';
import SteadyStateDisplay from './components/SteadyStateDisplay';
import SimulationChart from './components/SimulationChart';

const SIMULATION_PERIODS = 100;

const initialParams: SolowParams = {
  s: 0.30,   // Savings Rate
  delta: 0.03, // Depreciation Rate
  n: 0.01,  // Population Growth Rate
  g: 0.02,  // Technological Progress Rate
  alpha: 0.333, // Capital Share
  A: 1.0,   // Total Factor Productivity
};

function App() {
  const [params, setParams] = useState<SolowParams>(initialParams);
  const [simulationData, setSimulationData] = useState<TimePoint[]>([]);
  const [initialSteadyState, setInitialSteadyState] = useState<SolowVars | null>(null);
  const [shockedParam, setShockedParam] = useState<keyof SolowParams | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  const { calculateSteadyState, runSimulation } = useSolowModel();

  const newSteadyState = useMemo(() => calculateSteadyState(params), [params, calculateSteadyState]);

  const handleParamChange = useCallback((param: keyof SolowParams, value: number) => {
    setParams(prev => ({ ...prev, [param]: value }));
    if (!shockedParam) {
      setShockedParam(param);
    }
  }, [shockedParam]);
  
  const resetSimulation = useCallback(() => {
    setInitialSteadyState(newSteadyState);
    setShockedParam(null);
    const initialData = runSimulation(newSteadyState, params, SIMULATION_PERIODS);
    setSimulationData(initialData);
  }, [newSteadyState, params, runSimulation]);

  useEffect(() => {
    const initialSS = calculateSteadyState(initialParams);
    setInitialSteadyState(initialSS);
    const initialSimData = runSimulation(initialSS, initialParams, SIMULATION_PERIODS);
    setSimulationData(initialSimData);
    setIsSimulating(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    if (initialSteadyState) {
        setIsSimulating(true);
        const timer = setTimeout(() => {
            const data = runSimulation(initialSteadyState, params, SIMULATION_PERIODS);
            setSimulationData(data);
            setIsSimulating(false);
        }, 300); // Debounce simulation run
        return () => clearTimeout(timer);
    }
  }, [params, initialSteadyState, runSimulation]);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
      <header className="bg-light-card dark:bg-dark-card shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-brand-primary">Solow Growth Model Simulator</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Dynamically shock parameters and observe the economy's transition to a new steady state.</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <ParameterControls params={params} onParamChange={handleParamChange} />
            
            {initialSteadyState && (
              <SteadyStateDisplay 
                title="Initial Steady State" 
                steadyState={initialSteadyState} 
                className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/50"
              />
            )}
            
            {newSteadyState && (
              <SteadyStateDisplay 
                title="New Steady State Target" 
                steadyState={newSteadyState} 
                className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50"
              />
            )}
             <div className="bg-light-card dark:bg-dark-card p-4 rounded-lg shadow">
               <button
                  onClick={resetSimulation}
                  className="w-full bg-brand-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform active:scale-95 disabled:bg-gray-400"
                  disabled={!shockedParam}
                  title={!shockedParam ? "Change a parameter to enable reset" : "Set current state as the new baseline"}
                >
                  Adopt New Steady State
                </button>
                <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                  Click to make the current "New Steady State" the baseline for the next shock.
                </p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-lg relative">
              {isSimulating && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-10 rounded-lg">
                      <div className="text-center">
                          <svg className="animate-spin h-8 w-8 text-brand-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <p className="mt-2 font-semibold">Simulating...</p>
                      </div>
                  </div>
              )}
            <h2 className="text-xl font-bold mb-4 text-center">Dynamic Evolution of the Economy</h2>
            <p className="text-sm text-center mb-4 text-gray-500 dark:text-gray-400">
                {shockedParam 
                    ? `Observing transition from a shock to the '${shockedParam}' parameter introduced at t=0.`
                    : 'The economy is in a steady state. Adjust a parameter to see the effect of a shock at t=0.'
                }
            </p>
            <SimulationChart data={simulationData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

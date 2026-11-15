import { useCallback } from 'react';
import { SolowParams, SolowVars, TimePoint } from '../types';

const PRE_SHOCK_PERIODS = 20;

export function useSolowModel() {

  const calculateSteadyState = useCallback((params: SolowParams): SolowVars => {
    const { s, delta, n, g, alpha, A } = params;

    const denominator = n + g + delta;
    if (denominator <= 0 || 1 - alpha <= 0) {
      // Avoid division by zero or invalid powers
      return { k: 0, y: 0, c: 0, i: 0, w: 0, r: 0 };
    }

    const k = Math.pow((s * A) / denominator, 1 / (1 - alpha));
    const y = A * Math.pow(k, alpha);
    const i = s * y;
    const c = (1 - s) * y;
    const w = (1 - alpha) * y;
    const r = (alpha * A * Math.pow(k, alpha - 1)) - delta;


    return { k, y, c, i, w, r };
  }, []);

  const runSimulation = useCallback((initialSteadyState: SolowVars, params: SolowParams, periods: number): TimePoint[] => {
    const data: TimePoint[] = [];

    // 1. Pre-shock period: Display the initial steady state for a number of periods.
    for (let t = -PRE_SHOCK_PERIODS; t < 0; t++) {
      data.push({
        t,
        ...initialSteadyState
      });
    }

    // 2. Post-shock period: Simulate the transition from the initial steady state capital.
    const { s, delta, n, g, alpha, A } = params;
    let currentK = initialSteadyState.k;

    for (let t = 0; t < periods; t++) {
      const y = A * Math.pow(currentK, alpha);
      const i = s * y;
      const c = (1 - s) * y;
      const w = (1 - alpha) * y;
      const r = (alpha * A * Math.pow(currentK, alpha - 1)) - delta;

      data.push({ t, k: currentK, y, c, i, w, r });

      const investmentPerEffectiveWorker = s * y;
      const breakEvenInvestment = (n + g + delta) * currentK;
      const deltaK = investmentPerEffectiveWorker - breakEvenInvestment;

      currentK = currentK + deltaK;
    }

    return data;
  }, []);

  return { calculateSteadyState, runSimulation };
}

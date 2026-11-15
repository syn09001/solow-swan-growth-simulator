export interface SolowParams {
  s: number;      // Savings Rate
  delta: number;  // Depreciation Rate
  n: number;      // Population Growth Rate
  g: number;      // Technological Progress Rate
  alpha: number;  // Capital Share
  A: number;      // Total Factor Productivity
}

export interface SolowVars {
  k: number;      // Capital per effective worker
  y: number;      // Output per effective worker
  c: number;      // Consumption per effective worker
  i: number;      // Investment per effective worker
  w: number;      // Real wage per effective worker
  r: number;      // Real interest rate (net)
}

export interface TimePoint extends SolowVars {
  t: number;      // Time period
}

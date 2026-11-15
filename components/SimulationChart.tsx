import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimePoint } from '../types';

interface SimulationChartProps {
  data: TimePoint[];
}

const chartConfig = [
  { key: 'k', name: 'Capital', color: '#3b82f6' },
  { key: 'y', name: 'Output', color: '#22c55e' },
  { key: 'c', name: 'Consumption', color: '#f97316' },
  { key: 'i', name: 'Investment', color: '#a855f7' },
  { key: 'w', name: 'Real Wage', color: '#14b8a6' },
  { key: 'r', name: 'Interest Rate', color: '#ec4899' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-light-card dark:bg-dark-card p-2 shadow-lg rounded-md border border-gray-200 dark:border-gray-700">
        <p className="text-xs">{`Time: ${label}`}</p>
        <p className="text-sm font-bold" style={{ color: payload[0].color }}>
          {`${payload[0].name}: ${payload[0].value.toFixed(4)}`}
        </p>
      </div>
    );
  }
  return null;
};

const SimulationChart: React.FC<SimulationChartProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {chartConfig.map(({ key, name, color }) => (
        <div key={key} className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg">
          <h4 className="text-center font-semibold text-sm mb-2">{name} ({key})</h4>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <LineChart
                data={data}
                margin={{ top: 5, right: 10, left: -20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="t" label={{ value: 'Time', position: 'insideBottom', dy: 10 }} tick={{fontSize: 12}} />
                <YAxis domain={['auto', 'auto']} tick={{fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={key}
                  name={name}
                  stroke={color}
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimulationChart;

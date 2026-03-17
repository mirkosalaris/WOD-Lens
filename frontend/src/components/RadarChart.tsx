import React, { useState, useMemo } from 'react';
import {
  Radar,
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { CapacityProfile } from '../types/capacity';

interface ChartDataItem {
  subject: string;
  value: number;
}

interface Props {
  data: CapacityProfile | ChartDataItem[];
  title?: string;
}

const RadarChart: React.FC<Props> = ({ data, title }) => {
  const [maxScale, setMaxScale] = useState(60);

  const chartData = useMemo(() => {
    if (Array.isArray(data)) return data;
    
    return [
      { subject: 'Endurance', value: data.endurance * 100 },
      { subject: 'Stamina', value: data.stamina * 100 },
      { subject: 'Strength', value: data.strength * 100 },
      { subject: 'Flexibility', value: data.flexibility * 100 },
      { subject: 'Power', value: data.power * 100 },
      { subject: 'Speed', value: data.speed * 100 },
      { subject: 'Coordination', value: data.coordination * 100 },
      { subject: 'Agility', value: data.agility * 100 },
      { subject: 'Balance', value: data.balance * 100 },
      { subject: 'Accuracy', value: data.accuracy * 100 },
    ];
  }, [data]);

  return (
    <div className="flex flex-col items-center w-full">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div className="w-full h-80 sm:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <ReRadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, maxScale]} />
            <Radar
              name="Athlete"
              dataKey="value"
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
          </ReRadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="w-full max-w-xs mt-4 px-4">
        <label htmlFor="zoom-slider" className="block text-sm font-medium text-gray-700 mb-1">
          Zoom: {maxScale}%
        </label>
        <input
          id="zoom-slider"
          type="range"
          min="10"
          max="100"
          step="5"
          value={maxScale}
          onChange={(e) => setMaxScale(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>10%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default RadarChart;

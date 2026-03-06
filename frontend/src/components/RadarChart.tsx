import React from 'react';
import {
  Radar,
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { CapacityProfile } from '../types/capacity';

interface Props {
  data: CapacityProfile;
}

const RadarChart: React.FC<Props> = ({ data }) => {
  const chartData = [
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

  return (
    <div className="w-full h-80 sm:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <ReRadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
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
  );
};

export default RadarChart;

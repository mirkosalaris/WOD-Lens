import React, { useState, useMemo, useRef } from 'react';
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
  const [mouseRadius, setMouseRadius] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    
    // Mouse position relative to the container's top-left
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    const dx = mx - cx;
    const dy = my - cy;
    const radius = Math.sqrt(dx * dx + dy * dy);
    
    // Only show if within reasonable bounds (within the chart area)
    const maxAllowedRadius = Math.min(rect.width, rect.height) * 0.45;
    if (radius < maxAllowedRadius) {
      setMouseRadius(radius);
    } else {
      setMouseRadius(null);
    }
  };

  const handleMouseLeave = () => {
    setMouseRadius(null);
  };

  const guidePoints = useMemo(() => {
    if (mouseRadius === null) return '';
    
    const numPoints = chartData.length;
    const points = [];
    const angleStep = (2 * Math.PI) / numPoints;
    const startAngle = -Math.PI / 2;

    for (let i = 0; i < numPoints; i++) {
      const angle = startAngle + i * angleStep;
      const x = mouseRadius * Math.cos(angle);
      const y = mouseRadius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    
    return points.join(' ');
  }, [mouseRadius, chartData.length]);

  return (
    <div className="flex flex-col items-center w-full">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div 
        ref={containerRef}
        className="relative w-full h-80 sm:h-[500px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
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
        
        {mouseRadius !== null && containerRef.current && (
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
            style={{ zIndex: 10 }}
          >
            <g transform={`translate(${containerRef.current.offsetWidth / 2}, ${containerRef.current.offsetHeight / 2})`}>
              <polygon
                points={guidePoints}
                fill="none"
                stroke="#ef4444"
                strokeWidth="1"
                strokeDasharray="4 2"
                className="opacity-70"
              />
            </g>
          </svg>
        )}
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

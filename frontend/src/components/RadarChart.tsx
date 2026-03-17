import React, { useState, useMemo, useRef } from 'react';
import {
  Radar,
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Customized,
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
  const chartId = useMemo(() => `radar-clip-${Math.random().toString(36).substr(2, 9)}`, []);

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
    if (mouseRadius === null) return { points: '', value: 0 };
    
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
    
    // Calculate the value based on the mouse radius
    // Recharts outerRadius="80%" means 80% of min(width, height) / 2 = 0.4 * min(width, height)
    let value = 0;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const chartMaxRadius = Math.min(rect.width, rect.height) * 0.4;
      value = (mouseRadius / chartMaxRadius) * maxScale;
    }

    return { points: points.join(' '), value };
  }, [mouseRadius, chartData.length, maxScale]);

  // Custom component to define the clip path using Recharts internal coordinates
  const RenderClipPath = (props: any) => {
    const { cx, cy, outerRadius, width, height } = props;
    
    // Safety check and parsing for percentage strings
    const parseCoord = (val: any, size: number) => {
      if (typeof val === 'string' && val.endsWith('%')) {
        return (parseFloat(val) / 100) * size;
      }
      return typeof val === 'number' ? val : 0;
    };

    const centerX = parseCoord(cx, width);
    const centerY = parseCoord(cy, height);
    const radius = typeof outerRadius === 'string' && outerRadius.endsWith('%')
      ? (parseFloat(outerRadius) / 100) * (Math.min(width, height) / 2)
      : (typeof outerRadius === 'number' ? outerRadius : 0);

    if (radius <= 0) return null;

    const numPoints = chartData.length;
    const points = [];
    const angleStep = (2 * Math.PI) / numPoints;
    const startAngle = -Math.PI / 2;

    for (let i = 0; i < numPoints; i++) {
      const angle = startAngle + i * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    return (
      <defs>
        <clipPath id={chartId}>
          <polygon points={points.join(' ')} />
        </clipPath>
      </defs>
    );
  };

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
            <Customized component={RenderClipPath} />
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, maxScale]} 
              allowDataOverflow={true}
              axisLine={false}
              tick={true}
            />
            <Radar
              name="Athlete"
              dataKey="value"
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.6}
              isAnimationActive={false} // Disable animation to prevent clipping issues during transition
              className="radar-path"
              style={{ clipPath: `url(#${chartId})` }}
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
                points={guidePoints.points}
                fill="none"
                stroke="#ef4444"
                strokeWidth="1"
                strokeDasharray="4 2"
                className="opacity-70"
              />
              <text
                x="0"
                y={-mouseRadius - 10}
                textAnchor="middle"
                fill="#ef4444"
                className="text-xs font-bold"
              >
                {guidePoints.value.toFixed(1)}%
              </text>
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

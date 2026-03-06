import React, { useState, useEffect } from 'react';
import RadarChart from '../components/RadarChart';
import UploadPanel from '../components/UploadPanel';
import InsightCard from '../components/InsightCard';
import { getAnalysis } from '../api/client';
import { CapacityProfile } from '../types/capacity';
import { Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<CapacityProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAnalysis();
      // Only set data if there's at least one non-zero value
      const hasData = Object.values(result).some(v => v > 0);
      if (hasData) {
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">WOD Lens</h1>
          <p className="text-slate-500 font-medium">Analyze your General Physical Skills</p>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Upload & Insights */}
        <div className="space-y-6">
          <UploadPanel onUploadSuccess={fetchData} />
          <InsightCard hasData={!!data} />
        </div>

        {/* Right Column: Radar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 text-center">Physical Capacity Profile</h2>
          {loading ? (
            <div className="h-80 flex items-center justify-center text-slate-500">
              Refreshing chart...
            </div>
          ) : data ? (
            <RadarChart data={data} />
          ) : (
            <div className="h-80 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
              <p>No data available yet.</p>
              <p className="text-sm">Upload an Excel file to see your profile.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { getAIInsight } from '../api/client';
import { Sparkles, Loader2, MessageCircle } from 'lucide-react';

interface Props {
  hasData: boolean;
}

const InsightCard: React.FC<Props> = ({ hasData }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    setLoading(true);
    try {
      const res = await getAIInsight();
      setInsight(res.insight);
    } catch (err) {
      setInsight('Could not generate insights at this time.');
    } finally {
      setLoading(false);
    }
  };

  if (!hasData) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6 overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          Coach Insights
        </h2>
        {!insight && !loading && (
          <button
            onClick={fetchInsight}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Generate AI Analysis
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-8 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mb-2" />
          <p>Analyzing your performance...</p>
        </div>
      ) : insight ? (
        <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex gap-3">
          <MessageCircle className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
          <p className="text-slate-700 leading-relaxed italic">{insight}</p>
        </div>
      ) : (
        <p className="text-slate-500">Click the button to get a professional analysis of your training balance.</p>
      )}
    </div>
  );
};

export default InsightCard;

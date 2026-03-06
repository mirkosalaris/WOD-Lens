import React, { useState } from 'react';
import { uploadExcel } from '../api/client';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  onUploadSuccess: () => void;
}

const UploadPanel: React.FC<Props> = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await uploadExcel(file);
      setSuccess(res.message);
      onUploadSuccess();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5" />
        Upload Workout Data
      </h2>
      
      <div className="relative group cursor-pointer">
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
          disabled={loading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${loading ? 'bg-slate-50 border-slate-300' : 'bg-blue-50/30 border-blue-200 group-hover:border-blue-400 group-hover:bg-blue-50/50'}
        `}>
          {loading ? (
            <p className="text-slate-600 animate-pulse">Processing file...</p>
          ) : (
            <>
              <p className="text-slate-600 font-medium">Click to select or drag and drop</p>
              <p className="text-slate-400 text-sm mt-1">Excel files (.xlsx, .xls, .csv)</p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md flex items-center gap-2 text-green-700 text-sm">
          <CheckCircle2 className="w-4 h-4" />
          {success}
        </div>
      )}
    </div>
  );
};

export default UploadPanel;

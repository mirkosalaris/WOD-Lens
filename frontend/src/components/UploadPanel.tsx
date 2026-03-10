import React, { useState } from 'react';
import { uploadExcel, uploadUrl } from '../api/client';
import { Upload, CheckCircle2, AlertCircle, Link as LinkIcon } from 'lucide-react';

interface Props {
  onUploadSuccess: () => void;
}

const UploadPanel: React.FC<Props> = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sheetUrl, setSheetUrl] = useState('');

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

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sheetUrl) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await uploadUrl(sheetUrl);
      setSuccess(res.message);
      onUploadSuccess();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error loading Google Sheet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5" />
        Data Source
      </h2>
      
      <div className="space-y-6">
        {/* File Upload */}
        <div className="relative group cursor-pointer">
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
            disabled={loading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${loading ? 'bg-slate-50 border-slate-300' : 'bg-blue-50/30 border-blue-200 group-hover:border-blue-400 group-hover:bg-blue-50/50'}
          `}>
            {loading ? (
              <p className="text-slate-600 animate-pulse">Processing...</p>
            ) : (
              <>
                <p className="text-slate-600 font-medium">Click to upload file</p>
                <p className="text-slate-400 text-sm mt-1">Excel or CSV</p>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500 uppercase font-semibold">or</span>
          </div>
        </div>

        {/* URL Upload */}
        <form onSubmit={handleUrlSubmit} className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
            <LinkIcon className="w-4 h-4" />
            Google Sheets URL
          </div>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !sheetUrl}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Load
            </button>
          </div>
          <p className="text-xs text-slate-400">Make sure the sheet is shared as "Anyone with the link can view"</p>
        </form>
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

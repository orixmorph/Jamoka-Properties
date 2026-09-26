import React, { useState } from 'react';
import { useProjects } from '../context/ProjectsContext';
import {
  Database,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  KeyRound,
  Server,
  RefreshCw,
  HelpCircle,
  Image as ImageIcon,
} from 'lucide-react';

interface BaserowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BaserowModal: React.FC<BaserowModalProps> = ({ isOpen, onClose }) => {
  const {
    isBaserowConnected,
    baserowConfig,
    saveAndConnectBaserow,
    disconnectBaserow,
    refreshProjects,
    projects,
    isLoading,
  } = useProjects();

  const [apiUrl, setApiUrl] = useState(baserowConfig.apiUrl || 'https://api.baserow.io');
  const [tableId, setTableId] = useState(baserowConfig.tableId || '1222838');
  const [token, setToken] = useState(baserowConfig.token || '');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [activeTab, setActiveTab] = useState<'connect' | 'schema'>('connect');

  React.useEffect(() => {
    if (baserowConfig.tableId) setTableId(baserowConfig.tableId);
    if (baserowConfig.token) setToken(baserowConfig.token);
    if (baserowConfig.apiUrl) setApiUrl(baserowConfig.apiUrl);
  }, [baserowConfig]);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableId.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your Baserow Table ID.' });
      return;
    }

    setIsTesting(true);
    setStatusMessage({ type: 'info', text: 'Verifying table connection with Baserow...' });

    const result = await saveAndConnectBaserow({
      apiUrl: apiUrl.trim(),
      tableId: tableId.trim(),
      token: token.trim(),
    });

    setIsTesting(false);
    if (result.success) {
      setStatusMessage({
        type: 'success',
        text: result.message || 'Connected successfully! Project listings updated.',
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: result.message || 'Could not connect. Please check Table ID, Token, and permissions.',
      });
    }
  };

  const handleDisconnect = () => {
    disconnectBaserow();
    setTableId('');
    setToken('');
    setStatusMessage({
      type: 'info',
      text: 'Switched back to default showcase projects.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-neutral-200 text-slate-900 font-jakarta">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#CFA55A]/20 border border-[#CFA55A]/40 flex items-center justify-center text-[#CFA55A]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Baserow Database Integration</span>
                {isBaserowConnected ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Live Connected
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Built-in Catalog
                  </span>
                )}
              </h3>
              <p className="text-xs text-neutral-300 font-light mt-0.5">
                Connect your live Baserow table to feed off-plan projects, cover photos & hero images.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-200 px-6 pt-3 bg-neutral-50/70 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('connect')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'connect'
                ? 'border-[#CFA55A] text-slate-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Connection Settings
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'border-[#CFA55A] text-slate-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>Table Columns & Schema Guide</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === 'connect' && (
            <form onSubmit={handleSave} className="space-y-4">
              {/* Status Alert */}
              {statusMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : statusMessage.type === 'error'
                      ? 'bg-red-50 border border-red-200 text-red-800'
                      : 'bg-blue-50 border border-blue-200 text-blue-800'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Status Banner */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block">
                    Active Catalog
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {isBaserowConnected
                      ? `Baserow Table #${baserowConfig.tableId} (${projects.length} Projects loaded)`
                      : `Default Curated Showcase (${projects.length} Projects loaded)`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      setIsTesting(true);
                      await refreshProjects();
                      setIsTesting(false);
                      setStatusMessage({
                        type: 'success',
                        text: 'Listings reloaded successfully from Baserow!',
                      });
                    }}
                    disabled={isTesting || isLoading}
                    className="px-3 py-1.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                    title="Reload listings directly from Baserow table"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#CFA55A] ${isTesting || isLoading ? 'animate-spin' : ''}`} />
                    <span>Reload Data</span>
                  </button>
                  {isBaserowConnected && (
                    <button
                      type="button"
                      onClick={handleDisconnect}
                      className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Disconnect
                    </button>
                  )}
                </div>
              </div>

              {/* Table ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Baserow Table ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={tableId}
                    onChange={(e) => setTableId(e.target.value)}
                    placeholder="e.g. 123456"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CFA55A]/50 bg-white"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Found in your Baserow URL: <code className="bg-neutral-100 px-1 py-0.5 rounded text-slate-700">baserow.io/database/[db_id]/table/<strong>[TABLE_ID]</strong></code>
                </p>
              </div>

              {/* Database Token */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#CFA55A]" />
                    <span>Database API Token</span>
                  </span>
                  <span className="text-[11px] font-normal text-slate-500">Optional if table is public</span>
                </label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="e.g. YOUR_BASEROW_DATABASE_TOKEN"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CFA55A]/50 bg-white"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Generate in Baserow: <em>User Settings → Database Tokens → Create Token</em> with Read permissions.
                </p>
              </div>

              {/* API URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-slate-400" />
                  <span>Baserow API Host</span>
                </label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://api.baserow.io"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CFA55A]/50 bg-white"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Leave as <code className="bg-neutral-100 px-1 rounded">https://api.baserow.io</code> unless self-hosting.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isTesting || isLoading}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#CFA55A]" />
                      <span>Testing Connection...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#CFA55A]" />
                      <span>Save & Connect Database</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#CFA55A]/30 text-slate-800">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-1">
                  <ImageIcon className="w-4 h-4 text-[#CFA55A]" />
                  <span>Two Separate Images Support</span>
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  As requested, your Baserow database supports two separate images for each project:
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-700">
                  <li>
                    <strong className="text-slate-900">CoverPhoto:</strong> Image displayed on the card in the listing grid.
                  </li>
                  <li>
                    <strong className="text-slate-900">HeroImage:</strong> High-resolution banner image displayed when clicking and opening the detail window.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Recommended Baserow Table Columns
                </h4>
                <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-100/90 text-slate-700 font-bold border-b border-neutral-200">
                        <th className="py-2.5 px-3">Column Name</th>
                        <th className="py-2.5 px-3">Field Type</th>
                        <th className="py-2.5 px-3">Example Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 text-slate-700">
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Name</td>
                        <td className="py-2 px-3 text-slate-500">Single line text</td>
                        <td className="py-2 px-3">The Palm Royal Mirage</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Developer</td>
                        <td className="py-2 px-3 text-slate-500">Single line text</td>
                        <td className="py-2 px-3">Nakheel / Emaar Properties</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Location</td>
                        <td className="py-2 px-3 text-slate-500">Single line text</td>
                        <td className="py-2 px-3">Palm Jumeirah / Downtown Dubai</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">PriceAED</td>
                        <td className="py-2 px-3 text-slate-500">Number / Text</td>
                        <td className="py-2 px-3">2850000</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">PaymentPlan</td>
                        <td className="py-2 px-3 text-slate-500">Single line text</td>
                        <td className="py-2 px-3">60 / 40 Handover</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Handover</td>
                        <td className="py-2 px-3 text-slate-500">Single line text</td>
                        <td className="py-2 px-3">Q4 2027</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Bedrooms</td>
                        <td className="py-2 px-3 text-slate-500">Single line text</td>
                        <td className="py-2 px-3">1 - 4 Bed Residences</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Area</td>
                        <td className="py-2 px-3 text-slate-500">Single line text</td>
                        <td className="py-2 px-3">1,200 – 4,800 sq.ft</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Tagline</td>
                        <td className="py-2 px-3 text-slate-500">Single line text</td>
                        <td className="py-2 px-3">Sky Suites / Waterfront Living</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">CoverPhoto</td>
                        <td className="py-2 px-3 text-slate-500">File Attachment or URL</td>
                        <td className="py-2 px-3">Card cover image</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">HeroImage</td>
                        <td className="py-2 px-3 text-slate-500">File Attachment or URL</td>
                        <td className="py-2 px-3">Modal hero banner image</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Badge</td>
                        <td className="py-2 px-3 text-slate-500">Single line text</td>
                        <td className="py-2 px-3">WATERFRONT / NEW LAUNCH</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Description</td>
                        <td className="py-2 px-3 text-slate-500">Long text</td>
                        <td className="py-2 px-3">Private beachfront sanctuaries...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

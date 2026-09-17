import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Briefcase,
  MapPin,
  Loader2,
  Sparkles,
  User,
  Mail,
  Phone,
  Link2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { JobPosition } from '../data/careersData';
import { submitCareerApplication } from '../utils/careersGoogleSheet';

interface JobApplicationModalProps {
  position: JobPosition;
  isOpen: boolean;
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  position,
  isOpen,
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    residencyStatus: 'UAE Resident',
    portfolioOrCvUrl: '',
    coverNote: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.portfolioOrCvUrl.trim()) {
      setErrorMessage('Please provide a link to your CV or portfolio.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    await submitCareerApplication({
      positionTitle: position.title,
      department: position.department,
      location: position.location,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      residencyStatus: formData.residencyStatus,
      portfolioOrCvUrl: formData.portfolioOrCvUrl,
      coverNote: formData.coverNote,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      residencyStatus: 'UAE Resident',
      portfolioOrCvUrl: '',
      coverNote: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-[#0A0E17] text-white px-6 sm:px-8 py-6 relative">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#CFA55A] text-xs font-bold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Jamoka Properties</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif text-white tracking-tight">
            Apply: {position.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2 font-light">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#CFA55A]" />
              {position.department}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#CFA55A]" />
              {position.location}
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">{position.type}</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Application Submitted Successfully
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you for applying for the <strong className="text-slate-900">{position.title}</strong> role.
                  Your candidate details and link have been logged directly with our hiring desk. Our talent acquisition team will review your profile and reach out directly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 text-xs text-slate-600 max-w-md mx-auto flex items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Fast-Track Contact</span>
                  <span className="font-semibold text-slate-800">Jamoka Talent & Advisory Desk</span>
                </div>
                <a
                  href={`https://wa.me/971588648093?text=Hello%20Jamoka%20Properties,%20I%20have%20submitted%20my%20application%20for%20the%20${encodeURIComponent(position.title)}%20position.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Sarah Al Mansoori"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Residency / Location Status *
                  </label>
                  <select
                    name="residencyStatus"
                    value={formData.residencyStatus}
                    onChange={(e) => setFormData({ ...formData, residencyStatus: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs text-slate-700"
                  >
                    <option value="UAE Resident">UAE Resident (Ready to start)</option>
                    <option value="UAE Golden Visa Holder">UAE Golden Visa Holder</option>
                    <option value="Currently in Dubai on Visit Visa">Currently in Dubai (Visit Visa)</option>
                    <option value="GCC Resident">GCC Resident</option>
                    <option value="International (Looking to Relocate)">International Candidate (Relocating to Dubai)</option>
                  </select>
                </div>
              </div>

              {/* Link to CV / Portfolio / LinkedIn with privacy advisory */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Link to CV / Portfolio / LinkedIn *
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-[#CFA55A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="url"
                    name="portfolioOrCvUrl"
                    required
                    value={formData.portfolioOrCvUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioOrCvUrl: e.target.value })}
                    placeholder="https://drive.google.com/... or https://linkedin.com/in/... or portfolio link"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs"
                  />
                </div>

                {/* Clear advisory reminder for applicants */}
                <div className="mt-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed text-amber-900 font-medium">
                    <span>Important: </span>
                    <span className="font-normal text-amber-800">
                      If sharing a <strong>Google Drive</strong>, <strong>Dropbox</strong>, or cloud storage link to your CV, please ensure access is set to <strong>&ldquo;Anyone with the link can view&rdquo;</strong> (not private) so our recruitment team can view your credentials.
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Brief Introduction & Why Jamoka Properties (Optional)
                </label>
                <textarea
                  name="coverNote"
                  rows={3}
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  placeholder="Tell us briefly about your experience, achievements, or why you'd like to join our Dubai team..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-slate-400 font-light flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#CFA55A] shrink-0" />
                  <span>Confidential submission directly to Jamoka HR.</span>
                </p>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-slate-600 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 sm:w-auto px-7 py-3 rounded-xl bg-[#CFA55A] hover:bg-[#b8914b] text-[#0A0E17] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

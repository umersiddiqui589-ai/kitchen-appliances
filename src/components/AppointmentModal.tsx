import React, { useState } from 'react';
import { X, Check, Calendar, Clock, MapPin, Shield } from 'lucide-react';
import { WATCHES } from '../data/watches';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultWatchId?: string;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  defaultWatchId = 'cz-5711-g',
}: AppointmentModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    atelier: 'Geneva Flagship (Rue du Rhône 42)',
    watchId: defaultWatchId,
    consultationType: 'in_person',
    preferredDate: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill out your name and email address.');
      return;
    }

    try {
      const appointments = JSON.parse(localStorage.getItem('clofa_appointments') || '[]');
      appointments.push({
        ...formData,
        id: `APT-${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('clofa_appointments', JSON.stringify(appointments));
    } catch {
      // ignore
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-white/20 text-white shadow-2xl p-6 sm:p-8 text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
              Private Client Services
            </span>
            <h3 className="text-xl font-serif font-normal text-white mt-0.5">
              Request VIP Boutique Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 bg-[#C5A880]/20 border border-[#C5A880] rounded-full flex items-center justify-center mx-auto text-[#C5A880]">
              <Check className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-serif text-white">Consultation Reserved</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Thank you, {formData.name}. Our Head of Private Horology will contact you shortly to confirm your champagne tasting and timepiece presentation.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Eleanor Sinclair"
                  className="w-full px-3 py-2.5 bg-black border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.sinclair@domain.com"
                  className="w-full px-3 py-2.5 bg-black border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">
                  Telephone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+41 22 819 0900"
                  className="w-full px-3 py-2.5 bg-black border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">
                  Timepiece of Interest
                </label>
                <select
                  value={formData.watchId}
                  onChange={(e) => setFormData({ ...formData, watchId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-black border border-white/20 text-white focus:outline-none focus:border-[#C5A880]"
                >
                  {WATCHES.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.reference})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">
                Preferred Boutique Atelier
              </label>
              <select
                value={formData.atelier}
                onChange={(e) => setFormData({ ...formData, atelier: e.target.value })}
                className="w-full px-3 py-2.5 bg-black border border-white/20 text-white focus:outline-none focus:border-[#C5A880]"
              >
                <option value="Geneva Flagship (Rue du Rhône 42)">Geneva Flagship — Rue du Rhône 42</option>
                <option value="Milan Salon (Via Montenapoleone 8)">Milan Salon — Via Montenapoleone 8</option>
                <option value="New York Private Suite (5th Avenue)">New York Private Suite — 5th Avenue</option>
                <option value="Tokyo Ginza Atelier (Chuo City)">Tokyo Ginza Atelier — Chuo City</option>
                <option value="Virtual High-Def Horology Consultation">Virtual High-Definition Video Consultation</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">
                Specific Requests or Bespoke Inquiries
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention desired engraving, wrist sizing, or specific calibers..."
                className="w-full px-3 py-2 bg-black border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C5A880] transition-colors"
              >
                Request Private Appointment
              </button>
            </div>

            <p className="text-[10px] text-zinc-500 text-center font-mono">
              Strict client confidentiality guaranteed under Swiss banking & data standards.
            </p>
          </form>
        )}

      </div>
    </div>
  );
}

import React from 'react';
import { ShieldCheck, Clock, MapPin, Sparkles, Award } from 'lucide-react';

interface AboutProps {
  onOpenAppointment: () => void;
}

export default function About({ onOpenAppointment }: AboutProps) {
  const heritageMilestones = [
    { year: '1888', label: 'Geneva Atelier Founded', detail: 'Established on the banks of Lake Geneva as an independent complications workshop.' },
    { year: '1934', label: 'First Sovereign Caliber', detail: 'Patented high-torque mainspring system with integrated shock resistance.' },
    { year: '1976', label: 'The Emerald Dial Era', detail: 'Debuted the signature sunburst green dial with horizontal architectural fluting.' },
    { year: '2026', label: 'Contemporary Horizons', detail: 'Harmonizing micro-silicon chronometry with hand-burnished haute horlogerie.' },
  ];

  const pillars = [
    {
      icon: Clock,
      value: '240+',
      unit: 'Hours',
      label: 'Manual Assembly',
      desc: 'Each caliber regulated by an individual master horologist.',
    },
    {
      icon: Award,
      value: '100%',
      unit: 'Geneva',
      label: 'Swiss Certified',
      desc: 'Strict adherence to historical Poinçon de Genève standards.',
    },
    {
      icon: ShieldCheck,
      value: '5 Yr',
      unit: 'Warranty',
      label: 'Global Protection',
      desc: 'Complimentary international maintenance and chronometry checks.',
    },
    {
      icon: Sparkles,
      value: 'Limitée',
      unit: 'Edition',
      label: 'Numbered Timepieces',
      desc: 'Strictly capped production to preserve heirloom exclusivity.',
    },
  ];

  return (
    <section id="about" className="bg-[#FFFFFF] text-zinc-950 py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Brand Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-[#A8895B] font-semibold">
              The Maison Heritage
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight uppercase text-zinc-950 font-normal leading-tight">
              A DESTINATION FOR TRUE CONNOISSEURS
            </h2>
            <div className="w-12 h-[2px] bg-[#A8895B]" />
          </div>

          <div className="lg:col-span-7 space-y-6 text-zinc-600 font-sans text-sm sm:text-base leading-relaxed text-left">
            <p>
              At <strong className="text-zinc-900 font-semibold">CLOFA ZANCAN</strong>, time is treated not as a fleeting metric, but as an enduring canvas of human artistry. Founded upon an uncompromising quest for aesthetic purity and micro-mechanical precision, our manufacture brings together generations of master watchmakers.
            </p>
            <p>
              Every timepiece bearing the CLOFA ZANCAN signature is conceived, machined, finished, and regulated within our independent workshops overlooking Lake Geneva. From hand-burnished anglage to bespoke case architecture, we create heirlooms engineered to outlast lifetimes.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs uppercase font-mono tracking-wider text-zinc-500">
              <span className="flex items-center gap-1.5 text-zinc-800">
                <MapPin className="w-3.5 h-3.5 text-[#A8895B]" />
                Rue du Rhône 42, Geneva
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-zinc-800">
                <MapPin className="w-3.5 h-3.5 text-[#A8895B]" />
                Via Montenapoleone 8, Milan
              </span>
            </div>
          </div>
        </div>

        {/* Quantified Rigor Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-zinc-200">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-2 text-left">
                <Icon className="w-5 h-5 text-[#A8895B] mb-3" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-serif font-normal text-zinc-950 tabular-nums">
                    {item.value}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-600">
                    {item.unit}
                  </span>
                </div>
                <h4 className="text-xs uppercase font-semibold tracking-wider text-zinc-900">
                  {item.label}
                </h4>
                <p className="text-xs text-zinc-600 leading-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Heritage Timeline Strip */}
        <div className="mt-20 space-y-8">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-700 font-mono">
              Atelier Milestones
            </h3>
            <span className="text-xs text-zinc-600 font-mono">1888 — Present</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {heritageMilestones.map((m, i) => (
              <div key={i} className="space-y-2 text-left">
                <span className="text-2xl font-serif text-[#A8895B] font-light">
                  {m.year}
                </span>
                <h4 className="text-sm font-semibold text-zinc-900">
                  {m.label}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Appointment Banner */}
        <div className="mt-20 p-8 sm:p-12 bg-zinc-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] uppercase font-mono tracking-widest text-[#C5A880]">
              Private Salon Experience
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
              Experience the Collection in Person
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Schedule a private, one-on-one consultation with our senior horological advisors at our Geneva, Milan, London, or New York boutiques.
            </p>
          </div>
          <button
            onClick={onOpenAppointment}
            className="px-8 py-4 bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C5A880] transition-colors whitespace-nowrap shadow-xl"
          >
            Schedule VIP Consultation
          </button>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { CRAFTSMANSHIP_HERO_IMAGE, CRAFTSMANSHIP_PILLARS } from '../data/watches';
import { Award, Compass, Cpu, Layers, Sparkles } from 'lucide-react';

interface CraftsmanshipProps {
  onScheduleAtelierVisit: () => void;
}

export default function Craftsmanship({ onScheduleAtelierVisit }: CraftsmanshipProps) {
  const [activeTab, setActiveTab] = useState<'finishing' | 'movement' | 'materials'>('finishing');

  const technicalDetails = {
    finishing: {
      title: 'Haute Horlogerie Anglage & Black Polish',
      description: 'The sharpest interior angles cannot be cut by any CNC machine. Each component is chamfered by hand with diamond files, then burnished with gentian wood sticks grown in the Swiss Jura mountains.',
      specs: [
        { label: 'Bevel Angle', value: 'Strict 45° Chamfer' },
        { label: 'Surface Finish', value: 'Black Mirror Polish' },
        { label: 'Tolerances', value: '±0.002 mm Precision' },
        { label: 'Hours Dedicated', value: '240+ Hand Hours' },
      ],
    },
    movement: {
      title: 'Free-Sprung Gyromax Balance & Caliber Architecture',
      description: 'Operating at 4 Hz (28,800 vibrations per hour), our balance wheel utilizes adjustable inertia gold collets rather than an index regulator, ensuring extreme resistance to shock and positional variance.',
      specs: [
        { label: 'Escapement', value: 'Swiss Lever with Ruby Pallets' },
        { label: 'Hairspring', value: 'Antimagnetic Silinvar®' },
        { label: 'Chronometry', value: '-1 / +2 seconds per day' },
        { label: 'Jewels', value: '30 Synthetic Rubies' },
      ],
    },
    materials: {
      title: 'Metallurgy of Surgical Steel & Fairmined 18K Gold',
      description: 'Forged under vacuum to eliminate microscopic porosity. The case geometry features contrasting radial satin brushing on the bezel and mirror-polished flanks that sculpt light around the wrist.',
      specs: [
        { label: 'Stainless Steel', value: '316L Surgical Grade' },
        { label: 'Gold Purity', value: '18K 750‰ Solid Gold' },
        { label: 'Crystal Hardness', value: 'Mohs 9 (Corundum Sapphire)' },
        { label: 'Coating', value: 'Dual Nanoscale Anti-Glare' },
      ],
    },
  };

  return (
    <section id="craftsmanship" className="bg-black text-white py-24 sm:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#C5A880]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
            <span>Manufacture d'Horlogerie</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase font-normal text-white">
            THE ART OF HAUTE HORLOGERIE
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Every CLOFA ZANCAN timepiece is born at the confluence of micro-mechanical engineering and artisanal human sculpture.
          </p>
        </div>

        {/* Hero Atelier Visual & Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left: Atmospheric Atelier Photo */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={CRAFTSMANSHIP_HERO_IMAGE}
                alt="Master Swiss watchmaker assembling a luxury movement at workbench"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-zinc-300">
                <span className="font-mono tracking-wider text-[#C5A880]">GENEVA ATELIER WORKBENCH N° 4</span>
                <span className="font-mono text-zinc-400">100% HAND ASSEMBLED</span>
              </div>
            </div>

            {/* Inset Quote Badge */}
            <div className="mt-4 p-4 bg-zinc-950 border border-white/10 flex items-center gap-4 text-left">
              <Award className="w-8 h-8 text-[#C5A880] shrink-0" />
              <p className="text-xs text-zinc-300 italic font-serif">
                "A true luxury timepiece is not measured solely in seconds, but in the patience and soul invested by the artisan who gave it life."
              </p>
            </div>
          </div>

          {/* Right: The 3 Pillars of Craftsmanship */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {CRAFTSMANSHIP_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="border-b border-white/10 pb-6 group"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-xs font-mono tracking-widest text-[#C5A880] font-bold">
                    {pillar.number}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif text-white group-hover:text-[#C5A880] transition-colors">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  {pillar.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Interactive Horological Caliber Explorer */}
        <div className="bg-zinc-950 border border-white/10 p-8 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-[11px] uppercase font-mono tracking-widest text-[#C5A880]">
                Caliber Technical Dossier
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-white mt-1">
                Engineering Invariants & Material Science
              </h3>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 p-1 bg-black border border-white/10">
              <button
                onClick={() => setActiveTab('finishing')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === 'finishing'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Hand Finishing
              </button>
              <button
                onClick={() => setActiveTab('movement')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === 'movement'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Kinetic Caliber
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === 'materials'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Metallurgy
              </button>
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-6 space-y-4">
              <h4 className="text-lg sm:text-xl font-serif text-white">
                {technicalDetails[activeTab].title}
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                {technicalDetails[activeTab].description}
              </p>
              <div className="pt-4">
                <button
                  onClick={onScheduleAtelierVisit}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A880] hover:text-white transition-colors"
                >
                  <span>Book Private Atelier Tour</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {technicalDetails[activeTab].specs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-black/60 border border-white/5 hover:border-white/20 transition-colors"
                >
                  <p className="text-[11px] uppercase font-mono tracking-wider text-zinc-500">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-zinc-100 mt-1">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

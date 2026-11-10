import React, { useState } from 'react';
import { ArrowUpRight, Compass, ShieldCheck, Sparkles, ZoomIn } from 'lucide-react';
import { WATCH_HERO_IMAGE } from '../data/watches';
import { Watch } from '../types/watch';

interface HeroProps {
  heroWatch: Watch;
  onExploreClick: () => void;
  onDiscoverMoreClick: () => void;
  onViewWatchDetails: (watch: Watch) => void;
}

export default function Hero({
  heroWatch,
  onExploreClick,
  onDiscoverMoreClick,
  onViewWatchDetails,
}: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#000000] text-white flex items-center pt-24 pb-16 lg:py-0 overflow-hidden"
    >
      {/* Subtle luxury ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#c5a880]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle geometric precision grid line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            {/* Subtle editorial kicker */}
            <div className="inline-flex items-center gap-3 text-xs tracking-[0.3em] text-[#C5A880] uppercase font-medium">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span>Haute Horlogerie Suisse</span>
              <span className="w-2 h-[1px] bg-[#C5A880]/50" />
              <span>Ref. 5711/CZ</span>
            </div>

            {/* Large elegant serif headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight font-normal text-white uppercase leading-[1.08] text-balance">
                TIMELESS <br />
                <span className="italic font-light text-zinc-300">ELEGANCE</span>
              </h1>
              
              {/* Supporting headline */}
              <p className="text-lg sm:text-xl font-sans font-light tracking-wide text-zinc-300">
                Where precision meets extraordinary design.
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-xl">
              Discover an exclusive collection of exceptional timepieces crafted for those who appreciate timeless luxury. Sculpted in Geneva from surgical steel and high-frequency calibers.
            </p>

            {/* Dual CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreClick}
                className="group relative px-8 py-4 bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] rounded-none hover:bg-[#C5A880] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onDiscoverMoreClick}
                className="group px-8 py-4 bg-transparent border border-white/30 text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-none hover:border-white hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>DISCOVER MORE</span>
                <Compass className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Horological hallmarks metadata */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono">Caliber</p>
                <p className="text-sm font-medium text-zinc-200 mt-1">CZ-26-330 SC</p>
                <p className="text-xs text-zinc-500">28,800 vph</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono">Dial Motif</p>
                <p className="text-sm font-medium text-zinc-200 mt-1">Olive Sunburst</p>
                <p className="text-xs text-zinc-500">Horizontal Grooves</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono">Certification</p>
                <p className="text-sm font-medium text-zinc-200 mt-1">Geneva Seal</p>
                <p className="text-xs text-[#C5A880]">100% Swiss Made</p>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Green-Dial Luxury Watch Hero Image */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Subtle radial aura and pedestal reflection */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-emerald-600/15 via-[#C5A880]/15 to-transparent blur-3xl -z-10" />
            <div className="absolute bottom-6 w-3/4 h-8 bg-black/80 blur-xl rounded-full -z-10" />

            <div
              className="relative group cursor-pointer max-w-[500px] w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => onViewWatchDetails(heroWatch)}
            >
              {/* Product Card Container */}
              <div className="relative rounded-2xl p-4 sm:p-6 bg-gradient-to-b from-zinc-900/40 via-black to-black border border-white/10 shadow-2xl backdrop-blur-sm transition-transform duration-500 ease-out hover:scale-[1.01]">
                
                {/* Watch Image Presentation */}
                <div className="relative aspect-square w-full flex items-center justify-center overflow-hidden rounded-xl bg-black">
                  <img
                    src={WATCH_HERO_IMAGE}
                    alt="Clofa Zancan Sovereign Olive Green Dial Luxury Watch"
                    referrerPolicy="no-referrer"
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] transition-all duration-700 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    } ${isHovered ? 'scale-105' : 'scale-100'}`}
                  />

                  {/* Fallback container if image is loading */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                      <div className="w-12 h-12 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {/* Subtle interactive hover badge */}
                  <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Inspect Horology</span>
                  </div>
                </div>

                {/* Floating caption under hero watch */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-left">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">Signature Piece</span>
                    <h3 className="text-sm sm:text-base font-serif text-white font-medium">Sovereign Emerald Olive</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">Available</span>
                    <p className="text-sm font-semibold text-zinc-100 tabular-nums">$54,500 USD</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom section divider indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-[10px] uppercase tracking-[0.25em] font-mono">Scroll to Explore</span>
        <div className="w-4 h-7 border border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#C5A880] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

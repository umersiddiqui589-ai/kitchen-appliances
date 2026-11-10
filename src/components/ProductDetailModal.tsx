import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Check, Sparkles, ZoomIn, Package } from 'lucide-react';
import { Watch } from '../types/watch';

interface ProductDetailModalProps {
  watch: Watch | null;
  onClose: () => void;
  onAddToCart: (watch: Watch, quantity: number, boxOption?: 'standard' | 'luxury_wood' | 'collector_safe') => void;
  onToggleWishlist: (watch: Watch) => void;
  isWishlisted: (watchId: string) => boolean;
}

export default function ProductDetailModal({
  watch,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedBox, setSelectedBox] = useState<'standard' | 'luxury_wood' | 'collector_safe'>('luxury_wood');
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!watch) return null;

  const wishlisted = isWishlisted(watch.id);

  const handleAdd = () => {
    onAddToCart(watch, quantity, selectedBox);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const boxOptions = [
    { id: 'standard', name: 'Atelier Leather Clamshell', price: 0 },
    { id: 'luxury_wood', name: 'Handcrafted Macassar Ebony Vitrine', price: 850 },
    { id: 'collector_safe', name: 'Armored Titanium Transport Vault', price: 2400 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-white/20 text-white shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880]">
              {watch.collection}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs font-mono text-zinc-400">{watch.reference}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-6 sm:p-10 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Watch Visual Showcase & Zoom */}
            <div className="lg:col-span-6 space-y-4">
              <div
                className="relative aspect-square w-full bg-black border border-white/10 p-8 flex items-center justify-center overflow-hidden group cursor-zoom-in"
                onClick={() => setZoomed(!zoomed)}
              >
                <img
                  src={watch.heroImage || watch.image}
                  alt={watch.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-transform duration-500 ${
                    zoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105'
                  }`}
                />

                <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm border border-white/20 px-3 py-1 text-[10px] font-mono tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <ZoomIn className="w-3 h-3 text-[#C5A880]" />
                  <span>{zoomed ? 'Click to reset zoom' : 'Click to inspect macro details'}</span>
                </div>

                {watch.badge && (
                  <span className="absolute top-4 left-4 bg-[#C5A880] text-black text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-1">
                    {watch.badge}
                  </span>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400">
                <div className="p-3 bg-zinc-900/60 border border-white/5 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>5-Year Official Swiss Warranty</span>
                </div>
                <div className="p-3 bg-zinc-900/60 border border-white/5 flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Insured Armored Transport</span>
                </div>
              </div>
            </div>

            {/* Right: Watch Details & Purchase Module */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white">
                  {watch.name}
                </h2>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-white tabular-nums">
                    ${watch.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                    USD · Taxes Included
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {watch.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400">
                  Horological Masterpoints
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {watch.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C5A880] mt-0.5">·</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Packaging Options */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-xs uppercase font-mono tracking-widest text-zinc-400 block">
                  Presentation Vitrine
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {boxOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedBox(opt.id as any)}
                      className={`px-3 py-2 text-xs flex items-center justify-between border transition-all ${
                        selectedBox === opt.id
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-white'
                          : 'border-white/10 text-zinc-400 hover:border-white/30'
                      }`}
                    >
                      <span>{opt.name}</span>
                      <span className="font-mono text-zinc-300">
                        {opt.price === 0 ? 'Included' : `+$${opt.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="flex items-center border border-white/20 bg-black">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-zinc-400 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-3 text-xs font-mono font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-zinc-400 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={added}
                  className="flex-grow px-8 py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C5A880] transition-colors flex items-center justify-center gap-2 shadow-xl"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>COMMISSIONED TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ACQUIRE TIMEPIECE</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(watch)}
                  aria-label="Toggle wishlist"
                  className={`p-3.5 border transition-all ${
                    wishlisted
                      ? 'border-red-500 bg-red-500/20 text-red-400'
                      : 'border-white/20 text-zinc-400 hover:text-white hover:border-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Full Technical Specifications Sheet */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
                  Full Horological Specifications
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border border-white/10 p-4 bg-black/50">
                  <div>
                    <span className="text-zinc-500 font-mono text-[11px] block">Caliber</span>
                    <span className="text-zinc-200 font-medium">{watch.specs.caliber}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono text-[11px] block">Movement Type</span>
                    <span className="text-zinc-200 font-medium">{watch.specs.movement}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono text-[11px] block">Power Reserve</span>
                    <span className="text-zinc-200 font-medium">{watch.specs.powerReserve}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono text-[11px] block">Case Material</span>
                    <span className="text-zinc-200 font-medium">{watch.specs.caseMaterial}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono text-[11px] block">Dimensions</span>
                    <span className="text-zinc-200 font-medium">{watch.specs.diameter}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono text-[11px] block">Water Resistance</span>
                    <span className="text-zinc-200 font-medium">{watch.specs.waterResistance}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono text-[11px] block">Dial Finishing</span>
                    <span className="text-zinc-200 font-medium">{watch.specs.dial}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-mono text-[11px] block">Sapphire Glass</span>
                    <span className="text-zinc-200 font-medium">{watch.specs.glass}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

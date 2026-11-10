import React, { useState } from 'react';
import { ArrowRight, Check, Heart, Shield, Sparkles, Watch as WatchIcon } from 'lucide-react';
import { Watch } from '../types/watch';
import { WATCH_COLLECTION_WHITE_BG } from '../data/watches';

interface NewCollectionProps {
  mainWatch: Watch;
  secondaryWatches: Watch[];
  onDiscoverWatch: (watch: Watch) => void;
  onAddToCart: (watch: Watch) => void;
  onToggleWishlist: (watch: Watch) => void;
  isWishlisted: (watchId: string) => boolean;
}

export default function NewCollection({
  mainWatch,
  secondaryWatches,
  onDiscoverWatch,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: NewCollectionProps) {
  const [addedMain, setAddedMain] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleQuickAdd = (watch: Watch) => {
    onAddToCart(watch);
    setAddedMain(true);
    setTimeout(() => setAddedMain(false), 2000);
  };

  return (
    <section id="collections" className="bg-[#FFFFFF] text-zinc-950 py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#A8895B] font-semibold">
            <span>Autumn / Winter Horology</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase text-zinc-950 font-normal">
            NEW COLLECTION
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-xl mx-auto leading-relaxed">
            A testament to visionary horological design and unrelenting Swiss precision. Explore our latest flagship timepieces.
          </p>
        </div>

        {/* Main Showcase Product: Green-Dial Luxury Watch */}
        <div className="bg-zinc-50 border border-zinc-200/80 rounded-none p-6 sm:p-10 lg:p-14 mb-16 shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left: Large Product Image on Pure White Background */}
            <div className="lg:col-span-7 relative flex items-center justify-center bg-white p-6 sm:p-10 border border-zinc-200/60 shadow-inner group">
              <div className="relative aspect-square w-full max-w-[480px] flex items-center justify-center">
                <img
                  src={mainWatch.image || WATCH_COLLECTION_WHITE_BG}
                  alt={mainWatch.name}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Tag in corner */}
              <div className="absolute top-4 left-4 bg-zinc-950 text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1">
                Main Collection Highlight
              </div>

              {/* Wishlist toggle on image */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(mainWatch);
                }}
                aria-label="Save to wishlist"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 shadow-md border border-zinc-200 text-zinc-700 hover:text-red-500 hover:scale-110 transition-all"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted(mainWatch.id) ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              </button>
            </div>

            {/* Right: Product Title, Description, Horological Specs & DISCOVER WATCH Button */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#A8895B] font-semibold mb-1">
                  {mainWatch.reference}
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-zinc-950 font-normal leading-tight">
                  {mainWatch.name}
                </h3>
                <p className="text-xl sm:text-2xl font-sans font-medium text-zinc-900 mt-2 tabular-nums">
                  ${mainWatch.price.toLocaleString()} USD
                </p>
              </div>

              <p className="text-sm sm:text-base text-zinc-600 font-sans leading-relaxed">
                {mainWatch.description}
              </p>

              {/* Technical Specifications Highlights */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-200">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-zinc-600">Movement</p>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-900 mt-0.5">Calibre CZ-26-330</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-zinc-600">Power Reserve</p>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-900 mt-0.5">55 Hours</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-zinc-600">Case Dimension</p>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-900 mt-0.5">40.0 mm × 8.3 mm</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-zinc-600">Water Resistance</p>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-900 mt-0.5">120 Meters / 12 ATM</p>
                </div>
              </div>

              {/* Actions: DISCOVER WATCH & Quick Add */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onDiscoverWatch(mainWatch)}
                  className="px-8 py-3.5 bg-zinc-950 text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#A8895B] transition-colors flex items-center justify-center gap-3 shadow-md"
                >
                  <span>DISCOVER WATCH</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleQuickAdd(mainWatch)}
                  className="px-6 py-3.5 bg-white border border-zinc-300 text-zinc-900 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                >
                  {addedMain ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>ADDED TO BAG</span>
                    </>
                  ) : (
                    <span>ADD TO BAG</span>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-zinc-600 pt-2">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-zinc-600" />
                  <span>5-Year International Guarantee</span>
                </span>
                <span>·</span>
                <span>Complimentary Insured Courier</span>
              </div>
            </div>

          </div>
        </div>

        {/* Two Smaller Luxury Watch Product Cards Underneath */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-500 font-mono">
              Complementary Horizons
            </h4>
            <span className="text-xs text-zinc-500 font-mono">Limited Release Series</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryWatches.slice(0, 2).map((watch) => {
              const wishlisted = isWishlisted(watch.id);
              return (
                <div
                  key={watch.id}
                  className="group bg-white border border-zinc-200 p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-400 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image container */}
                  <div
                    className="relative aspect-square w-full max-h-[320px] bg-zinc-50 flex items-center justify-center p-6 overflow-hidden cursor-pointer"
                    onClick={() => onDiscoverWatch(watch)}
                  >
                    <img
                      src={watch.image}
                      alt={watch.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge */}
                    {watch.badge && (
                      <span className="absolute top-3 left-3 bg-white/95 text-zinc-900 border border-zinc-200 text-[10px] uppercase font-mono tracking-wider px-2 py-0.5">
                        {watch.badge}
                      </span>
                    )}

                    {/* Wishlist toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(watch);
                      }}
                      aria-label="Toggle wishlist"
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 border border-zinc-200 text-zinc-600 hover:text-red-500 hover:scale-110 transition-all shadow-sm"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlisted ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="pt-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                      <span>{watch.reference}</span>
                      <span>{watch.specs.diameter}</span>
                    </div>

                    <h4
                      onClick={() => onDiscoverWatch(watch)}
                      className="text-lg font-serif font-medium text-zinc-950 group-hover:text-[#A8895B] transition-colors cursor-pointer"
                    >
                      {watch.name}
                    </h4>

                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {watch.description}
                    </p>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <span className="text-base font-semibold text-zinc-950 tabular-nums">
                        ${watch.price.toLocaleString()} USD
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDiscoverWatch(watch)}
                          className="px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-zinc-800 hover:text-black border border-zinc-300 hover:border-black transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onAddToCart(watch)}
                          className="px-3 py-1.5 text-xs uppercase tracking-wider font-semibold bg-zinc-950 text-white hover:bg-[#A8895B] transition-colors"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

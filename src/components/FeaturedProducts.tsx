import React, { useState, useMemo } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Watch, FilterCategory } from '../types/watch';

interface FeaturedProductsProps {
  watches: Watch[];
  onViewDetails: (watch: Watch) => void;
  onAddToCart: (watch: Watch) => void;
  onToggleWishlist: (watch: Watch) => void;
  isWishlisted: (watchId: string) => boolean;
}

export default function FeaturedProducts({
  watches,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: FeaturedProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Masterpieces' },
    { id: 'nautilus', label: 'Sovereign Collection' },
    { id: 'complications', label: 'Grand Complications' },
    { id: 'tourbillon', label: 'Haute Tourbillon' },
    { id: 'heritage', label: 'Heritage 1888' },
  ];

  const filteredWatches = useMemo(() => {
    if (selectedCategory === 'all') return watches;
    if (selectedCategory === 'nautilus') {
      return watches.filter((w) => w.collection.toLowerCase().includes('sovereign'));
    }
    if (selectedCategory === 'complications') {
      return watches.filter((w) => w.collection.toLowerCase().includes('complication'));
    }
    if (selectedCategory === 'tourbillon') {
      return watches.filter((w) => w.collection.toLowerCase().includes('tourbillon'));
    }
    if (selectedCategory === 'heritage') {
      return watches.filter((w) => w.collection.toLowerCase().includes('heritage'));
    }
    return watches;
  }, [watches, selectedCategory]);

  const handleQuickAdd = (watch: Watch) => {
    onAddToCart(watch);
    setAddedId(watch.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="shop" className="bg-[#0c0c0e] text-white py-24 sm:py-32 relative border-t border-white/10">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              Curated Horology Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight uppercase font-normal text-white">
              FEATURED PRODUCTS
            </h2>
          </div>

          {/* Interactive Filter Tabs (Functional buttons with active states) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900/80 border border-white/10 rounded-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {filteredWatches.map((watch) => {
            const wishlisted = isWishlisted(watch.id);
            const isAdded = addedId === watch.id;

            return (
              <div
                key={watch.id}
                className="group relative bg-zinc-950/60 border border-white/10 rounded-none flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#C5A880]/60 hover:shadow-2xl hover:shadow-[#C5A880]/5"
              >
                {/* Watch Image Box */}
                <div
                  className="relative aspect-square w-full bg-black/80 p-8 flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => onViewDetails(watch)}
                >
                  {/* Subtle rim highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/60 pointer-events-none" />

                  <img
                    src={watch.heroImage || watch.image}
                    alt={watch.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Badge */}
                  {watch.badge && (
                    <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/20 text-[#C5A880] text-[10px] font-mono tracking-widest uppercase px-2.5 py-1">
                      {watch.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(watch);
                    }}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-200 ${
                      wishlisted
                        ? 'bg-red-500 text-white shadow-lg scale-110'
                        : 'bg-black/70 border border-white/20 text-zinc-300 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Hover Overlay with Quick View */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 bg-white/95 text-black text-xs font-semibold uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </span>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-6 space-y-4 flex flex-col justify-between flex-grow">
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>{watch.reference}</span>
                      <span>{watch.specs.diameter}</span>
                    </div>

                    <h3
                      onClick={() => onViewDetails(watch)}
                      className="text-lg font-serif font-medium text-white group-hover:text-[#C5A880] transition-colors cursor-pointer line-clamp-1"
                    >
                      {watch.name}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                      {watch.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Price</p>
                      <p className="text-lg font-semibold text-white tabular-nums">
                        ${watch.price.toLocaleString()} <span className="text-xs font-normal text-zinc-400">USD</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewDetails(watch)}
                        className="px-3.5 py-2 text-xs uppercase tracking-wider font-semibold border border-white/20 text-zinc-200 hover:border-white hover:text-white transition-colors"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => handleQuickAdd(watch)}
                        aria-label="Add watch to shopping bag"
                        className={`p-2 transition-colors ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-black hover:bg-[#C5A880]'
                        }`}
                      >
                        {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-16 p-8 border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-serif font-medium text-white">
              Bespoke Engraving & Concierge Delivery
            </h4>
            <p className="text-xs text-zinc-400 max-w-xl">
              Each CLOFA ZANCAN purchase includes personalized laser caseback engraving, hand-written warranty documents, and armored white-glove transport.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 border border-[#C5A880] text-[#C5A880] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A880] hover:text-black transition-colors whitespace-nowrap shrink-0"
          >
            Request Private Viewing
          </a>
        </div>

      </div>
    </section>
  );
}

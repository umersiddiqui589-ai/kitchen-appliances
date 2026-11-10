import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Eye } from 'lucide-react';
import { Watch } from '../types/watch';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  watches: Watch[];
  onSelectWatch: (watch: Watch) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  watches,
  onSelectWatch,
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const quickTerms = ['Green Dial', 'Sovereign 5711', 'Tourbillon', 'Rose Gold', 'Chronograph', 'Titanium'];

  const filtered = watches.filter((w) => {
    const q = query.toLowerCase().trim();
    if (!q) return false;
    return (
      w.name.toLowerCase().includes(q) ||
      w.reference.toLowerCase().includes(q) ||
      w.collection.toLowerCase().includes(q) ||
      w.specs.dial.toLowerCase().includes(q) ||
      w.specs.caseMaterial.toLowerCase().includes(q) ||
      w.specs.movement.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/20 text-white shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-white/10 bg-black/60">
          <Search className="w-5 h-5 text-[#C5A880] mr-4 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model, reference, caliber, or dial (e.g. 'green', '5711')..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-3 border-b border-white/5 bg-zinc-900/40 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Popular:</span>
          {quickTerms.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="text-xs px-2.5 py-1 bg-white/5 hover:bg-white/15 text-zinc-300 rounded-none transition-colors border border-white/5"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-6">
          {!query.trim() ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              Begin typing to search our Geneva Manufacture archives.
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-serif text-zinc-300">No timepieces matched "{query}"</p>
              <p className="text-xs text-zinc-500">Try searching for "olive", "chronograph", or "sovereign".</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((watch) => (
                <div
                  key={watch.id}
                  onClick={() => {
                    onSelectWatch(watch);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 bg-black/50 border border-white/5 hover:border-[#C5A880]/50 hover:bg-white/5 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-14 h-14 bg-black border border-white/10 p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={watch.heroImage || watch.image}
                        alt={watch.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#C5A880]">
                        {watch.reference}
                      </span>
                      <h4 className="text-sm font-serif font-medium text-white group-hover:text-[#C5A880] transition-colors">
                        {watch.name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {watch.specs.caseMaterial} · {watch.specs.diameter}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-xs font-semibold text-white tabular-nums">
                        ${watch.price.toLocaleString()}
                      </p>
                      <span className="text-[10px] text-zinc-500">In Stock</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

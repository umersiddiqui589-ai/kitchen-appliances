import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Watch } from '../types/watch';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Watch[];
  onRemoveFromWishlist: (watchId: string) => void;
  onAddToCart: (watch: Watch) => void;
  onViewDetails: (watch: Watch) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onViewDetails,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-[#C5A880]" />
              <h2 className="text-base font-serif font-normal uppercase tracking-widest text-white">
                Saved Timepieces ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close wishlist"
              className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 flex-grow">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <Heart className="w-12 h-12 text-zinc-800 mx-auto" />
                <div className="space-y-1">
                  <p className="text-sm font-serif text-zinc-300">Your wishlist is empty</p>
                  <p className="text-xs text-zinc-500">Save iconic references to review or acquire later.</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-white/20 text-xs uppercase tracking-widest text-zinc-300 hover:text-white hover:border-white transition-colors"
                >
                  Explore Horology
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {wishlist.map((watch) => (
                  <div
                    key={watch.id}
                    className="flex gap-4 pb-6 border-b border-white/10 text-left items-start"
                  >
                    <div
                      className="w-20 h-20 bg-black border border-white/10 flex-shrink-0 flex items-center justify-center p-2 cursor-pointer"
                      onClick={() => {
                        onClose();
                        onViewDetails(watch);
                      }}
                    >
                      <img
                        src={watch.heroImage || watch.image}
                        alt={watch.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-grow space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#C5A880]">
                        {watch.reference}
                      </span>
                      <h4
                        onClick={() => {
                          onClose();
                          onViewDetails(watch);
                        }}
                        className="text-sm font-serif font-medium text-white hover:text-[#C5A880] transition-colors cursor-pointer line-clamp-1"
                      >
                        {watch.name}
                      </h4>
                      <p className="text-xs font-semibold text-zinc-200 tabular-nums">
                        ${watch.price.toLocaleString()} USD
                      </p>

                      <div className="flex items-center gap-3 pt-3">
                        <button
                          onClick={() => {
                            onAddToCart(watch);
                            onRemoveFromWishlist(watch.id);
                          }}
                          className="px-3 py-1.5 bg-white text-black text-[11px] font-semibold uppercase tracking-wider hover:bg-[#C5A880] transition-colors flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>

                        <button
                          onClick={() => onRemoveFromWishlist(watch.id)}
                          aria-label="Remove from wishlist"
                          className="text-zinc-500 hover:text-red-400 p-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/60">
              <button
                onClick={() => {
                  wishlist.forEach((w) => onAddToCart(w));
                  onClose();
                }}
                className="w-full py-3.5 border border-white text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                <span>Add All to Acquisition Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

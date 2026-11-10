import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Check, Lock, Building, Truck } from 'lucide-react';
import { CartItem } from '../types/watch';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (watchId: string, delta: number) => void;
  onRemoveItem: (watchId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  // Checkout Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Switzerland',
    deliveryMethod: 'courier' as 'courier' | 'boutique',
    paymentMethod: 'wire' as 'wire' | 'card' | 'crypto',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => {
    let boxExtra = 0;
    if (item.selectedBox === 'luxury_wood') boxExtra = 850;
    if (item.selectedBox === 'collector_safe') boxExtra = 2400;
    return acc + (item.watch.price + boxExtra) * item.quantity;
  }, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address) {
      alert('Please fill out all required shipping and contact details.');
      return;
    }

    const orderNumber = `CZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderComplete(orderNumber);
    onClearCart();
  };

  const handleReset = () => {
    setOrderComplete(null);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
              <h2 className="text-base font-serif font-normal uppercase tracking-widest text-white">
                Acquisition Bag
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="overflow-y-auto p-6 flex-grow">
            {orderComplete ? (
              /* Order Confirmation Screen */
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-[#C5A880]/20 border border-[#C5A880] rounded-full flex items-center justify-center mx-auto text-[#C5A880]">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#C5A880]">
                    Acquisition Confirmed
                  </span>
                  <h3 className="text-2xl font-serif text-white">
                    Order Ref #{orderComplete}
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                    Thank you, {formData.fullName}. Your commission dossier has been transmitted to our Geneva atelier. A private concierge will contact you within two hours.
                  </p>
                </div>

                <div className="p-4 bg-black border border-white/10 text-left text-xs font-mono space-y-1.5 text-zinc-400">
                  <p><span className="text-zinc-600">Client:</span> {formData.fullName}</p>
                  <p><span className="text-zinc-600">Method:</span> {formData.deliveryMethod === 'boutique' ? 'Geneva Boutique Pickup' : 'Armored Courier Transport'}</p>
                  <p><span className="text-zinc-600">Dispatch:</span> Within 48 Hours Insured</p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3.5 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A880] transition-colors"
                >
                  Return to Collection
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form View */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
                    Concierge Checkout
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    ← Back to Items
                  </button>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-mono text-zinc-400 block mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Lord Julian Vance"
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase font-mono text-zinc-400 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@domain.com"
                      className="w-full px-3 py-2 bg-black border border-white/20 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase font-mono text-zinc-400 block mb-1">
                      Concierge Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+41 22 ..."
                      className="w-full px-3 py-2 bg-black border border-white/20 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-mono text-zinc-400 block mb-1">
                    Secure Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street and residence address"
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase font-mono text-zinc-400 block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Geneva / London / New York"
                      className="w-full px-3 py-2 bg-black border border-white/20 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase font-mono text-zinc-400 block mb-1">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-white/20 text-white text-xs focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Switzerland">Switzerland</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Japan">Japan</option>
                      <option value="UAE">United Arab Emirates</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>
                </div>

                {/* Delivery Option */}
                <div className="pt-2">
                  <label className="text-[11px] uppercase font-mono text-zinc-400 block mb-1.5">
                    Fulfillment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryMethod: 'courier' })}
                      className={`p-2.5 border text-left flex items-center gap-2 ${
                        formData.deliveryMethod === 'courier'
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-white'
                          : 'border-white/10 text-zinc-400'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-[#C5A880]" />
                      <span>Armored Courier</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryMethod: 'boutique' })}
                      className={`p-2.5 border text-left flex items-center gap-2 ${
                        formData.deliveryMethod === 'boutique'
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-white'
                          : 'border-white/10 text-zinc-400'
                      }`}
                    >
                      <Building className="w-4 h-4 text-[#C5A880]" />
                      <span>Atelier Pickup</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C5A880] transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize Commission (${subtotal.toLocaleString()})</span>
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              /* Empty Bag State */
              <div className="py-20 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto" />
                <div className="space-y-1">
                  <p className="text-sm font-serif text-zinc-300">Your acquisition bag is empty</p>
                  <p className="text-xs text-zinc-500">Explore the collection and curate your personal horology.</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-white/20 text-xs uppercase tracking-widest text-zinc-300 hover:text-white hover:border-white transition-colors"
                >
                  View Sovereign Series
                </button>
              </div>
            ) : (
              /* Item List */
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.watch.id}
                    className="flex gap-4 pb-6 border-b border-white/10 text-left items-start"
                  >
                    <div className="w-20 h-20 bg-black border border-white/10 flex-shrink-0 flex items-center justify-center p-2">
                      <img
                        src={item.watch.heroImage || item.watch.image}
                        alt={item.watch.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-grow space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#C5A880]">
                        {item.watch.reference}
                      </span>
                      <h4 className="text-sm font-serif font-medium text-white line-clamp-1">
                        {item.watch.name}
                      </h4>
                      <p className="text-xs font-semibold text-zinc-200 tabular-nums">
                        ${item.watch.price.toLocaleString()} USD
                      </p>

                      {item.selectedBox && item.selectedBox !== 'standard' && (
                        <p className="text-[10px] font-mono text-zinc-400">
                          + {item.selectedBox === 'luxury_wood' ? 'Macassar Vitrine ($850)' : 'Armored Vault ($2,400)'}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-white/20 bg-black">
                          <button
                            onClick={() => onUpdateQuantity(item.watch.id, -1)}
                            className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-mono text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.watch.id, 1)}
                            className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.watch.id)}
                          aria-label="Remove item"
                          className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
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

          {/* Footer Subtotal & Action */}
          {!orderComplete && items.length > 0 && !isCheckingOut && (
            <div className="p-6 border-t border-white/10 bg-black/60 space-y-4">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white tabular-nums">${subtotal.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Armored Transport & Insurance</span>
                  <span className="text-[#C5A880] uppercase font-mono text-[11px]">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>5-Year Official Caliber Guarantee</span>
                  <span className="text-[#C5A880] uppercase font-mono text-[11px]">Included</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-xs uppercase font-mono tracking-widest text-zinc-300">Total Investment</span>
                <span className="text-xl font-semibold text-white tabular-nums">${subtotal.toLocaleString()} USD</span>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-4 bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C5A880] transition-colors flex items-center justify-center gap-3 shadow-xl"
              >
                <span>PROCEED TO CONCIERGE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

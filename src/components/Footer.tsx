import React, { useState } from 'react';
import { Mail, ArrowRight, Check, MapPin, Phone, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  onOpenAppointment: () => void;
}

export default function Footer({ onOpenAppointment }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    // Store subscription in localStorage
    try {
      const subs = JSON.parse(localStorage.getItem('clofa_subscribers') || '[]');
      if (!subs.includes(email)) {
        subs.push(email);
        localStorage.setItem('clofa_subscribers', JSON.stringify(subs));
      }
    } catch {
      // ignore
    }
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer id="contact" className="bg-black text-white border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Brand Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <a
              href="#home"
              className="text-xl sm:text-2xl font-display tracking-[0.25em] text-white font-semibold uppercase block"
            >
              CLOFA ZANCAN
            </a>
            <p className="text-xs tracking-[0.2em] uppercase font-mono text-[#C5A880]">
              Haute Horlogerie Suisse · Fondée en 1888
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-md pt-2">
              Dedicated to the preservation of high mechanical watchmaking. Each creation embodies a singular union of chronometric mastery, architectural geometry, and human touch.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAppointment}
                className="text-xs uppercase tracking-widest text-zinc-300 hover:text-white underline underline-offset-4 decoration-[#C5A880]"
              >
                Schedule a Private Boutique Consultation →
              </button>
            </div>
          </div>

          {/* Newsletter Subscription Column */}
          <div className="lg:col-span-7 bg-zinc-950 p-6 sm:p-8 border border-white/10 text-left">
            <div className="space-y-2 mb-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                Private Gazette
              </span>
              <h4 className="text-lg font-serif font-medium text-white">
                Receive The Horological Dispatch
              </h4>
              <p className="text-xs text-zinc-400">
                Be the first to receive notifications regarding private atelier commissions, rare complication debuts, and private salon viewings.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your VIP email address..."
                    className="w-full px-4 py-3 bg-black border border-white/20 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C5A880] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Join Dispatch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
              {error && <p className="text-[11px] text-red-400 font-mono">{error}</p>}
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-mono">
                  Thank you. Your address has been entered into the CLOFA ZANCAN private registry.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Multi-Column Navigation Links & Contact Information */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-14 text-left border-b border-white/10 text-xs">
          
          {/* Col 1: Collections */}
          <div className="space-y-3">
            <h5 className="font-mono uppercase tracking-widest text-zinc-300 font-semibold">
              Collections
            </h5>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#collections" className="hover:text-white transition-colors">Sovereign Olive</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Grand Complications</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Royal Skeleton Tourbillon</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Heritage 1888 Series</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Astronomical Moonphase</a></li>
            </ul>
          </div>

          {/* Col 2: Horology */}
          <div className="space-y-3">
            <h5 className="font-mono uppercase tracking-widest text-zinc-300 font-semibold">
              Manufacture
            </h5>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Caliber CZ-26-330</a></li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Anglage & Finishing</a></li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Silinvar® Silicon Hairspring</a></li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Geneva Seal Standards</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Atelier History</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h5 className="font-mono uppercase tracking-widest text-zinc-300 font-semibold">
              Concierge
            </h5>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={onOpenAppointment} className="hover:text-white transition-colors text-left">Private Salons</button></li>
              <li><a href="#about" className="hover:text-white transition-colors">5-Year Global Warranty</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Bespoke Engraving</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Restoration & Care</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Certificate of Origin</a></li>
            </ul>
          </div>

          {/* Col 4 & 5: Global Boutiques & Contact */}
          <div className="col-span-2 space-y-4">
            <h5 className="font-mono uppercase tracking-widest text-zinc-300 font-semibold">
              Ateliers & Flagships
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-400">
              <div>
                <p className="text-white font-medium">Geneva Atelier</p>
                <p className="mt-0.5">Rue du Rhône 42</p>
                <p>1204 Genève, Switzerland</p>
                <p className="mt-1 font-mono text-[#C5A880]">+41 22 819 0900</p>
              </div>
              <div>
                <p className="text-white font-medium">Milan Salon</p>
                <p className="mt-0.5">Via Montenapoleone 8</p>
                <p>20121 Milano, Italy</p>
                <p className="mt-1 font-mono text-[#C5A880]">+39 02 7600 4411</p>
              </div>
            </div>
            <div className="pt-2 flex items-center gap-4 text-zinc-400">
              <span className="text-[11px] font-mono">Inquiries:</span>
              <a href="mailto:concierge@clofazancan.com" className="text-white hover:text-[#C5A880] underline transition-colors">
                concierge@clofazancan.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 CLOFA ZANCAN. All rights reserved. Masterpieces of Horology.</p>

          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>GENEVA</span>
            <span>·</span>
            <span>MILAN</span>
            <span>·</span>
            <span>NEW YORK</span>
            <span>·</span>
            <span>TOKYO</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

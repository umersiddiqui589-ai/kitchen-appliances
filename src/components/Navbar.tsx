import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';

interface NavbarProps {
  wishlistCount: number;
  cartCount: number;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  activeSection?: string;
}

export default function Navbar({
  wishlistCount,
  cartCount,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  onOpenAccount,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Collections', href: '#collections' },
    { name: 'Shop', href: '#shop' },
    { name: 'Craftsmanship', href: '#craftsmanship' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-black/60 backdrop-blur-sm border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Element) */}
          <a
            href="#home"
            className="text-lg sm:text-xl md:text-2xl font-display tracking-[0.25em] text-white hover:text-amber-200 transition-colors uppercase whitespace-nowrap shrink-0 font-semibold"
          >
            CLOFA ZANCAN
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-zinc-300 hover:text-white transition-colors relative py-1 group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Wishlist, Bag, User) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search timepieces"
              className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors relative"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              aria-label="Open wishlist"
              className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors relative"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A880] text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart / Bag Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Open shopping bag"
              className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Concierge */}
            <button
              onClick={onOpenAccount}
              aria-label="User account and concierge"
              className="p-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-6 transition-all animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.25em] text-zinc-300 hover:text-white py-2 border-b border-zinc-900"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mt-6 pt-4 flex items-center justify-between text-xs tracking-widest text-zinc-400">
            <span>GENEVA · MILAN · TOKYO</span>
            <span className="text-[#C5A880]">SWISS MADE</span>
          </div>
        </div>
      )}
    </header>
  );
}

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewCollection from './components/NewCollection';
import FeaturedProducts from './components/FeaturedProducts';
import Craftsmanship from './components/Craftsmanship';
import About from './components/About';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import AppointmentModal from './components/AppointmentModal';

import { WATCHES } from './data/watches';
import { Watch, CartItem } from './types/watch';

export default function App() {
  // Wishlist state persisted in localStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('clofa_wishlist');
      return saved ? JSON.parse(saved) : ['cz-5711-g'];
    } catch {
      return ['cz-5711-g'];
    }
  });

  // Shopping Bag state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('clofa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals & Drawers
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentWatchId, setAppointmentWatchId] = useState('cz-5711-g');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('clofa_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('clofa_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Main Hero Watch (Sovereign Olive Green Dial)
  const heroWatch = WATCHES[0];
  const secondaryWatches = [WATCHES[1], WATCHES[2]];

  // Wishlist handlers
  const isWishlisted = (watchId: string) => wishlistIds.includes(watchId);

  const toggleWishlist = (watch: Watch) => {
    if (isWishlisted(watch.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== watch.id));
      showToast(`Removed "${watch.name}" from Wishlist`);
    } else {
      setWishlistIds((prev) => [...prev, watch.id]);
      showToast(`Added "${watch.name}" to Wishlist`);
    }
  };

  const removeFromWishlist = (watchId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== watchId));
  };

  const wishlistedWatches = WATCHES.filter((w) => wishlistIds.includes(w.id));

  // Cart handlers
  const addToCart = (
    watch: Watch,
    quantity: number = 1,
    boxOption?: 'standard' | 'luxury_wood' | 'collector_safe'
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.watch.id === watch.id && item.selectedBox === (boxOption || 'standard'));
      if (existing) {
        return prev.map((item) =>
          item.watch.id === watch.id && item.selectedBox === (boxOption || 'standard')
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { watch, quantity, selectedBox: boxOption || 'standard' }];
    });
    showToast(`Added "${watch.name}" to Acquisition Bag`);
  };

  const updateCartQuantity = (watchId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.watch.id === watchId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (watchId: string) => {
    setCart((prev) => prev.filter((item) => item.watch.id !== watchId));
  };

  const clearCart = () => setCart([]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-[#C5A880] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950/95 border border-[#C5A880] text-white px-5 py-3 shadow-2xl text-xs font-mono tracking-wider flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 bg-[#C5A880] rounded-full animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Top Bar */}
      <Navbar
        wishlistCount={wishlistIds.length}
        cartCount={totalCartCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => {
          setAppointmentWatchId('cz-5711-g');
          setIsAppointmentOpen(true);
        }}
      />

      {/* Main Content Layout */}
      <main>
        {/* 1. HERO SECTION (Pure black #000000, serif "TIMELESS ELEGANCE", green-dial watch prominently on right) */}
        <Hero
          heroWatch={heroWatch}
          onExploreClick={() => scrollTo('collections')}
          onDiscoverMoreClick={() => scrollTo('craftsmanship')}
          onViewWatchDetails={(w) => setSelectedWatch(w)}
        />

        {/* 2. NEW COLLECTION SECTION (White background, editorial heading "NEW COLLECTION", green-dial watch on left, details on right, 2 smaller cards below) */}
        <NewCollection
          mainWatch={heroWatch}
          secondaryWatches={secondaryWatches}
          onDiscoverWatch={(w) => setSelectedWatch(w)}
          onAddToCart={(w) => addToCart(w, 1)}
          onToggleWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* 3. FEATURED PRODUCTS (Premium product grid with images, names, prices, View Details, Add to Wishlist) */}
        <FeaturedProducts
          watches={WATCHES}
          onViewDetails={(w) => setSelectedWatch(w)}
          onAddToCart={(w) => addToCart(w, 1)}
          onToggleWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* 4. CRAFTSMANSHIP SECTION (Editorial section highlighting precision engineering, materials, and watchmaking) */}
        <Craftsmanship
          onScheduleAtelierVisit={() => {
            setAppointmentWatchId('cz-5711-g');
            setIsAppointmentOpen(true);
          }}
        />

        {/* 5. ABOUT SECTION (Introduce CLOFA ZANCAN as premium luxury watch destination) */}
        <About
          onOpenAppointment={() => {
            setAppointmentWatchId('cz-5711-g');
            setIsAppointmentOpen(true);
          }}
        />
      </main>

      {/* 6. FOOTER (Navigation links, contact information, newsletter subscription, social media icons) */}
      <Footer
        onOpenAppointment={() => {
          setAppointmentWatchId('cz-5711-g');
          setIsAppointmentOpen(true);
        }}
      />

      {/* Interactive Modals & Slide-over Drawers */}
      <ProductDetailModal
        watch={selectedWatch}
        onClose={() => setSelectedWatch(null)}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isWishlisted={isWishlisted}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlistedWatches}
        onRemoveFromWishlist={removeFromWishlist}
        onAddToCart={(w) => addToCart(w, 1)}
        onViewDetails={(w) => setSelectedWatch(w)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        watches={WATCHES}
        onSelectWatch={(w) => setSelectedWatch(w)}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        defaultWatchId={appointmentWatchId}
      />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/store/cart-context';
import SearchOverlay from './SearchOverlay';
import CartDrawer from './CartDrawer';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '#contacto', label: 'Contacto' },
  { href: '#como-funciona', label: 'Como Funciona' },
];

const menuOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.05 } },
};

// Slides in from the LEFT — mirrors CartDrawer which slides from right
const menuPanel = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, damping: 28, stiffness: 300 },
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

const menuLinkVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Escape key + body scroll lock — same behaviour as CartDrawer
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 md:px-12 bg-transparent"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
          <Link href="/" className="flex items-center">
            <span className="text-xl sm:text-2xl font-light tracking-[0.15em] text-[#f4f4f4]">ONIX</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Buscar"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
          </button>
          <button
            className="relative text-white/70 hover:text-white transition-colors"
            aria-label="Carrito"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            <AnimatePresence mode="wait">
              <motion.span
                key={totalItems}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring' as const, stiffness: 500, damping: 20 }}
                className={`absolute -top-1.5 -right-1.5 text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold ${
                  totalItems > 0
                    ? 'bg-white text-black'
                    : 'bg-zinc-700 text-zinc-400'
                }`}
              >
                {totalItems}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={menuOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Panel — slides from LEFT, mirrors CartDrawer style */}
            <motion.div
              variants={menuPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 bottom-0 z-[70] w-full sm:w-[380px] bg-zinc-950/95 backdrop-blur-xl border-r border-white/[0.06] flex flex-col md:hidden"
            >
              {/* Header — logo left, close button right */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-white/[0.06] shrink-0">
                <span className="text-xl font-light tracking-[0.15em] text-[#f4f4f4]">ONIX</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
                  aria-label="Cerrar menú"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      variants={menuLinkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={i}
                    >
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 py-4 px-4 rounded-xl text-base font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-all duration-200 border border-transparent hover:border-white/[0.06]"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom section */}
              <div className="shrink-0 border-t border-white/[0.06] px-5 sm:px-6 py-5">
                <p className="text-xs text-zinc-600 text-center">
                  © {new Date().getFullYear()} ONIX
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

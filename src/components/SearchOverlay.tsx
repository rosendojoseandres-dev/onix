'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, CATEGORIES, searchProducts, formatPrice, getDiscountPercentage, getCategoryLabel } from '@/store/products';
import type { Product, ProductCategory } from '@/store/products';
import { useCart } from '@/store/cart-context';

// =========================================
// ANIMATION VARIANTS
// =========================================

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants = {
  hidden: { y: -30, opacity: 0, filter: 'blur(10px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, damping: 25, stiffness: 300 },
  },
  exit: {
    y: -20,
    opacity: 0,
    filter: 'blur(8px)',
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.05 + i * 0.04,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

// =========================================
// SUB-COMPONENTS
// =========================================

function CategoryChip({
  category,
  isActive,
  onClick,
}: {
  category: { id: ProductCategory | 'all'; label: string };
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 shrink-0 ${
        isActive
          ? 'bg-white/10 border-white/20 text-white'
          : 'bg-transparent border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12]'
      }`}
    >
      {category.label}
    </motion.button>
  );
}

function ProductResult({
  product,
  index,
  onAddToCart,
  onClose,
}: {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onClose: () => void;
}) {
  const discount = getDiscountPercentage(product.price, product.originalPrice);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className="group relative flex items-center gap-4 p-3 sm:p-4 rounded-2xl bg-zinc-900/40 border border-white/[0.04] hover:border-white/[0.1] hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-zinc-800/60 overflow-hidden shrink-0 border border-white/[0.04]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-1">
          {getCategoryLabel(product.category)}
        </p>
        <h4 className="text-sm sm:text-base font-semibold text-[#f4f4f4] truncate">
          {product.name}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold text-white">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-600 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {discount && (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Add to cart button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          handleAdd();
        }}
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
          added
            ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
            : 'bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12]'
        }`}
        aria-label={`Agregar ${product.name} al carrito`}
      >
        {added ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
          >
            <Sparkles size={16} />
          </motion.div>
        ) : (
          <ShoppingCart size={16} />
        )}
      </motion.button>
    </motion.div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 sm:py-16"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-900/60 border border-white/[0.06] flex items-center justify-center">
        <Search size={24} className="text-zinc-600" />
      </div>
      <p className="text-zinc-400 text-sm mb-1">
        No encontramos resultados para
      </p>
      <p className="text-white font-semibold">&ldquo;{query}&rdquo;</p>
      <p className="text-zinc-600 text-xs mt-3">
        Intenta con otros términos o explora nuestras categorías
      </p>
    </motion.div>
  );
}

// =========================================
// MAIN COMPONENT
// =========================================

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      // Small delay so the animation starts first
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    } else {
      // Reset state on close
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filtered results
  const results = useMemo(() => {
    const cat = activeCategory === 'all' ? undefined : activeCategory;
    return searchProducts(query, cat);
  }, [query, activeCategory]);

  const hasQuery = query.trim().length > 0;
  const allCategories = [
    { id: 'all' as const, label: 'Todos' },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-0 top-0 z-[90] max-h-[100dvh] overflow-y-auto"
          >
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-10">
              {/* Close button */}
              <div className="flex justify-end mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-zinc-900/60 border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all"
                  aria-label="Cerrar búsqueda"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Search input */}
              <div className="relative mb-6">
                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full pl-14 pr-5 py-4 sm:py-5 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/[0.06] focus:border-white/[0.15] text-white text-base sm:text-lg placeholder:text-zinc-600 outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                  id="search-input"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Category chips */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {allCategories.map((cat) => (
                  <CategoryChip
                    key={cat.id}
                    category={cat}
                    isActive={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  />
                ))}
              </div>

              {/* Results */}
              <div className="space-y-2 sm:space-y-3">
                {results.length > 0 ? (
                  <>
                    <p className="text-xs text-zinc-600 mb-3 px-1">
                      {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
                      {hasQuery && <> para &ldquo;{query}&rdquo;</>}
                    </p>
                    {results.map((product, index) => (
                      <ProductResult
                        key={product.id}
                        product={product}
                        index={index}
                        onAddToCart={handleAddToCart}
                        onClose={onClose}
                      />
                    ))}
                  </>
                ) : hasQuery ? (
                  <EmptyState query={query} />
                ) : (
                  <div className="text-center py-10">
                    <p className="text-zinc-500 text-sm">
                      Escribe para buscar entre nuestros productos
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

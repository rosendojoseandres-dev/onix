'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import { useCart } from '@/store/cart-context';
import { formatPrice, getDiscountPercentage, getCategoryLabel } from '@/store/products';
import type { CartItem } from '@/store/cart-context';

// =========================================
// ANIMATION VARIANTS
// =========================================

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.05 } },
};

const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, damping: 28, stiffness: 300 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.08 + i * 0.05,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: 0.2 },
  },
};

// =========================================
// SUB-COMPONENTS
// =========================================

function QuantityControl({
  quantity,
  onUpdate,
}: {
  quantity: number;
  onUpdate: (newQuantity: number) => void;
}) {
  return (
    <div className="flex items-center gap-0 rounded-xl bg-zinc-800/60 border border-white/[0.04] overflow-hidden">
      <button
        onClick={() => onUpdate(quantity - 1)}
        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all"
        aria-label="Disminuir cantidad"
      >
        <Minus size={14} />
      </button>
      <motion.span
        key={quantity}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-white"
      >
        {quantity}
      </motion.span>
      <button
        onClick={() => onUpdate(quantity + 1)}
        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all"
        aria-label="Aumentar cantidad"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function CartItemRow({
  item,
  index,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  index: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}) {
  const discount = getDiscountPercentage(item.product.price, item.product.originalPrice);

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-zinc-900/40 border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
    >
      {/* Image */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-zinc-800/60 overflow-hidden shrink-0 border border-white/[0.04]">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-0.5">
            {getCategoryLabel(item.product.category)}
          </p>
          <h4 className="text-sm font-semibold text-[#f4f4f4] truncate pr-2">
            {item.product.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-white">
              {formatPrice(item.product.price)}
            </span>
            {discount && (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Bottom row: quantity + remove */}
        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <QuantityControl
            quantity={item.quantity}
            onUpdate={(qty) => onUpdateQuantity(item.product.id, qty)}
          />
          <button
            onClick={() => onRemove(item.product.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            aria-label={`Eliminar ${item.product.name}`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="flex-1 flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Animated bag icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-zinc-900/60 border border-white/[0.06] flex items-center justify-center">
          <ShoppingBag size={32} className="text-zinc-600" />
        </div>
        {/* Subtle glow */}
        <div className="absolute inset-0 rounded-full bg-white/5 blur-xl" />
      </motion.div>

      <h3 className="text-lg font-semibold text-[#f4f4f4] mb-2">
        Tu bolsa está vacía
      </h3>
      <p className="text-zinc-500 text-sm mb-8 max-w-[220px]">
        Explora nuestro catálogo y agrega los productos que más te gusten
      </p>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClose}
        className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300 flex items-center gap-2"
      >
        <Package size={16} />
        Explorar Productos
      </motion.button>
    </motion.div>
  );
}

// =========================================
// MAIN COMPONENT
// =========================================

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

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
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-[90] w-full sm:w-[420px] md:w-[460px] bg-zinc-950/95 backdrop-blur-xl border-l border-white/[0.06] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-white/[0.06] shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-[#f4f4f4]">Tu Bolsa</h2>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
                    className="text-[11px] font-bold bg-white/10 text-white border border-white/10 px-2.5 py-0.5 rounded-full"
                  >
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </motion.span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-zinc-600 hover:text-red-400 transition-colors px-2 py-1"
                  >
                    Vaciar
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
                  aria-label="Cerrar bolsa"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items list */}
            {items.length === 0 ? (
              <EmptyCart onClose={onClose} />
            ) : (
              <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3 scrollbar-thin">
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => (
                    <CartItemRow
                      key={item.product.id}
                      item={item}
                      index={index}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Footer with total and CTA */}
            {items.length > 0 && (
              <div className="shrink-0 border-t border-white/[0.06] px-5 sm:px-6 py-5 space-y-4">
                {/* Price summary */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="text-zinc-300 font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Envío</span>
                    <span className="text-zinc-500 text-xs">Calculado al continuar</span>
                  </div>
                  <div className="h-px bg-white/[0.06] my-1" />
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-[#f4f4f4]">Total</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-xl font-bold text-white"
                    >
                      {formatPrice(totalPrice)}
                    </motion.span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-white text-black font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-white/10 transition-shadow"
                >
                  Continuar Compra
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Security note */}
                <p className="text-[10px] text-zinc-600 text-center">
                  Pago seguro • Envío asegurado • Garantía GROC
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

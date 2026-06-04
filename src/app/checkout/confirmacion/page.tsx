'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Printer, Home, CheckCircle, Package } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/store/cart-context';
import { useCheckout, getPaymentMethodLabel, getCountryLabel } from '@/store/checkout-context';
import { formatPrice, getDiscountPercentage } from '@/store/products';

// =========================================
// MAIN PAGE
// =========================================

export default function ConfirmacionPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { data, resetCheckout } = useCheckout();
  const hasClearedRef = useRef(false);

  // Clear cart after mount (once)
  useEffect(() => {
    if (!hasClearedRef.current && items.length > 0) {
      hasClearedRef.current = true;
      // Small delay so invoice renders with items first
      const t = setTimeout(() => {
        // We intentionally DON'T clear here — we keep items for printing
      }, 0);
      return () => clearTimeout(t);
    }
  }, [items.length]);

  const subtotal = totalPrice;
  const shipping = 0; // Coordinated separately
  const total = subtotal + shipping;

  const today = data.orderDate || new Date().toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleGoHome = () => {
    clearCart();
    resetCheckout();
  };

  return (
    <>
      {/* ── PRINT STYLES ── */}
      <style>{`
        @media print {
          body { background: #fff !important; color: #111 !important; }
          .no-print { display: none !important; }
          .print-page {
            background: #fff !important;
            color: #111 !important;
            box-shadow: none !important;
            border: none !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 32px !important;
            border-radius: 0 !important;
          }
          .print-label { color: #888 !important; }
          .print-divider { border-color: #e5e7eb !important; }
          .print-text-dark { color: #111 !important; }
          .print-text-muted { color: #555 !important; }
          .print-badge { background: #f3f4f6 !important; color: #374151 !important; }
          .print-row-alt { background: #f9fafb !important; }
          .print-total-row { border-top: 2px solid #111 !important; }
        }
      `}</style>

      {/* ── SCREEN: Animated Success Banner ── */}
      <main className="min-h-screen bg-zinc-950 text-white flex flex-col relative no-print">
        {/* Ambient glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/[0.04] blur-[120px] pointer-events-none" />

        {/* Top bar */}
        <div className="border-b border-white/[0.06] px-4 sm:px-8 py-4 flex items-center justify-between shrink-0 no-print">
          <Link href="/" className="text-xl font-light tracking-[0.15em] text-[#f4f4f4]">
            ONIX
          </Link>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-zinc-500">Pedido confirmado</span>
          </div>
        </div>

        {/* Success message */}
        <div className="px-4 py-10 text-center no-print">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle size={32} className="text-emerald-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-semibold text-[#f4f4f4] mb-2"
          >
            ¡Pedido Confirmado!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="text-zinc-400 text-sm max-w-sm mx-auto"
          >
            Revisa tu factura a continuación. Te contactaremos al{' '}
            <span className="text-white">{data.whatsapp || 'WhatsApp registrado'}</span> para
            coordinar el pago y la entrega.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 px-4 mb-8 no-print">
          <motion.button
            onClick={handlePrint}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-100 transition-colors shadow-lg"
          >
            <Printer size={16} />
            Imprimir / Guardar PDF
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
          >
            <Link
              href="/"
              onClick={handleGoHome}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-zinc-300 font-semibold text-sm hover:text-white hover:bg-white/[0.1] transition-all"
            >
              <Home size={16} />
              Volver al inicio
            </Link>
          </motion.div>
        </div>

        {/* ── INVOICE DOCUMENT ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto w-full px-4 pb-24"
        >
          <Invoice
            orderNumber={data.orderNumber}
            orderDate={today}
            customer={{
              name: data.fullName,
              email: data.email,
              whatsapp: data.whatsapp,
              country: getCountryLabel(data.country),
              city: data.city,
              address: data.address,
            }}
            paymentMethod={getPaymentMethodLabel(data.paymentMethod)}
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </motion.div>
      </main>
    </>
  );
}

// =========================================
// INVOICE COMPONENT
// =========================================

interface InvoiceProps {
  orderNumber: string;
  orderDate: string;
  customer: {
    name: string;
    email: string;
    whatsapp: string;
    country: string;
    city: string;
    address: string;
  };
  paymentMethod: string;
  items: Array<{ product: { id: string; name: string; price: number; originalPrice?: number; image: string }; quantity: number }>;
  subtotal: number;
  shipping: number;
  total: number;
}

function Invoice({ orderNumber, orderDate, customer, paymentMethod, items, subtotal, shipping, total }: InvoiceProps) {
  return (
    <div
      className="print-page bg-zinc-900/60 border border-white/[0.07] rounded-3xl overflow-hidden backdrop-blur-sm"
      style={{ fontFamily: 'var(--font-outfit), ui-sans-serif, system-ui, sans-serif' }}
    >
      {/* Invoice Header */}
      <div className="px-8 py-8 border-b border-white/[0.06] print-divider flex items-start justify-between gap-4">
        <div>
          <p className="text-2xl font-light tracking-[0.18em] text-[#f4f4f4] print-text-dark mb-1">
            ONIX
          </p>
          <p className="text-xs text-zinc-500 print-text-muted">
            Importación Premium · Colombia & Venezuela
          </p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2 print-badge">
            <Package size={11} />
            FACTURA
          </div>
          <p className="text-xs text-zinc-500 print-text-muted">N° Orden</p>
          <p className="text-sm font-bold text-white print-text-dark tracking-wide">
            {orderNumber || '—'}
          </p>
          <p className="text-xs text-zinc-500 print-text-muted mt-1">{orderDate}</p>
        </div>
      </div>

      {/* Bill To */}
      <div className="px-8 py-6 border-b border-white/[0.06] print-divider grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 print-label mb-3">
            Facturado a
          </p>
          <p className="text-sm font-semibold text-[#f4f4f4] print-text-dark mb-0.5">
            {customer.name || '—'}
          </p>
          <p className="text-xs text-zinc-400 print-text-muted">{customer.email}</p>
          {customer.whatsapp && (
            <p className="text-xs text-zinc-400 print-text-muted">{customer.whatsapp}</p>
          )}
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 print-label mb-3">
            Envío a
          </p>
          <p className="text-sm font-semibold text-[#f4f4f4] print-text-dark mb-0.5">
            {customer.city}{customer.country ? `, ${customer.country}` : ''}
          </p>
          {customer.address && (
            <p className="text-xs text-zinc-400 print-text-muted">{customer.address}</p>
          )}
          <p className="text-xs text-zinc-500 print-text-muted mt-2">
            Método de pago: <span className="text-zinc-300 print-text-dark font-medium">{paymentMethod}</span>
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="px-8 py-6">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 pb-3 border-b border-white/[0.06] print-divider">
          {['Producto', 'Precio', 'Cant.', 'Subtotal'].map((h) => (
            <p key={h} className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 print-label last:text-right">
              {h}
            </p>
          ))}
        </div>

        {/* Items */}
        {items.length > 0 ? (
          items.map((item, i) => {
            const discount = getDiscountPercentage(item.product.price, item.product.originalPrice);
            return (
              <div
                key={item.product.id}
                className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 py-4 border-b border-white/[0.04] print-divider items-center ${
                  i % 2 === 1 ? 'print-row-alt' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800/60 overflow-hidden border border-white/[0.05] shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#f4f4f4] print-text-dark truncate">
                      {item.product.name}
                    </p>
                    {discount && (
                      <span className="inline-block text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full mt-0.5">
                        -{discount}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-zinc-300 print-text-muted text-right">
                  {formatPrice(item.product.price)}
                </p>
                <p className="text-sm text-zinc-300 print-text-muted text-center">
                  {item.quantity}
                </p>
                <p className="text-sm font-semibold text-white print-text-dark text-right">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            );
          })
        ) : (
          <div className="py-10 text-center text-zinc-500 text-sm">
            Sin productos registrados.
          </div>
        )}

        {/* Totals */}
        <div className="pt-5 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 print-text-muted">Subtotal</span>
            <span className="text-zinc-300 print-text-muted">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 print-text-muted">Envío</span>
            <span className="text-zinc-500 print-text-muted text-xs">A coordinar por WhatsApp</span>
          </div>
          <div className="h-px bg-white/[0.08] print-divider my-2" />
          <div className="flex items-center justify-between print-total-row pt-1">
            <span className="text-base font-semibold text-[#f4f4f4] print-text-dark">Total</span>
            <span className="text-2xl font-bold text-white print-text-dark tracking-tight">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="px-8 py-6 border-t border-white/[0.06] print-divider bg-white/[0.02]">
        <p className="text-xs text-zinc-500 print-text-muted text-center leading-relaxed">
          Gracias por tu compra en ONIX · Un asesor se comunicará contigo en las próximas horas ·
          contacto@onixtienda.com
        </p>
      </div>
    </div>
  );
}

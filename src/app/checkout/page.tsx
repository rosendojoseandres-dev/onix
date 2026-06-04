'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowLeft,
  ShoppingBag,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ScrollBackground from '@/components/ScrollBackground';
import { useCart } from '@/store/cart-context';
import { useCheckout, generateOrderNumber, type PaymentMethod } from '@/store/checkout-context';
import { formatPrice } from '@/store/products';

// =========================================
// TYPES & DATA
// =========================================

const PAYMENT_METHODS: { value: PaymentMethod; label: string; detail: string; icon: React.ElementType }[] = [
  {
    value: 'transferencia',
    label: 'Transferencia Bancaria',
    detail: 'Te enviamos los datos bancarios de Colombia y Venezuela',
    icon: Banknote,
  },
  {
    value: 'pago_movil',
    label: 'Pago Móvil / WhatsApp',
    detail: 'Confirma tu pago por WhatsApp con comprobante',
    icon: Smartphone,
  },
  {
    value: 'efectivo',
    label: 'Efectivo / Contraentrega',
    detail: 'Disponible en ciudades principales',
    icon: CreditCard,
  },
];

const COUNTRIES = [
  { value: 'colombia', label: '🇨🇴 Colombia' },
  { value: 'venezuela', label: '🇻🇪 Venezuela' },
];

// =========================================
// ANIMATION VARIANTS
// =========================================

const stepVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

// =========================================
// INPUT HELPER
// =========================================

const inputClass =
  'w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/25 focus:bg-black/50 transition-all duration-200';

function Field({
  label,
  htmlFor,
  index,
  children,
}: {
  label: string;
  htmlFor: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div custom={index} variants={fieldVariants} initial="hidden" animate="visible" className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium text-zinc-400 block">{label}</label>
      {children}
    </motion.div>
  );
}

// =========================================
// STEP 1: PERSONAL & SHIPPING DATA
// =========================================

function StepPersonal({
  onNext,
}: {
  onNext: () => void;
}) {
  const { data, updateData } = useCheckout();

  const isValid =
    data.fullName.trim().length > 1 &&
    data.email.includes('@') &&
    data.whatsapp.trim().length > 5 &&
    data.country !== '' &&
    data.city.trim().length > 0 &&
    data.address.trim().length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateData({ [e.target.name]: e.target.value } as Parameters<typeof updateData>[0]);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-[#f4f4f4] mb-1">Datos de envío</h2>
        <p className="text-zinc-500 text-sm">¿A dónde enviamos tu pedido?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombre completo *" htmlFor="fullName" index={0}>
          <div className="relative">
            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Tu nombre completo"
              value={data.fullName}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>
        <Field label="Correo electrónico *" htmlFor="email" index={1}>
          <div className="relative">
            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={data.email}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="WhatsApp *" htmlFor="whatsapp" index={2}>
          <div className="relative">
            <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="+57 300 000 0000"
              value={data.whatsapp}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
            />
          </div>
        </Field>
        <Field label="País *" htmlFor="country" index={3}>
          <div className="relative">
            <select
              id="country"
              name="country"
              value={data.country}
              onChange={handleChange}
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="" disabled className="bg-zinc-900">Selecciona país...</option>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-zinc-900">{c.label}</option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
          </div>
        </Field>
      </div>

      <Field label="Ciudad *" htmlFor="city" index={4}>
        <div className="relative">
          <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Ej. Bogotá, Medellín, Caracas..."
            value={data.city}
            onChange={handleChange}
            className={`${inputClass} pl-10`}
          />
        </div>
      </Field>

      <Field label="Dirección de entrega *" htmlFor="address" index={5}>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Calle, carrera, barrio, número..."
          value={data.address}
          onChange={handleChange}
          className={inputClass}
        />
      </Field>

      <motion.button
        onClick={onNext}
        disabled={!isValid}
        whileHover={isValid ? { scale: 1.02 } : {}}
        whileTap={isValid ? { scale: 0.98 } : {}}
        className={`w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
          isValid
            ? 'bg-white text-black hover:bg-zinc-100 shadow-lg'
            : 'bg-white/10 text-zinc-500 cursor-not-allowed'
        }`}
      >
        Continuar al pago
        <ChevronRight size={18} />
      </motion.button>
    </div>
  );
}

// =========================================
// STEP 2: PAYMENT & ORDER REVIEW
// =========================================

function StepPayment({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm: () => void;
}) {
  const { data, updateData } = useCheckout();
  const { items, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = 0; // Free / TBD
  const total = totalPrice + shipping;

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Generate order number + date
    updateData({
      orderNumber: generateOrderNumber(),
      orderDate: new Date().toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    });
    await new Promise((r) => setTimeout(r, 1200));
    setIsProcessing(false);
    onConfirm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-[#f4f4f4]">Método de pago</h2>
          <p className="text-zinc-500 text-sm">Elige cómo quieres pagar</p>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        {PAYMENT_METHODS.map((method, i) => (
          <motion.button
            key={method.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
            onClick={() => updateData({ paymentMethod: method.value })}
            className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
              data.paymentMethod === method.value
                ? 'border-white/30 bg-white/[0.06]'
                : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              data.paymentMethod === method.value ? 'bg-white text-black' : 'bg-white/[0.06] text-zinc-400'
            }`}>
              <method.icon size={18} />
            </div>
            <div>
              <p className={`text-sm font-semibold mb-0.5 ${data.paymentMethod === method.value ? 'text-white' : 'text-zinc-300'}`}>
                {method.label}
              </p>
              <p className="text-xs text-zinc-500">{method.detail}</p>
            </div>
            <div className={`ml-auto mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
              data.paymentMethod === method.value ? 'border-white bg-white' : 'border-zinc-600'
            }`}>
              {data.paymentMethod === method.value && (
                <div className="w-full h-full rounded-full bg-black scale-[0.45]" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900/60 border border-white/[0.06] rounded-2xl p-5 space-y-3"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Resumen del pedido</p>
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between text-sm">
            <span className="text-zinc-300 truncate mr-4">
              {item.product.name}
              <span className="text-zinc-600 ml-1">×{item.quantity}</span>
            </span>
            <span className="text-white font-medium shrink-0">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
        <div className="h-px bg-white/[0.06]" />
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Subtotal</span>
          <span className="text-zinc-300">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Envío</span>
          <span className="text-zinc-500">A coordinar</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span className="text-[#f4f4f4]">Total</span>
          <span className="text-white text-lg">{formatPrice(total)}</span>
        </div>
      </motion.div>

      <motion.button
        onClick={handleConfirm}
        disabled={isProcessing}
        whileHover={!isProcessing ? { scale: 1.02 } : {}}
        whileTap={!isProcessing ? { scale: 0.98 } : {}}
        className="w-full py-4 rounded-xl bg-white text-black font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-zinc-100 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-zinc-600 border-t-transparent rounded-full"
            />
            Procesando pedido...
          </>
        ) : (
          <>
            Confirmar Pedido
            <ChevronRight size={18} />
          </>
        )}
      </motion.button>

      <p className="text-[11px] text-zinc-600 text-center">
        Al confirmar, aceptas nuestros términos. Te contactaremos por WhatsApp para coordinar el pago y la entrega.
      </p>
    </div>
  );
}

// =========================================
// MAIN PAGE
// =========================================

export default function CheckoutPage() {
  const { items, totalItems } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const goNext = () => {
    setDir(1);
    setStep(1);
  };

  const goBack = () => {
    setDir(-1);
    setStep(0);
  };

  const goConfirm = () => {
    router.push('/checkout/confirmacion');
  };

  // Empty cart guard
  if (totalItems === 0) {
    return (
      <>
        <ScrollBackground />
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden px-4">
          <Navbar />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-20"
          >
            <div className="w-20 h-20 rounded-full bg-zinc-900/60 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-zinc-600" />
            </div>
            <h1 className="text-2xl font-semibold text-[#f4f4f4] mb-2">Tu bolsa está vacía</h1>
            <p className="text-zinc-500 text-sm mb-8">Agrega productos antes de continuar al checkout.</p>
            <Link
              href="/catalogo"
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-100 transition-colors"
            >
              Explorar Catálogo
            </Link>
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <ScrollBackground />
      <main className="min-h-screen flex flex-col relative overflow-x-hidden">
        <Navbar />

        <div className="flex-1 pt-32 pb-24 px-4 max-w-2xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Link href="/" className="hover:text-zinc-300 transition-colors">Inicio</Link>
              <ChevronRight size={12} />
              <span className={step === 0 ? 'text-white' : 'hover:text-zinc-300 cursor-pointer transition-colors'} onClick={() => step > 0 && goBack()}>
                Datos de envío
              </span>
              <ChevronRight size={12} />
              <span className={step === 1 ? 'text-white' : 'text-zinc-600'}>Pago</span>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-3">
              {['Datos', 'Pago'].map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i <= step ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {i + 1}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${i <= step ? 'text-white' : 'text-zinc-600'}`}>
                      {label}
                    </span>
                  </div>
                  {i === 0 && (
                    <div className={`h-px w-8 transition-colors ${step > 0 ? 'bg-white' : 'bg-zinc-700'}`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Card */}
          <div className="bg-zinc-900/40 border border-white/[0.06] rounded-3xl p-6 sm:p-8 backdrop-blur-sm overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              {step === 0 ? (
                <motion.div
                  key="step-0"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <StepPersonal onNext={goNext} />
                </motion.div>
              ) : (
                <motion.div
                  key="step-1"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <StepPayment onBack={goBack} onConfirm={goConfirm} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </>
  );
}

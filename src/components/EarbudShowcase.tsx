'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, Variants } from 'framer-motion';
import {
  Battery,
  Sliders,
  ChevronRight,
  Zap,
  Wifi,
  Sun,
  Plug,
  LucideIcon,
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ProductId = 'left' | 'right';

export interface FeatureMetric {
  label: string;
  value: number;
  icon: LucideIcon;
}

export interface ProductData {
  id: ProductId;
  label: string;
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string;
    glow: string;
    ring: string;
  };
  stats: {
    batteryLevel: number;
  };
  features: FeatureMetric[];
}

const PRODUCT_DATA: Record<ProductId, ProductData> = {
  left: {
    id: 'left',
    label: 'Carga Rápida',
    title: 'X-Stream Charge',
    description:
      'La tecnología X-Stream carga la DELTA 2 de 0% a 80% en tan solo 50 minutos. El sistema de carga más rápido disponible en una estación portátil de su clase.',
    image: 'https://ik.imagekit.io/kqmrslzuq/SOUND/left-earbud.png',
    colors: {
      gradient: 'from-blue-600 to-indigo-900',
      glow: 'bg-blue-500',
      ring: 'border-l-blue-500/50',
    },
    stats: { batteryLevel: 82 },
    features: [
      { label: 'Velocidad de carga', value: 88, icon: Zap },
      { label: 'Capacidad (Wh)', value: 75, icon: Wifi },
    ],
  },
  right: {
    id: 'right',
    label: 'Estación de Energía',
    title: 'EcoFlow DELTA 2',
    description:
      'Capacidad de 1024 Wh expandible. Alimenta prácticamente cualquier dispositivo con 1800 W de potencia AC y 15 puertos. Carga ultrarrápida de 0 a 80% en 50 min.',
    image: '/planta.png',
    colors: {
      gradient: 'from-emerald-600 to-teal-900',
      glow: 'bg-emerald-500',
      ring: 'border-r-emerald-500/50',
    },
    stats: { batteryLevel: 74 },
    features: [
      { label: 'Entrada solar', value: 94, icon: Sun },
      { label: 'Salida AC (W)', value: 88, icon: Plug },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS — flicker-free
// =========================================

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
  }),
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const imageVariants: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

// =========================================
// 3. FLOATING HOOK — GPU-composited only
// =========================================

function useFloating(amplitude = 6, period = 6000) {
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 30, damping: 10, mass: 1 });

  useEffect(() => {
    let start: number | null = null;
    let raf: number;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = ((ts - start) % period) / period; // 0..1 loop
      // smooth sine wave — no layout, pure transform
      y.set(Math.sin(t * Math.PI * 2) * amplitude);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [amplitude, period, y]);

  return springY;
}

// =========================================
// 4. SUB-COMPONENTS
// =========================================

const ProductVisual = ({ data, isLeft }: { data: ProductData; isLeft: boolean }) => {
  const floatY = useFloating(5, 5500);
  const isSmall = !isLeft; // planta.png

  return (
    <div className="relative shrink-0">
      {/* Rotating ring — transform only, no layout */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
        className={`absolute inset-[-20%] rounded-full border border-dashed border-white/8 ${data.colors.ring}`}
      />

      {/* Glow — opacity only animation, no scale to avoid repaint cascade */}
      <motion.div
        animate={{ opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'opacity' }}
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-2xl`}
      />

      {/* Image container */}
      <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-[450px] md:w-[450px] rounded-full border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden bg-black/20 backdrop-blur-sm">
        {/* Floating wrapper — GPU-composited transform */}
        <motion.div
          style={{ y: floatY, willChange: 'transform' }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={data.id}
              src={data.image}
              alt={data.title}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ willChange: 'transform, opacity' }}
              className={`object-contain ${
                isSmall
                  ? 'w-[68%] h-[68%] drop-shadow-[0_28px_32px_rgba(0,0,0,0.9)]'
                  : 'w-[88%] h-[88%] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
              }`}
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const ProductDetails = ({ data, isLeft }: { data: ProductData; isLeft: boolean }) => {
  const alignClass = isLeft ? 'items-start text-left' : 'items-end text-right';
  const flexDirClass = isLeft ? 'flex-row' : 'flex-row-reverse';
  const barColorClass = isLeft ? 'left-0 bg-blue-500' : 'right-0 bg-emerald-500';

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass}`}
    >
      <motion.h2 custom={0} variants={itemVariants} className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-2">
        {data.label}
      </motion.h2>

      <motion.h1 custom={1} variants={itemVariants} className="text-4xl md:text-5xl font-semibold tracking-tight mb-2 text-[#f4f4f4]">
        {data.title}
      </motion.h1>

      <motion.p custom={2} variants={itemVariants} className={`text-zinc-400 mb-8 max-w-sm leading-relaxed ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
        {data.description}
      </motion.p>

      {/* Feature Grid */}
      <motion.div custom={3} variants={itemVariants} className="w-full space-y-6 bg-zinc-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
        {data.features.map((feature, idx) => (
          <div key={feature.label}>
            <div className={`flex items-center justify-between mb-3 text-sm ${flexDirClass}`}>
              <div className="flex items-center gap-2 text-zinc-200">
                <feature.icon size={15} />
                <span>{feature.label}</span>
              </div>
              <span className="font-mono text-xs text-zinc-500">{feature.value}%</span>
            </div>
            <div className="relative h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1.1, delay: 0.5 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'width' }}
                className={`absolute top-0 bottom-0 ${barColorClass} opacity-90`}
              />
            </div>
          </div>
        ))}

        <div className={`pt-4 flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
          <button type="button" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors group">
            <Sliders size={13} /> Ver Specs
            <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      <motion.div custom={4} variants={itemVariants} className={`mt-6 flex items-center gap-3 text-zinc-500 ${flexDirClass}`}>
        <Battery size={15} />
        <span className="text-sm font-medium">{data.stats.batteryLevel}% Cargado</span>
      </motion.div>
    </motion.div>
  );
};

// =========================================
// 5. MAIN COMPONENT
// =========================================

export default function EarbudShowcase({ children }: { children?: React.ReactNode }) {
  const [activeSide, setActiveSide] = useState<ProductId>('left');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSide((prev) => (prev === 'left' ? 'right' : 'left'));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentData = PRODUCT_DATA[activeSide];
  const isLeft = activeSide === 'left';

  return (
    <div className="relative min-h-screen w-full bg-transparent text-zinc-100 flex flex-col items-center justify-center">
      {/* Background gradient — opacity animation only, no layout */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            background: isLeft
              ? 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.13), transparent 50%)'
              : 'radial-gradient(circle at 80% 50%, rgba(16,185,129,0.13), transparent 50%)',
          }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 pt-28 sm:pt-32 pb-32 sm:pb-48 lg:pb-64 flex flex-col items-center justify-center max-w-7xl mx-auto min-h-screen">
        {children && (
          <div className="w-full mb-16 sm:mb-24 md:mb-32 lg:mb-48">{children}</div>
        )}

        {/* No layout prop — avoids layout recalculation causing flicker */}
        <div className={`flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-24 lg:gap-32 w-full`}>
          {/* Visuals */}
          <ProductVisual data={currentData} isLeft={isLeft} />

          {/* Content */}
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait" initial={false}>
              <ProductDetails
                key={activeSide}
                data={currentData}
                isLeft={isLeft}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

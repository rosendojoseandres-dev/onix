'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Zap,
  Battery,
  Sun,
  Plug,
  ChevronRight,
  Sliders,
  LucideIcon,
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ModeId = 'fast' | 'solar';

export interface FeatureMetric {
  label: string;
  value: number; // 0-100
  display: string;
  icon: LucideIcon;
}

export interface ModeData {
  id: ModeId;
  label: string;
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string;
    glow: string;
    accent: string;
  };
  stats: {
    capacity: string;
    chargeLevel: number;
  };
  features: FeatureMetric[];
}

const PRODUCT_DATA: Record<ModeId, ModeData> = {
  fast: {
    id: 'fast',
    label: 'Carga Rápida',
    title: 'De 0% a 80% en 50 min',
    description:
      'La tecnología X-Stream de EcoFlow carga la DELTA 2 más rápido que cualquier otra estación portátil del mercado. Desde el enchufe a lista para usar en menos de una hora.',
    image: 'https://websiteoss.ecoflow.com/media/delta2/pc/8ffbd023f0fdc44f69f8ed08387f99e1.jpg',
    colors: {
      gradient: 'from-emerald-500 to-teal-900',
      glow: 'bg-emerald-500',
      accent: 'emerald',
    },
    stats: { capacity: '1024 Wh', chargeLevel: 80 },
    features: [
      { label: 'Carga AC', value: 80, display: '1200 W', icon: Zap },
      { label: 'Tiempo carga', value: 92, display: '50 min', icon: Battery },
    ],
  },
  solar: {
    id: 'solar',
    label: 'Energía Solar',
    title: 'Recarga con el sol',
    description:
      'Compatible con paneles solares EcoFlow de hasta 500 W. Carga la DELTA 2 desde cualquier lugar usando energía solar limpia y renovable.',
    image: 'https://websiteoss.ecoflow.com/media/delta2/pc/8ffbd023f0fdc44f69f8ed08387f99e1.jpg',
    colors: {
      gradient: 'from-amber-500 to-orange-900',
      glow: 'bg-amber-400',
      accent: 'amber',
    },
    stats: { capacity: '1024 Wh', chargeLevel: 65 },
    features: [
      { label: 'Potencia solar', value: 70, display: '500 W máx.', icon: Sun },
      { label: 'Salidas AC', value: 85, display: '1800 W', icon: Plug },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS: any = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isFast: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.15,
      filter: 'blur(15px)',
      y: isFast ? 40 : -40,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 22 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  }),
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isFast }: { isFast: boolean }) => (
  <div className="absolute inset-0 pointer-events-none z-0">
    <motion.div
      animate={{
        background: isFast
          ? 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.12), transparent 55%)'
          : 'radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.12), transparent 55%)',
      }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const ProductVisual = ({ data, isFast }: { data: ModeData; isFast: boolean }) => (
  <motion.div layout="position" className="relative shrink-0">
    {/* Animated ambient ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-[-12%] rounded-full border border-dashed border-white/[0.07]"
    />
    {/* Glow blob */}
    <motion.div
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-3xl opacity-25`}
    />

    {/* Image Container */}
    <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-[450px] md:w-[450px] rounded-3xl border border-white/[0.06] shadow-2xl flex items-center justify-center overflow-hidden bg-zinc-950/60 backdrop-blur-sm">
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center p-8"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={data.id}
            src={data.image}
            alt="EcoFlow DELTA 2"
            variants={ANIMATIONS.image(isFast)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  </motion.div>
);

const ProductDetails = ({ data, isFast }: { data: ModeData; isFast: boolean }) => {
  const barColor = isFast ? 'bg-emerald-500' : 'bg-amber-400';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-start text-left"
    >
      <motion.p
        variants={ANIMATIONS.item}
        className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-2"
      >
        EcoFlow DELTA 2 · {data.label}
      </motion.p>

      <motion.h1
        variants={ANIMATIONS.item}
        className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-[#f4f4f4] leading-snug"
      >
        {data.title}
      </motion.h1>

      <motion.p
        variants={ANIMATIONS.item}
        className="text-zinc-400 mb-8 max-w-sm leading-relaxed text-sm sm:text-base"
      >
        {data.description}
      </motion.p>

      {/* Feature Grid */}
      <motion.div
        variants={ANIMATIONS.item}
        className="w-full space-y-5 bg-zinc-900/50 p-6 rounded-2xl border border-white/[0.06] backdrop-blur-sm"
      >
        {data.features.map((feature, idx) => (
          <div key={feature.label}>
            <div className="flex items-center justify-between mb-2 text-sm">
              <div className="flex items-center gap-2 text-zinc-300">
                <feature.icon size={15} />
                <span>{feature.label}</span>
              </div>
              <span className="font-mono text-xs text-zinc-400 font-semibold">
                {feature.display}
              </span>
            </div>
            <div className="relative h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1.1, delay: 0.4 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute top-0 bottom-0 ${barColor} opacity-90 rounded-full`}
              />
            </div>
          </div>
        ))}

        <div className="pt-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-zinc-500 text-xs">
            <Battery size={14} />
            <span>Capacidad: {data.stats.capacity}</span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
          >
            <Sliders size={13} />
            Ver Specs
            <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Charge indicator */}
      <motion.div
        variants={ANIMATIONS.item}
        className="mt-5 flex items-center gap-3 text-zinc-500"
      >
        <Battery size={15} />
        <span className="text-sm font-medium">{data.stats.chargeLevel}% Cargado</span>
      </motion.div>
    </motion.div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

export default function EarbudShowcase({ children }: { children?: React.ReactNode }) {
  const [activeMode, setActiveMode] = useState<ModeId>('fast');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMode((prev) => (prev === 'fast' ? 'solar' : 'fast'));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentData = PRODUCT_DATA[activeMode];
  const isFast = activeMode === 'fast';

  return (
    <div className="relative min-h-screen w-full bg-transparent text-zinc-100 flex flex-col items-center justify-center">
      <BackgroundGradient isFast={isFast} />

      <div className="relative z-10 w-full px-4 sm:px-6 pt-28 sm:pt-32 pb-32 sm:pb-48 lg:pb-64 flex flex-col items-center justify-center max-w-7xl mx-auto min-h-screen">
        {/* Hero children (title, etc.) */}
        {children && (
          <div className="w-full mb-16 sm:mb-24 md:mb-32 lg:mb-48">{children}</div>
        )}

        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-24 lg:gap-32 w-full"
        >
          {/* Left Column: Visuals */}
          <ProductVisual data={currentData} isFast={isFast} />

          {/* Right Column: Content */}
          <motion.div layout="position" className="w-full max-w-md">
            {/* Mode switcher pills */}
            <div className="flex gap-2 mb-8">
              {(Object.keys(PRODUCT_DATA) as ModeId[]).map((modeKey) => (
                <button
                  key={modeKey}
                  onClick={() => setActiveMode(modeKey)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    activeMode === modeKey
                      ? 'bg-white text-black'
                      : 'bg-zinc-900/60 text-zinc-500 border border-white/[0.08] hover:text-zinc-300'
                  }`}
                >
                  {PRODUCT_DATA[modeKey].label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <ProductDetails key={activeMode} data={currentData} isFast={isFast} />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

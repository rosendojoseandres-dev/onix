'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Camera, Cpu, Smartphone, Battery } from 'lucide-react';
import Link from 'next/link';

export default function IphoneShowcase() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      
      {/* 1. Atmospheric Ambient Glow (Blurred Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/iphone14promax.png"
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-[80px] scale-110 transform-gpu"
          alt=""
        />
        {/* Subtle color tint to unify the glow */}
        <div className="absolute inset-0 bg-indigo-950/20 mix-blend-color" />
      </div>

      {/* 2. Main Product Image (Sharp, uncropped, edges feathered) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none px-4">
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
          <img 
            src="/iphone14promax.png"
            className="w-full h-full object-contain mix-blend-lighten opacity-100 drop-shadow-2xl"
            style={{
              maskImage: 'radial-gradient(ellipse 95% 95% at 50% 50%, black 50%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 95% 95% at 50% 50%, black 50%, transparent 100%)'
            }}
            alt="iPhone 14 Pro Max"
          />
        </div>
      </div>

      {/* 3. Text and Specs Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-24 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-4 pointer-events-none h-full">
        
        {/* Left Column: Specs on Desktop */}
        <div className="hidden lg:flex w-full lg:w-1/3 flex-col gap-6 items-start justify-center pointer-events-auto">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 bg-zinc-950/60 backdrop-blur-xl border border-indigo-500/20 px-6 py-5 rounded-2xl w-72 shadow-[0_0_25px_rgba(99,102,241,0.1)] hover:border-indigo-500/40 transition-colors"
           >
             <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
               <Camera className="text-indigo-400" size={24} />
             </div>
             <div>
               <p className="text-xs text-indigo-200/60 uppercase tracking-wider font-bold mb-1">Cámara Pro</p>
               <p className="text-white font-medium">48 MP</p>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 bg-zinc-950/60 backdrop-blur-xl border border-indigo-500/20 px-6 py-5 rounded-2xl w-72 -translate-x-4 shadow-[0_0_25px_rgba(99,102,241,0.1)] hover:border-indigo-500/40 transition-colors"
           >
             <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
               <Cpu className="text-indigo-400" size={24} />
             </div>
             <div>
               <p className="text-xs text-indigo-200/60 uppercase tracking-wider font-bold mb-1">Procesador</p>
               <p className="text-white font-medium">A16 Bionic</p>
             </div>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 bg-zinc-950/60 backdrop-blur-xl border border-indigo-500/20 px-6 py-5 rounded-2xl w-72 shadow-[0_0_25px_rgba(99,102,241,0.1)] hover:border-indigo-500/40 transition-colors"
           >
             <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
               <Smartphone className="text-indigo-400" size={24} />
             </div>
             <div>
               <p className="text-xs text-indigo-200/60 uppercase tracking-wider font-bold mb-1">Pantalla</p>
               <p className="text-white font-medium">120 Hz</p>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.8 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 bg-zinc-950/60 backdrop-blur-xl border border-indigo-500/20 px-6 py-5 rounded-2xl w-72 translate-x-4 shadow-[0_0_25px_rgba(99,102,241,0.1)] hover:border-indigo-500/40 transition-colors"
           >
             <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
               <Battery className="text-indigo-400" size={24} />
             </div>
             <div>
               <p className="text-xs text-indigo-200/60 uppercase tracking-wider font-bold mb-1">Batería</p>
               <p className="text-white font-medium">Hasta 29h</p>
             </div>
           </motion.div>
        </div>

        {/* Right Column: Text Content */}
        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <span className="text-indigo-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                Deep Purple
              </span>
              <div className="h-px w-12 lg:w-16 bg-indigo-500/40" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white mb-6 tracking-tighter leading-[1.05]">
              iPhone 14<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                Pro Max
              </span>
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg lg:text-xl mb-10 lg:mb-12 max-w-md leading-relaxed font-light">
              Descubre el poder del chip A16 Bionic y una cámara de 48 MP que desafía los límites. Dynamic Island, una forma nueva y mágica de interactuar con tu iPhone.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 lg:gap-8">
              <Link
                href="/catalogo/1"
                className="group flex items-center justify-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-500 transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] border border-indigo-400/20"
              >
                Comprar Ahora
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-sm text-zinc-500 tracking-wider">Desde</span>
                <span className="text-2xl lg:text-3xl font-bold text-white">3 x $999</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Camera, Cpu, Smartphone, Battery } from 'lucide-react';
import Link from 'next/link';

export default function IphoneShowcase() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/10 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 items-center">
        
        {/* Left Column: Specs on Desktop */}
        <div className="hidden lg:flex flex-col gap-6 items-start justify-center order-2 lg:order-1">
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

        {/* Center Column: Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          viewport={{ once: true }}
          className="w-full flex justify-center items-center order-1 lg:order-2 relative z-20"
        >
          <img 
            src="/iphone14promax.png" 
            alt="iPhone 14 Pro Max" 
            className="w-full max-w-[280px] sm:max-w-sm lg:max-w-[450px] object-contain mix-blend-lighten drop-shadow-2xl"
          />
        </motion.div>
        
        {/* Right Column: Text Content */}
        <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left order-3 lg:order-3">
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

'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Camera, Cpu, Smartphone, Battery } from 'lucide-react';
import Link from 'next/link';

export default function IphoneShowcase() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=2500&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover object-center"
          alt="iPhone 14 Pro Max"
        />
        
        {/* Subtle Purple Tint Overlay */}
        <div className="absolute inset-0 bg-indigo-950/20 mix-blend-color" />
        
        {/* Gradients to seamlessly blend into the page above and below */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40" /> 
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-24 flex flex-col md:flex-row-reverse items-center">
        
        {/* Floating Text Content */}
        <div className="w-full md:w-1/2 md:pl-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-indigo-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                Deep Purple
              </span>
              <div className="h-px w-16 bg-indigo-500/40" />
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tighter leading-[1.05]">
              iPhone 14<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                Pro Max
              </span>
            </h2>

            <p className="text-zinc-300 text-lg sm:text-xl mb-12 max-w-lg leading-relaxed font-light">
              Descubre el poder del chip A16 Bionic y una cámara de 48 MP que desafía los límites. Dynamic Island, una forma nueva y mágica de interactuar con tu iPhone.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <Link
                href="/catalogo/1"
                className="group flex items-center justify-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-500 transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] border border-indigo-400/20"
              >
                Comprar Ahora
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex flex-col">
                <span className="text-sm text-zinc-500 tracking-wider">Desde</span>
                <span className="text-3xl font-bold text-white">3 x $999</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Specs on Desktop */}
        <div className="hidden md:flex w-1/2 flex-col gap-6 items-start justify-center pt-12">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 bg-zinc-950/40 backdrop-blur-xl border border-indigo-500/20 px-6 py-5 rounded-2xl w-72 shadow-[0_0_25px_rgba(99,102,241,0.1)] hover:border-indigo-500/40 transition-colors"
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
             className="flex items-center gap-4 bg-zinc-950/40 backdrop-blur-xl border border-indigo-500/20 px-6 py-5 rounded-2xl w-72 -translate-x-8 shadow-[0_0_25px_rgba(99,102,241,0.1)] hover:border-indigo-500/40 transition-colors"
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
             className="flex items-center gap-4 bg-zinc-950/40 backdrop-blur-xl border border-indigo-500/20 px-6 py-5 rounded-2xl w-72 shadow-[0_0_25px_rgba(99,102,241,0.1)] hover:border-indigo-500/40 transition-colors"
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
             className="flex items-center gap-4 bg-zinc-950/40 backdrop-blur-xl border border-indigo-500/20 px-6 py-5 rounded-2xl w-72 translate-x-4 shadow-[0_0_25px_rgba(99,102,241,0.1)] hover:border-indigo-500/40 transition-colors"
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

      </div>
    </section>
  );
}

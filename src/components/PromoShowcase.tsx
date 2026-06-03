'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Battery, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PromoShowcase() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=2500&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover object-center"
          alt="Apple Watch Ultra 2"
        />
        
        {/* Subtle Amber Tint Overlay for the Ultra Action Button Vibe */}
        <div className="absolute inset-0 bg-amber-950/20 mix-blend-color" />
        
        {/* Gradients to seamlessly blend into the page above and below */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40" /> 
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-24 flex flex-col md:flex-row items-center">
        
        {/* Floating Text Content */}
        <div className="w-full md:w-1/2 md:pr-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-amber-500/80 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                Oferta Especial
              </span>
              <div className="h-px w-16 bg-amber-500/30" />
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-6 tracking-tighter leading-[1.05]">
              Apple Watch<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                Ultra 2
              </span>
            </h2>

            <p className="text-zinc-300 text-lg sm:text-xl mb-12 max-w-lg leading-relaxed font-light">
              Diseñado para los extremos. Caja de titanio aeroespacial, GPS de doble frecuencia de alta precisión y hasta 36 horas de batería.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <Link
                href="/catalogo/8"
                className="group flex items-center justify-center gap-3 bg-amber-600/90 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-500 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
              >
                Comprar Ahora
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex flex-col">
                <span className="text-sm text-zinc-500 line-through tracking-wider">Precio regular $899.00</span>
                <span className="text-3xl font-bold text-white">$799.00</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Specs on Desktop */}
        <div className="hidden md:flex w-1/2 flex-col gap-6 items-end justify-center pt-12">
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 bg-zinc-950/40 backdrop-blur-xl border border-amber-500/10 px-6 py-5 rounded-2xl w-72 shadow-[0_0_25px_rgba(245,158,11,0.05)] hover:border-amber-500/30 transition-colors"
           >
             <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
               <Shield className="text-amber-500/80" size={24} />
             </div>
             <div>
               <p className="text-xs text-amber-200/50 uppercase tracking-wider font-bold mb-1">Material</p>
               <p className="text-white font-medium">Titanio Aeroespacial</p>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 bg-zinc-950/40 backdrop-blur-xl border border-amber-500/10 px-6 py-5 rounded-2xl w-72 translate-x-8 shadow-[0_0_25px_rgba(245,158,11,0.05)] hover:border-amber-500/30 transition-colors"
           >
             <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
               <Battery className="text-amber-500/80" size={24} />
             </div>
             <div>
               <p className="text-xs text-amber-200/50 uppercase tracking-wider font-bold mb-1">Autonomía</p>
               <p className="text-white font-medium">Hasta 36 horas</p>
             </div>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 bg-zinc-950/40 backdrop-blur-xl border border-amber-500/10 px-6 py-5 rounded-2xl w-72 shadow-[0_0_25px_rgba(245,158,11,0.05)] hover:border-amber-500/30 transition-colors"
           >
             <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
               <Zap className="text-amber-500/80" size={24} />
             </div>
             <div>
               <p className="text-xs text-amber-200/50 uppercase tracking-wider font-bold mb-1">Pantalla</p>
               <p className="text-white font-medium">3000 nits de brillo</p>
             </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
}

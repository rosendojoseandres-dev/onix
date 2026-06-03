'use client';

import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Globe,
  PackageCheck,
  Package,
  Truck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

// =========================================
// 1. BENTO GRID: CÓMO FUNCIONA
// =========================================

function BentoSteps() {
  return (
    <section className="relative w-full py-24 sm:py-32 px-4 max-w-[95%] mx-auto z-10">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center md:text-left mb-16 md:mb-24 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-6"
        >
          ¿Cómo Funciona?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          Importamos directamente los mejores artículos del mercado internacional a precios increíbles. Un proceso transparente, simple y de excelencia.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
        
        {/* Step 1: Big Horizontal Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 bg-zinc-900/30 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden border border-white/[0.05] group hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-all duration-500"
        >
          <ShoppingCart className="absolute -right-12 -bottom-12 text-cyan-500/[0.05] w-72 h-72 group-hover:scale-105 group-hover:text-cyan-500/[0.08] transition-all duration-700 pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">Paso 01</span>
            <h3 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Elige tus Productos</h3>
            <p className="text-zinc-400 text-base sm:text-lg max-w-md leading-relaxed">
              Explora nuestro catálogo de artículos importados: tecnología de última generación, moda y más. Todo a precios extremadamente competitivos.
            </p>
          </div>
        </motion.div>

        {/* Step 2: Vertical Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-1 bg-zinc-900/30 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden border border-white/[0.05] group hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] transition-all duration-500"
        >
          <Globe className="absolute -right-8 -bottom-8 text-indigo-500/[0.05] w-56 h-56 group-hover:scale-105 group-hover:text-indigo-500/[0.08] transition-all duration-700 pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-block px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(99,102,241,0.15)]">Paso 02</span>
            <h3 className="text-3xl font-semibold text-white mb-4">Procesamos tu Pedido</h3>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Gestionamos la importación directa desde nuestros proveedores internacionales garantizando calidad premium.
            </p>
          </div>
        </motion.div>

        {/* Step 3: Full Width Bottom Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="md:col-span-3 bg-zinc-900/30 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 md:p-16 relative overflow-hidden border border-white/[0.05] group hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <PackageCheck className="absolute -left-12 -top-12 text-violet-500/[0.05] w-96 h-96 group-hover:scale-105 group-hover:text-violet-500/[0.08] transition-all duration-700 pointer-events-none" />
          
          <div className="relative z-10 w-full md:w-1/2">
            <span className="inline-block px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(139,92,246,0.15)]">Paso 03</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">Elige Cómo Recibirlo</h3>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg">
              Dos opciones diseñadas a tu medida: recoge tus productos en un casillero en EE. UU. o recíbelos cómodamente en la puerta de tu casa.
            </p>
          </div>
          
          <div className="relative z-10 w-full md:w-auto flex justify-end">
             <Link href="#modalidades" className="group flex items-center justify-center gap-3 bg-violet-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-violet-500 transition-all duration-300 w-full md:w-auto shadow-xl shadow-violet-500/20">
                Ver Modalidades
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// =========================================
// 2. FULL-BLEED SECTIONS: MODALIDADES
// =========================================

function CinematicModalities() {
  return (
    <div id="modalidades" className="w-full flex flex-col">
      
      {/* Modality 1: Casillero */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2500&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            alt="Casillero Logistics"
          />
          {/* Subtle Color Tint Overlay */}
          <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[95%] mx-auto px-4 py-24 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Package className="text-cyan-400" size={24} />
                <span className="text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">Servicio Base</span>
                <div className="h-px w-12 bg-cyan-500/30" />
              </div>

              <h2 className="text-5xl sm:text-6xl font-semibold text-white mb-6 tracking-tighter leading-[1.05]">
                Casillero en<br />Estados Unidos
              </h2>

              <p className="text-zinc-300 text-lg sm:text-xl mb-10 max-w-lg leading-relaxed font-light">
                Recibe tus productos en tu casillero personal en USA. Te brindamos asesoría completamente gratuita para configurarlo y gestionarlo. La opción ideal para compradores frecuentes.
              </p>

              <ul className="space-y-4 mb-8">
                {['Asesoría gratuita incluida', 'Configuración asistida paso a paso', 'Sin costos adicionales sorpresa'].map((feature, idx) => (
                  <motion.li key={idx} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                      <CheckCircle2 size={14} className="text-cyan-400" />
                    </div>
                    <span className="text-zinc-200 font-medium text-base">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modality 2: Puerta a Puerta */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2500&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            alt="Delivery Services"
          />
          {/* Subtle Color Tint Overlay */}
          <div className="absolute inset-0 bg-indigo-900/10 mix-blend-color" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/90 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[95%] mx-auto px-4 py-24 flex flex-col md:flex-row-reverse items-center">
          <div className="w-full md:w-1/2 md:pl-12">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Truck className="text-indigo-400" size={24} />
                <span className="text-indigo-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">Servicio Premium</span>
                <div className="h-px w-12 bg-indigo-500/30" />
              </div>

              <h2 className="text-5xl sm:text-6xl font-semibold text-white mb-6 tracking-tighter leading-[1.05]">
                Entrega<br />Puerta a Puerta
              </h2>

              <p className="text-zinc-300 text-lg sm:text-xl mb-10 max-w-lg leading-relaxed font-light">
                Nos encargamos absolutamente de todo el proceso logístico: importación, nacionalización y entrega segura hasta la dirección que nos indiques. Cero complicaciones.
              </p>

              <ul className="space-y-4 mb-8">
                {['Importación y nacionalización completa', 'Envío nacional asegurado incluido', 'Entrega directa en la puerta de tu hogar'].map((feature, idx) => (
                  <motion.li key={idx} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                      <CheckCircle2 size={14} className="text-indigo-400" />
                    </div>
                    <span className="text-zinc-200 font-medium text-base">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <p className="text-xs text-indigo-400/50 italic uppercase tracking-wider font-semibold">
                * Aplican costos adicionales según el destino nacional
              </p>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}

// =========================================
// 3. MAIN WRAPPER COMPONENT
// =========================================

export default function HowItWorks() {
  return (
    <div className="w-full bg-black">
      <BentoSteps />
      <CinematicModalities />
    </div>
  );
}

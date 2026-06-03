'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

export default function ProductMarquee() {
  // We double the products to create a seamless infinite scroll loop
  const marqueeItems = [...MOCK_PRODUCTS, ...MOCK_PRODUCTS];

  return (
    <section className="relative w-full py-12 md:py-20 bg-black overflow-hidden flex flex-col justify-center">
      {/* Subtle top/bottom fading gradients */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Subtle side fading gradients to blend the edges */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden flex-nowrap group">
        {/* Usamos dos contenedores idénticos que se desplazan -100% para un loop perfecto */}
        <motion.div
          animate={{ x: ['0%', '-100%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
          className="flex w-max gap-6 pr-6 will-change-transform"
        >
          {MOCK_PRODUCTS.map((product, index) => (
            <Link
              href={`/catalogo/${product.id}`}
              key={`first-${product.id}-${index}`}
              className="group/card relative flex items-center bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 w-[380px] hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex-1 flex flex-col items-start pr-6 relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white text-black mb-4 shadow-sm group-hover/card:bg-zinc-200 transition-colors">
                  {product.isNew ? 'Nuevo' : 'Destacado'}
                </span>
                
                <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                  {product.name}
                </h3>
                
                <p className="text-xl font-bold text-emerald-400">
                  ${product.price}
                </p>
              </div>

              <div className="w-32 h-32 relative shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-black/50">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700"
                />
              </div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          animate={{ x: ['0%', '-100%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
          className="flex w-max gap-6 pr-6 will-change-transform"
          aria-hidden="true"
        >
          {MOCK_PRODUCTS.map((product, index) => (
            <Link
              href={`/catalogo/${product.id}`}
              key={`second-${product.id}-${index}`}
              className="group/card relative flex items-center bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 w-[380px] hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex-1 flex flex-col items-start pr-6 relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white text-black mb-4 shadow-sm group-hover/card:bg-zinc-200 transition-colors">
                  {product.isNew ? 'Nuevo' : 'Destacado'}
                </span>
                
                <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                  {product.name}
                </h3>
                
                <p className="text-xl font-bold text-emerald-400">
                  ${product.price}
                </p>
              </div>

              <div className="w-32 h-32 relative shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-black/50">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700"
                />
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

export default function ProductGrid() {
  return (
    <section className="w-full py-20 sm:py-24 bg-black relative z-10">
      <div className="max-w-[95%] mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-semibold text-white tracking-tight"
          >
            Nuevas Adiciones
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/catalogo" className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
              Ver catálogo &rarr;
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {MOCK_PRODUCTS.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: Math.min(index * 0.04, 0.25) }}
            >
              <Link
                href={`/catalogo/${product.id}`}
                className="group flex items-center p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:bg-zinc-800/50 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] h-full"
              >
                {/* Product Image */}
                <div className="w-20 h-20 shrink-0 bg-black/50 rounded-xl overflow-hidden border border-white/5 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                
                {/* Product Info */}
                <div className="ml-4 flex flex-col justify-center flex-1">
                  <h3 className="text-sm md:text-base font-medium text-zinc-300 leading-tight mb-1 group-hover:text-white transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-emerald-400">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

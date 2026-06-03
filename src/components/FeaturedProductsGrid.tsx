'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

export default function FeaturedProductsGrid() {
  // We'll use 10 items to make two perfect rows of 5 on large screens
  const displayProducts = [...MOCK_PRODUCTS, MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]];

  // Helper to map color names to hex codes for the variant dots
  const getColorHex = (colorName: string) => {
    const colors: Record<string, string> = {
      'Titanio Natural': '#a5a5a5',
      'Titanio Blanco': '#f4f4f4',
      'Titanio Negro': '#2d2d2d',
      'Blanco': '#ffffff',
      'Rojo/Negro': '#ef4444',
      'Blanco/Gris': '#d1d5db',
      'Negro Absoluto': '#000000',
      'Negro/Blanco': '#1f2937',
      'Azul Marino': '#1e3a8a',
      'Gris Jaspeado': '#9ca3af',
      'Plata': '#e5e7eb',
      'Gris Espacial': '#4b5563',
      'Blanco Estrella': '#fefce8',
      'Amarillo/Negro': '#eab308',
      'Negro': '#111827',
      'Verde Olivo': '#4d7c0f',
      'Gris': '#6b7280',
    };
    return colors[colorName] || '#52525b';
  };

  return (
    <section className="w-full py-20 bg-black relative z-10">
      <div className="max-w-[95%] mx-auto px-4">
        
        <div className="mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-white tracking-tight"
          >
            Featured Products
          </motion.h2>
        </div>

        {/* 5-column grid on XL screens */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {displayProducts.map((product, index) => {
            
            // Find if product has color variants
            const colorVariant = product.variantTypes?.find(v => v.name.includes('Color'));
            const colors = colorVariant?.options || [];

            return (
              <motion.div
                key={`featured-${product.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/catalogo/${product.id}`}
                  className="group block h-full bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:bg-zinc-800/40 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                >
                  {/* Top Image Area */}
                  <div className="w-full aspect-square relative bg-black/40 overflow-hidden p-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>

                  {/* Divider Line (as seen in user image) */}
                  <div className="w-full h-px bg-white/5" />

                  {/* Bottom Text Area */}
                  <div className="p-5 flex flex-col justify-between">
                    
                    {/* Variant Selectors (Dots) */}
                    <div className="flex items-center gap-1.5 mb-3 h-5">
                      {colors.slice(0, 4).map((color, i) => (
                        <div 
                          key={i} 
                          className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: getColorHex(color) }}
                          title={color}
                        />
                      ))}
                      {colors.length > 4 && (
                        <span className="text-[10px] text-zinc-500 ml-1">+{colors.length - 4}</span>
                      )}
                    </div>

                    <h3 className="text-sm md:text-base font-medium text-zinc-300 leading-tight mb-2 group-hover:text-white transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-emerald-400">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/store/cart-context';
import { Product } from '@/data/mockProducts';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      <Link href={`/catalogo/${product.id}`} className="flex flex-col flex-grow">
        {/* Image container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-800/50">
          {product.isNew && (
            <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black bg-white rounded-full">
              Nuevo
            </div>
          )}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Details (Top part) */}
        <div className="p-5 pb-0 flex flex-col">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="text-lg font-medium text-[#f4f4f4] mb-2 line-clamp-1">{product.name}</h3>
        </div>
      </Link>

      {/* Details (Bottom part with Add to Cart) */}
      <div className="px-5 pb-5 mt-auto flex items-end justify-between">
        <p className="text-xl font-bold text-white">${product.price.toLocaleString()}</p>
        
        <button 
          onClick={(e) => {
            e.preventDefault(); // Prevent link navigation
            addItem({ 
              ...product, 
              category: product.category as any, 
              tags: [], 
            });
          }}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg z-10 relative"
          aria-label={`Agregar ${product.name} a la bolsa`}
        >
          <ShoppingBag size={18} />
        </button>
      </div>
    </motion.div>
  );
}

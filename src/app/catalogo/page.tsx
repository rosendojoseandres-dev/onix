'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollBackground from '@/components/ScrollBackground';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { Search, ChevronDown } from 'lucide-react';

const CATEGORIES = ['Todos', 'Apple', 'Electrónica', 'Zapatos', 'Ropa'];
const SORT_OPTIONS = [
  { label: 'Destacados', value: 'featured' },
  { label: 'Precio: Menor a Mayor', value: 'price_asc' },
  { label: 'Precio: Mayor a Menor', value: 'price_desc' },
];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS;

    // Category Filter
    if (activeCategory !== 'Todos') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // Stock Filter
    if (showInStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sort
    if (sortBy === 'price_asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, showInStockOnly]);

  return (
    <>
      <ScrollBackground />

      <main className="min-h-screen flex flex-col relative overflow-x-hidden">
        <Navbar />

        {/* Categories Header */}
        <section className="pt-32 pb-4 sm:pt-40 sm:pb-8 px-4 max-w-[95%] mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-2 sm:gap-4"
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-white text-black' 
                    : 'bg-zinc-900/50 text-zinc-400 border border-white/5 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Filters and Grid */}
        <section className="flex-1 px-4 pb-24 max-w-[95%] mx-auto w-full relative z-10">
          
          {/* General Filters Toolbar */}
          <div className="mb-8 z-20 flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-900/40 border border-white/[0.05] p-4 rounded-2xl backdrop-blur-md">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* In Stock Toggle */}
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showInStockOnly ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/40'}`}>
                  {showInStockOnly && <div className="w-2.5 h-2.5 bg-black rounded-sm" />}
                </div>
                <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors select-none">Solo en stock</span>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={showInStockOnly}
                  onChange={(e) => setShowInStockOnly(e.target.checked)}
                />
              </label>

              {/* Sort Dropdown */}
              <div className="relative group min-w-[180px]">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} className="bg-zinc-900 text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} disableEntranceAnimation />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <p className="text-zinc-500 text-lg mb-4">No se encontraron productos con tu búsqueda.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setShowInStockOnly(false);
                    setSortBy('featured');
                  }}
                  className="px-6 py-2 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-colors"
                >
                  Limpiar filtros
                </button>
              </motion.div>
            )}
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}

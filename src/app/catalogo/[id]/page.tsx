'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollBackground from '@/components/ScrollBackground';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { useCart } from '@/store/cart-context';

export default function ProductDetailPage() {
  const params = useParams();
  const product = MOCK_PRODUCTS.find((p) => p.id === params?.id);
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product?.variantTypes) {
      const initial: Record<string, string> = {};
      product.variantTypes.forEach(vt => {
        initial[vt.name] = vt.options[0];
      });
      setSelectedVariants(initial);
    }
  }, [product]);

  if (!product) {
    notFound();
  }

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    // Generate a unique ID and descriptive name based on selected variants
    const variantString = product.variantTypes 
      ? product.variantTypes.map(vt => selectedVariants[vt.name]).join(' | ') 
      : '';
    
    const cartItemId = variantString ? `${product.id}-${variantString.replace(/ /g, '')}` : product.id;
    const cartItemName = variantString ? `${product.name} (${variantString})` : product.name;
    
    for (let i = 0; i < quantity; i++) {
      addItem({ 
        ...product,
        category: product.category as any,
        tags: [],
        id: cartItemId, 
        name: cartItemName, 
      });
    }
  };

  return (
    <>
      <ScrollBackground />

      <main className="min-h-screen flex flex-col relative overflow-x-hidden">
        <Navbar />

        <section className="flex-1 pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10">
          
          {/* Back button */}
          <Link href="/catalogo" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Catálogo</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-900 border border-white/10"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>

            {/* Right: Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-6">
                <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-2">{product.category}</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#f4f4f4] mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-white">${product.price.toLocaleString()}</span>
                  
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${product.inStock ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                    {product.inStock ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {product.inStock ? 'Disponible' : 'Agotado'}
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-white/10 my-6" />

              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-3">Descripción</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Variants */}
              {product.variantTypes && product.variantTypes.map((vt) => (
                <div key={vt.name} className="mb-6">
                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">{vt.name}</h3>
                  <div className="flex flex-wrap gap-3">
                    {vt.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedVariants(prev => ({...prev, [vt.name]: option}))}
                        className={`px-4 py-2.5 md:px-4 md:py-2 rounded-xl text-sm font-medium border transition-all ${
                          selectedVariants[vt.name] === option
                            ? 'bg-white text-black border-white'
                            : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Add to Cart Actions */}
              <div className="mt-auto flex flex-row gap-3 sm:gap-4 pt-6">
                {/* Quantity */}
                <div className="flex items-center justify-between bg-zinc-900 border border-white/10 rounded-2xl px-2 w-[110px] sm:w-36 h-[60px] sm:h-14 shrink-0">
                  <button 
                    onClick={handleDecrease}
                    disabled={quantity <= 1 || !product.inStock}
                    className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-50 disabled:hover:text-zinc-400 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-lg font-medium text-white w-6 text-center">{quantity}</span>
                  <button 
                    onClick={handleIncrease}
                    disabled={!product.inStock}
                    className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-50 disabled:hover:text-zinc-400 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 h-[60px] sm:h-14 rounded-2xl flex items-center justify-center gap-2 font-medium text-base sm:text-lg transition-all shadow-lg active:scale-[0.98] disabled:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-black hover:bg-zinc-200"
                >
                  <ShoppingBag size={20} />
                  <span className="truncate">{product.inStock ? 'Añadir a la Bolsa' : 'Agotado'}</span>
                </button>
              </div>

            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

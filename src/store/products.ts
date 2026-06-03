import { LucideIcon, Smartphone, Footprints, Shirt, Headphones, Watch, Monitor, Gamepad2, Home, Camera } from 'lucide-react';

// =========================================
// PRODUCT TYPES
// =========================================

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;        // USD
  originalPrice?: number; // USD — for showing discounts
  image: string;
  description: string;
  tags: string[];       // for search matching
  inStock: boolean;
}

export type ProductCategory =
  | 'iphones'
  | 'zapatos'
  | 'ropa'
  | 'accesorios'
  | 'electronica'
  | 'hogar';

export interface CategoryInfo {
  id: ProductCategory;
  label: string;
  icon: LucideIcon;
}

// =========================================
// CATEGORIES
// =========================================

export const CATEGORIES: CategoryInfo[] = [
  { id: 'iphones', label: 'iPhones', icon: Smartphone },
  { id: 'electronica', label: 'Electrónica', icon: Monitor },
  { id: 'zapatos', label: 'Calzado', icon: Footprints },
  { id: 'ropa', label: 'Moda', icon: Shirt },
  { id: 'accesorios', label: 'Accesorios', icon: Watch },
  { id: 'hogar', label: 'Hogar', icon: Home },
];

// =========================================
// PRODUCT CATALOG
// =========================================

export const PRODUCTS: Product[] = [
  // --- iPhones ---
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    category: 'iphones',
    price: 1099,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop',
    description: 'Chip A17 Pro, cámara de 48MP con zoom óptico 5x, titanio natural.',
    tags: ['apple', 'iphone', 'smartphone', 'titanio', 'pro max', 'a17'],
    inStock: true,
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    category: 'iphones',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=600&auto=format&fit=crop',
    description: 'Diseño de titanio ultraligero con chip A17 Pro y Dynamic Island.',
    tags: ['apple', 'iphone', 'smartphone', 'titanio', 'pro', 'a17'],
    inStock: true,
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    category: 'iphones',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1667475624898-a866e3c6e7c6?q=80&w=600&auto=format&fit=crop',
    description: 'Chip A15 Bionic, sistema avanzado de cámara dual de 12MP.',
    tags: ['apple', 'iphone', 'smartphone', 'a15', 'cámara dual'],
    inStock: true,
  },

  // --- Electrónica ---
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2',
    category: 'electronica',
    price: 189,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=600&auto=format&fit=crop',
    description: 'Cancelación activa de ruido, audio adaptativo, estuche con carga USB-C.',
    tags: ['apple', 'airpods', 'audífonos', 'earbuds', 'bluetooth', 'cancelación ruido'],
    inStock: true,
  },
  {
    id: 'gopro-hero-12',
    name: 'GoPro HERO 12',
    category: 'electronica',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop',
    description: 'Cámara de acción 5.3K, estabilización HyperSmooth 6.0, resistente al agua.',
    tags: ['gopro', 'cámara', 'action cam', 'video', '5k', 'deportes'],
    inStock: true,
  },
  {
    id: 'nintendo-switch-oled',
    name: 'Nintendo Switch OLED',
    category: 'electronica',
    price: 279,
    originalPrice: 349,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=600&auto=format&fit=crop',
    description: 'Pantalla OLED de 7 pulgadas, modo portátil y dock para TV.',
    tags: ['nintendo', 'switch', 'consola', 'videojuegos', 'oled', 'gaming'],
    inStock: true,
  },

  // --- Calzado ---
  {
    id: 'nike-air-max-90',
    name: 'Nike Air Max 90',
    category: 'zapatos',
    price: 89,
    originalPrice: 130,
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=600&auto=format&fit=crop',
    description: 'Clásico retro con amortiguación Air visible. Estilo atemporal.',
    tags: ['nike', 'air max', 'zapatillas', 'sneakers', 'retro', 'deportivo'],
    inStock: true,
  },
  {
    id: 'adidas-ultraboost',
    name: 'Adidas Ultraboost 23',
    category: 'zapatos',
    price: 119,
    originalPrice: 190,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600&auto=format&fit=crop',
    description: 'Tecnología Boost para máxima comodidad y retorno de energía.',
    tags: ['adidas', 'ultraboost', 'running', 'zapatillas', 'boost', 'deportivo'],
    inStock: true,
  },

  // --- Moda ---
  {
    id: 'north-face-jacket',
    name: 'The North Face Puffer',
    category: 'ropa',
    price: 149,
    originalPrice: 250,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop',
    description: 'Chaqueta puffer con aislamiento térmico 700-fill. Ligera y cálida.',
    tags: ['north face', 'chaqueta', 'puffer', 'abrigo', 'invierno', 'jacket'],
    inStock: true,
  },
  {
    id: 'levis-501-jeans',
    name: "Levi's 501 Original",
    category: 'ropa',
    price: 49,
    originalPrice: 79,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop',
    description: 'El jean clásico por excelencia. Corte recto, denim premium.',
    tags: ['levis', 'jeans', 'denim', 'pantalón', '501', 'clásico'],
    inStock: true,
  },

  // --- Accesorios ---
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    category: 'accesorios',
    price: 649,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=600&auto=format&fit=crop',
    description: 'Caja de titanio de 49mm, GPS + Celular, doble frecuencia.',
    tags: ['apple', 'watch', 'reloj', 'smartwatch', 'ultra', 'titanio', 'fitness'],
    inStock: true,
  },
  {
    id: 'ray-ban-wayfarer',
    name: 'Ray-Ban Wayfarer Classic',
    category: 'accesorios',
    price: 89,
    originalPrice: 163,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop',
    description: 'El ícono atemporal. Montura de acetato, lentes de cristal verde G-15.',
    tags: ['ray-ban', 'gafas', 'lentes', 'sol', 'wayfarer', 'clásico'],
    inStock: true,
  },

  // --- Hogar ---
  {
    id: 'dyson-v15',
    name: 'Dyson V15 Detect',
    category: 'hogar',
    price: 499,
    originalPrice: 749,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=600&auto=format&fit=crop',
    description: 'Aspiradora inalámbrica con láser para detectar partículas microscópicas.',
    tags: ['dyson', 'aspiradora', 'hogar', 'limpieza', 'inalámbrica', 'v15'],
    inStock: true,
  },
  {
    id: 'nespresso-vertuo',
    name: 'Nespresso Vertuo Next',
    category: 'hogar',
    price: 129,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=600&auto=format&fit=crop',
    description: 'Cafetera con tecnología Centrifusion para café espresso y americano.',
    tags: ['nespresso', 'cafetera', 'café', 'hogar', 'cocina', 'espresso'],
    inStock: true,
  },
];

// =========================================
// HELPERS
// =========================================

export function searchProducts(query: string, category?: ProductCategory): Product[] {
  const normalizedQuery = query.toLowerCase().trim();

  return PRODUCTS.filter((product) => {
    // Category filter
    if (category && product.category !== category) return false;

    // If empty query, return all (or all in category)
    if (!normalizedQuery) return true;

    // Search in name, description, category, and tags
    const searchFields = [
      product.name,
      product.description,
      product.category,
      ...product.tags,
    ]
      .join(' ')
      .toLowerCase();

    // Match all words in the query
    const words = normalizedQuery.split(/\s+/);
    return words.every((word) => searchFields.includes(word));
  });
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function getDiscountPercentage(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function getCategoryLabel(categoryId: ProductCategory): string {
  const found = CATEGORIES.find((c) => c.id === categoryId);
  return found?.label ?? categoryId;
}

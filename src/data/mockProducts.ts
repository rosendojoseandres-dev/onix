export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
  description: string;
  variantTypes?: { name: string; options: string[] }[];
  inStock: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '9',
    name: 'EcoFlow DELTA 2',
    category: 'Electrónica',
    price: 300,
    image: 'https://websiteoss.ecoflow.com/media/delta2/pc/8ffbd023f0fdc44f69f8ed08387f99e1.jpg',
    isNew: true,
    description: 'La EcoFlow DELTA 2 es una estación de energía portátil de 1024 Wh que proporciona seguridad energética para el hogar y alimenta prácticamente cualquier dispositivo. Recarga del 0% al 80% en tan solo 50 minutos gracias a la tecnología X-Stream. Con 1800 W de potencia de salida AC, 15 puertos de carga simultánea, compatible con paneles solares de hasta 500 W y batería LFP de larga duración. Ideal para apagones, campamentos, caravanas y uso domiciliario.',
    variantTypes: [
      { name: 'Combinación', options: ['Solo DELTA 2', 'DELTA 2 + Panel Solar 220W', 'DELTA 2 + Batería Extra'] },
    ],
    inStock: true,
  },
  { 
    id: '1', 
    name: 'iPhone 15 Pro Max', 
    category: 'Apple', 
    price: 1199, 
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop', 
    isNew: true, 
    description: 'El iPhone más avanzado con un diseño de titanio de calidad aeroespacial. Chip A17 Pro y un sistema de cámaras superpotente.', 
    variantTypes: [
      { name: 'Color', options: ['Titanio Natural', 'Titanio Blanco', 'Titanio Negro'] },
      { name: 'Almacenamiento', options: ['256GB', '512GB', '1TB'] }
    ], 
    inStock: true 
  },
  { 
    id: '2', 
    name: 'AirPods Pro 2', 
    category: 'Apple', 
    price: 249, 
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop', 
    description: 'Cancelación Activa de Ruido superior, modo Ambiente adaptable y audio espacial personalizado.', 
    variantTypes: [
      { name: 'Color', options: ['Blanco'] },
      { name: 'Estuche', options: ['MagSafe (USB-C)', 'MagSafe (Lightning)'] }
    ],
    inStock: true
  },
  { 
    id: '3', 
    name: 'Nike Air Max 270', 
    category: 'Zapatos', 
    price: 160, 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop', 
    isNew: true, 
    description: 'Diseño legendario que ofrece un confort inigualable en cada pisada gracias a la gran unidad Air Max en el talón.', 
    variantTypes: [
      { name: 'Talla (US)', options: ['8', '9', '10', '11'] },
      { name: 'Color', options: ['Rojo/Negro', 'Blanco/Gris', 'Negro Absoluto'] }
    ],
    inStock: true
  },
  { 
    id: '4', 
    name: 'Adidas Ultraboost', 
    category: 'Zapatos', 
    price: 180, 
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop', 
    description: 'Zapatillas de running premium con mediasuela Boost que ofrece un retorno de energía increíble y ajuste tipo calcetín.', 
    variantTypes: [
      { name: 'Talla (US)', options: ['7', '8', '9', '10'] },
      { name: 'Color', options: ['Negro/Blanco', 'Azul Marino', 'Gris Jaspeado'] }
    ],
    inStock: false
  },
  { 
    id: '5', 
    name: 'MacBook Air M3', 
    category: 'Apple', 
    price: 1099, 
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop', 
    description: 'Increíblemente delgada y rápida con el chip M3, ideal para el trabajo o el estudio. Batería para todo el día.', 
    variantTypes: [
      { name: 'Color', options: ['Plata', 'Gris Espacial', 'Blanco Estrella'] },
      { name: 'Memoria', options: ['8GB', '16GB', '24GB'] },
      { name: 'Almacenamiento', options: ['256GB', '512GB', '1TB'] }
    ],
    inStock: true
  },
  { 
    id: '6', 
    name: 'Chaqueta North Face', 
    category: 'Ropa', 
    price: 299, 
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop', 
    description: 'Chaqueta resistente al agua y al viento, perfecta para expediciones o climas fríos urbanos. Aislamiento premium.', 
    variantTypes: [
      { name: 'Talla', options: ['S', 'M', 'L', 'XL'] },
      { name: 'Color', options: ['Amarillo/Negro', 'Negro', 'Verde Olivo'] }
    ],
    inStock: true
  },
  { 
    id: '7', 
    name: 'Camiseta Essential', 
    category: 'Ropa', 
    price: 45, 
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop', 
    description: 'Nuestra clásica camiseta de algodón orgánico, suave al tacto con un corte relajado moderno.', 
    variantTypes: [
      { name: 'Talla', options: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Color', options: ['Blanco', 'Negro', 'Gris'] }
    ],
    inStock: true
  },
  { 
    id: '8', 
    name: 'Apple Watch Ultra 2', 
    category: 'Apple', 
    price: 799, 
    image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=1000&auto=format&fit=crop', 
    isNew: true, 
    description: 'El smartwatch más resistente e inteligente. Caja de titanio de 49 mm, GPS de precisión de doble frecuencia.', 
    variantTypes: [
      { name: 'Correa', options: ['Ocean', 'Alpine', 'Trail'] },
      { name: 'Tamaño', options: ['S/M', 'M/L'] }
    ],
    inStock: false
  },
];

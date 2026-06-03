'use client';

import { CartProvider } from '@/store/cart-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

'use client';

import { CartProvider } from '@/store/cart-context';
import { CheckoutProvider } from '@/store/checkout-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CheckoutProvider>{children}</CheckoutProvider>
    </CartProvider>
  );
}

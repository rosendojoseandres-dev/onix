'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

// =========================================
// TYPES
// =========================================

export type PaymentMethod = 'transferencia' | 'efectivo' | 'pago_movil';

export interface CheckoutData {
  // Personal info
  fullName: string;
  email: string;
  whatsapp: string;
  // Shipping
  country: 'colombia' | 'venezuela' | '';
  city: string;
  address: string;
  // Payment
  paymentMethod: PaymentMethod;
  // Order metadata (set at confirmation)
  orderNumber: string;
  orderDate: string;
}

interface CheckoutContextValue {
  data: CheckoutData;
  updateData: (partial: Partial<CheckoutData>) => void;
  resetCheckout: () => void;
}

// =========================================
// DEFAULTS
// =========================================

const defaultData: CheckoutData = {
  fullName: '',
  email: '',
  whatsapp: '',
  country: '',
  city: '',
  address: '',
  paymentMethod: 'transferencia',
  orderNumber: '',
  orderDate: '',
};

// =========================================
// CONTEXT
// =========================================

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CheckoutData>(defaultData);

  const updateData = useCallback((partial: Partial<CheckoutData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetCheckout = useCallback(() => {
    setData(defaultData);
  }, []);

  return (
    <CheckoutContext.Provider value={{ data, updateData, resetCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextValue {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}

// =========================================
// HELPERS
// =========================================

export function generateOrderNumber(): string {
  const prefix = 'ONX';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function getPaymentMethodLabel(method: PaymentMethod): string {
  const labels: Record<PaymentMethod, string> = {
    transferencia: 'Transferencia Bancaria',
    efectivo: 'Efectivo / Contraentrega',
    pago_movil: 'Pago Móvil / WhatsApp',
  };
  return labels[method];
}

export function getCountryLabel(country: CheckoutData['country']): string {
  if (country === 'colombia') return 'Colombia';
  if (country === 'venezuela') return 'Venezuela';
  return '';
}

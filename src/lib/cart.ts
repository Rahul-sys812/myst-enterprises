'use client';

import { ProductItem } from '@/types';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  product: ProductItem;
  quantity: number;
  selectedOption?: string;
  unitPrice: number;
}

const CART_STORAGE_KEY = 'myst_cart_items_v1';

export function parsePrice(priceStr: string | number): number {
  if (typeof priceStr === 'number') return priceStr;
  const cleaned = priceStr.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}

export function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading cart', err);
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('myst_cart_updated'));
  } catch (err) {
    console.error('Error saving cart', err);
  }
}

export function addToCart(product: ProductItem, quantity: number = 1, option?: string) {
  const current = getStoredCart();
  const existingIdx = current.findIndex(i => i.product.id === product.id && i.selectedOption === option);
  const unitPrice = parsePrice(product.price);

  let updated: CartItem[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx].quantity += quantity;
  } else {
    updated = [
      ...current,
      {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity,
        selectedOption: option || 'Standard Package',
        unitPrice
      }
    ];
  }

  saveCart(updated);
  toast.success(`${product.title} added to cart!`, {
    description: `₹${(unitPrice * quantity).toLocaleString()} • Ready for WhatsApp order`,
    action: {
      label: 'View Cart',
      onClick: () => {
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          window.location.href = '/cart';
        }
      }
    }
  });
}

export function removeFromCart(itemId: string) {
  const current = getStoredCart();
  const updated = current.filter(i => i.id !== itemId);
  saveCart(updated);
  toast.info('Item removed from cart');
}

export function updateCartQuantity(itemId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(itemId);
    return;
  }
  const current = getStoredCart();
  const updated = current.map(item => {
    if (item.id === itemId) {
      return { ...item, quantity };
    }
    return item;
  });
  saveCart(updated);
}

export function clearCart() {
  saveCart([]);
}

export function getCartTotal(items: CartItem[]): {
  subtotal: number;
  gst: number;
  total: number;
  count: number;
} {
  const subtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const gst = 0; // Transparent zero hidden charges or standard commercial rate
  const total = subtotal + gst;
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return { subtotal, gst, total, count };
}

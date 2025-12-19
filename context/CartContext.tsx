import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/types';

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod = 'PIX' | 'Cartão' | 'Dinheiro';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  totalItems: number;
  cartTotal: number;
  userAddress: string | null;
  setUserAddress: (address: string | null) => void;
  addressComplement: string;
  setAddressComplement: (complement: string) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  changeAmount: string;
  setChangeAmount: (amount: string) => void;
  locationLink: string | null;
  setLocationLink: (link: string | null) => void;
  isAddressModalOpen: boolean;
  setAddressModalOpen: (open: boolean) => void;
  finishOrder: () => void;
  checkoutAfterAddress: boolean;
  setCheckoutAfterAddress: (val: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'bever_cart';
const ADDRESS_KEY = 'bever_address';
const COMPLEMENT_KEY = 'bever_complement';
const LAT_KEY = 'bever_lat';
const LNG_KEY = 'bever_lng';
const FREE_SHIPPING_THRESHOLD = 100;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load cart:', error);
      return [];
    }
  });

  const [userAddress, setUserAddressState] = useState<string | null>(() => {
    return localStorage.getItem(ADDRESS_KEY);
  });

  const [addressComplement, setAddressComplementState] = useState<string>(() => {
    return localStorage.getItem(COMPLEMENT_KEY) || '';
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX');
  const [changeAmount, setChangeAmount] = useState('');
  const [locationLink, setLocationLink] = useState<string | null>(null);
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [checkoutAfterAddress, setCheckoutAfterAddress] = useState(false);

  const setUserAddress = (address: string | null) => {
    setUserAddressState(address);
    if (address) {
      localStorage.setItem(ADDRESS_KEY, address);
    } else {
      localStorage.removeItem(ADDRESS_KEY);
      localStorage.removeItem(LAT_KEY);
      localStorage.removeItem(LNG_KEY);
    }
  };

  const setAddressComplement = (complement: string) => {
    setAddressComplementState(complement);
    localStorage.setItem(COMPLEMENT_KEY, complement);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const finishOrder = () => {
    if (items.length === 0) return;

    const currentAddress = userAddress || localStorage.getItem(ADDRESS_KEY);

    if (!currentAddress) {
      setCheckoutAfterAddress(true);
      setAddressModalOpen(true);
      return;
    }

    const formattedTotal = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(cartTotal);

    const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
    const phoneNumber = "5587999279050";
    
    // Packing List Format: Quantity + Name only
    const cartItemsList = items
      .map(item => `▫️ ${item.quantity}x ${item.name}`)
      .join('\n');

    let paymentInfoText = `💳 *Pagamento:* ${paymentMethod}`;
    if (paymentMethod === 'Dinheiro' && changeAmount) {
      paymentInfoText += ` (Troco p/ R$ ${changeAmount})`;
    }

    // Geolocation Precision Link
    const lat = localStorage.getItem(LAT_KEY);
    const lng = localStorage.getItem(LNG_KEY);
    let finalMapsLink = "";

    if (lat && lng) {
      finalMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    } else {
      finalMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentAddress + ", Belo Jardim - PE")}`;
    }

    const fullAddressText = addressComplement 
      ? `${currentAddress}, ${addressComplement}`
      : currentAddress;

    // Professional Receipt Template
    const message = `👋 *Olá! Gostaria de confirmar meu pedido:*\n\n` +
      `📋 *ITENS:*\n` +
      `${cartItemsList}\n\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *ENTREGA:*\n` +
      `${fullAddressText}\n\n` +
      `🗺️ *GPS:* ${finalMapsLink}\n` +
      `━━━━━━━━━━━━━━━━━━━\n\n` +
      `${paymentInfoText}\n` +
      `💰 *TOTAL:* ${formattedTotal}` +
      (isFreeShipping ? `\n🚚 *[FRETE GRÁTIS APLICADO]*` : '');

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      totalItems, 
      cartTotal,
      userAddress,
      setUserAddress,
      addressComplement,
      setAddressComplement,
      paymentMethod,
      setPaymentMethod,
      changeAmount,
      setChangeAmount,
      locationLink,
      setLocationLink,
      isAddressModalOpen,
      setAddressModalOpen,
      finishOrder,
      checkoutAfterAddress,
      setCheckoutAfterAddress
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
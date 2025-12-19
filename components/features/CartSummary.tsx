
import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Plus, Snowflake, X as CloseIcon, Truck } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import ScaleButton from '../ui/ScaleButton';

const FREE_SHIPPING_THRESHOLD = 100;

const CartSummary: React.FC = () => {
  const { totalItems, cartTotal, finishOrder, items, addToCart } = useCart();
  const [isIceDismissed, setIsIceDismissed] = useState(false);

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cartTotal);

  // Business Logic: Smart Ice Cross-Sell
  const hasBeer = items.some(item => item.category === 'Cervejas');
  const hasIce = items.some(item => item.name.toLowerCase().includes('gelo'));
  const showIceCrossSell = hasBeer && !hasIce && !isIceDismissed;

  // Free Shipping Logic
  const freeShippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal;
  const isFreeShippingReached = cartTotal >= FREE_SHIPPING_THRESHOLD;

  const addIceToCart = () => {
    const iceProduct = products.find(p => p.id === 'ice-1'); // Gelo Cubo 5kg
    if (iceProduct) {
      addToCart(iceProduct);
    }
  };

  const handleOrderClick = () => {
    const currentHour = new Date().getHours();
    const isOpen = currentHour >= 8 && currentHour < 22;

    if (!isOpen) {
      const proceed = window.confirm(
        "Estamos fechados agora (Horário: 08h às 22h). \n\nDeseja enviar o pedido para agendar ou aguardar o próximo horário de abertura?"
      );
      if (!proceed) return;
    }

    finishOrder();
  };

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        /* Added explicit cast to bypass Framer Motion type inference issues in current environment */
        <motion.div
          initial={{ y: 100, opacity: 0 } as any}
          animate={{ y: 0, opacity: 1 } as any}
          exit={{ y: 100, opacity: 0 } as any}
          className="fixed bottom-[88px] left-4 right-4 z-[45] flex flex-col gap-2 pointer-events-none"
        >
          {/* Cross-sell Notification */}
          <AnimatePresence>
            {showIceCrossSell && (
              <motion.div
                layout={"position" as any}
                initial={{ opacity: 0, scale: 0.9, y: 10 } as any}
                animate={{ opacity: 1, scale: 1, y: 0 } as any}
                exit={{ opacity: 0, scale: 0.8, x: -100 } as any}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(event: any, info: PanInfo) => Math.abs(info.offset.x) > 80 && setIsIceDismissed(true)}
                className="pointer-events-auto max-w-md mx-auto w-full bg-blue-600 text-white px-5 py-4 rounded-3xl flex items-center justify-between shadow-lg shadow-blue-500/20 border border-blue-400/30 relative overflow-hidden"
              >
                <button onClick={() => setIsIceDismissed(true)} className="absolute top-2 right-3 p-1.5 opacity-60"><CloseIcon size={14} /></button>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/20 rounded-2xl"><Snowflake size={20} /></div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-tight">Esqueceu o Gelo?</p>
                    <p className="text-[11px] font-medium text-blue-100">Cerveja quente ninguém merece!</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.94 } as any}
                  whileHover={{ scale: 1.02 } as any}
                  onClick={addIceToCart}
                  className="bg-white text-blue-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-1 shadow-md"
                >
                  <Plus size={14} strokeWidth={4} /> Adicionar
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Checkout Bar & Progress */}
          <div className="max-w-md w-full mx-auto flex flex-col gap-2 pointer-events-auto">
            {/* Free Shipping Progress Bar */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-slate-100 flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <Truck size={14} className={isFreeShippingReached ? 'text-green-500' : 'text-slate-400'} />
                  <span className={`text-[10px] font-black uppercase tracking-tight ${isFreeShippingReached ? 'text-green-600' : 'text-slate-500'}`}>
                    {isFreeShippingReached
                      ? "Parabéns! Frete Grátis garantido! 🎉"
                      : `Faltam R$ ${remainingForFreeShipping.toFixed(2).replace('.', ',')} para Frete Grátis 🛵`
                    }
                  </span>
                </div>
                {!isFreeShippingReached && (
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Alvo: R$ 100</span>
                )}
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                {/* Added explicit cast to bypass Framer Motion type inference issues in current environment */}
                <motion.div
                  initial={{ width: 0 } as any}
                  animate={{ width: `${freeShippingProgress}%` } as any}
                  className={`h-full transition-colors duration-500 ${isFreeShippingReached ? 'bg-green-500' : 'bg-action-500'}`}
                />
              </div>
            </div>

            {/* Main Bar */}
            <div className="bg-slate-900 text-white p-4 rounded-[2.5rem] flex items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-lg">
              <div className="flex items-center gap-4 pl-2">
                <div className="relative bg-white/10 p-2.5 rounded-2xl text-amber-500">
                  <ShoppingBag size={24} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter leading-none">{formattedTotal}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                  </span>
                </div>
              </div>

              <ScaleButton
                variant="primary"
                onClick={handleOrderClick}
                className="h-14 px-7 bg-amber-500 text-white rounded-2xl shadow-xl shadow-amber-500/40 border-none"
              >
                <span className="text-base font-black uppercase tracking-tight">Pagar</span>
                <ArrowRight size={22} strokeWidth={4} />
              </ScaleButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSummary;

import React from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, MessageCircle, MapPin } from 'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import ScaleButton from '../components/ui/ScaleButton';

interface CartProps {
  onBack: () => void;
}

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const x = useMotionValue(0);
  
  const opacity = useTransform(x, [-100, -20], [1, 0]);
  const scale = useTransform(x, [-100, -20], [1.2, 0.8]);
  const iconColor = useTransform(x, [-100, -80], ["#ffffff", "#fca5a5"]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -120 || info.velocity.x < -500) {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl mb-4">
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-red-500 flex items-center justify-end px-8 rounded-2xl"
      >
        <motion.div 
          style={{ scale, color: iconColor }}
          className="flex flex-col items-center gap-1"
        >
          <Trash2 size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest">Excluir</span>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 relative z-10 touch-pan-y"
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100 p-2">
          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
        </div>

        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-slate-800 truncate text-sm">{item.name}</h3>
          <p className="text-xs text-slate-400 font-bold uppercase">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
          </p>
        </div>

        <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-9 h-9 flex items-center justify-center text-slate-500"
          >
            {item.quantity === 1 ? <Trash2 size={16} className="text-red-500" /> : <Minus size={16} strokeWidth={3} />}
          </motion.button>
          
          <span className="w-6 text-center font-black text-slate-900 text-sm">
            {item.quantity}
          </span>

          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-9 h-9 flex items-center justify-center text-action-600"
          >
            <Plus size={18} strokeWidth={3} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const Cart: React.FC<CartProps> = ({ onBack }) => {
  const { items, cartTotal, userAddress, setAddressModalOpen, finishOrder } = useCart();

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cartTotal);

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 px-6 text-center"
      >
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Sua taça está vazia!</h2>
        <p className="text-slate-500 mb-8 max-w-[250px]">
          Parece que você ainda não adicionou nenhuma bebida ao seu carrinho.
        </p>
        <ScaleButton onClick={onBack} variant="primary" className="px-8 py-3 uppercase tracking-widest text-xs">
          Voltar para o Menu
        </ScaleButton>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] px-5">
      <div className="flex items-center gap-4 mb-6 pt-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Revisar Pedido</h2>
      </div>

      <div className="flex-grow pb-40">
        <button 
          onClick={() => setAddressModalOpen(true)}
          className="w-full flex items-center justify-between p-4 bg-action-500/5 rounded-2xl border border-action-500/10 mb-6 text-left"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-white rounded-xl text-action-600 shadow-sm shrink-0">
              <MapPin size={20} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-action-600 uppercase tracking-tight">Entregar em</p>
              <p className="text-sm font-bold text-slate-800 truncate">
                {userAddress || "Definir endereço de entrega..."}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-black text-action-600 uppercase ml-2 underline">Editar</span>
        </button>

        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -100 }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            >
              <CartItemRow item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-[80px] left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 pb-6 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-end px-2">
            <span className="text-slate-400 font-bold text-sm uppercase">Valor Total</span>
            <span className="text-3xl font-extrabold text-slate-900 leading-none tracking-tight">
              {formattedTotal}
            </span>
          </div>
          
          <ScaleButton
            onClick={finishOrder}
            fullWidth
            className="py-4 text-lg shadow-xl"
          >
            <span className="uppercase tracking-widest text-sm">Finalizar no WhatsApp</span>
            <MessageCircle size={22} className="fill-white/20" />
          </ScaleButton>
        </div>
      </div>
    </div>
  );
};

export default Cart;
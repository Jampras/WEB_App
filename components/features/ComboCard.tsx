import React, { useState } from 'react';
import { Plus, Check, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../types/types';
import { useCart } from '../../context/CartContext';
import ScaleButton from '../ui/ScaleButton';

interface ComboCardProps {
  product: Product;
  index: number;
}

const ComboCard: React.FC<ComboCardProps> = ({ product, index }) => {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const quantityInCart = items.find(i => i.id === product.id)?.quantity || 0;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-row w-[85vw] md:min-w-[400px] h-40 bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden snap-center relative"
    >
      {/* Premium border highlight */}
      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-amber-500 z-10" />

      {/* Left: Image Container (35%) */}
      <div className="w-[35%] h-full bg-slate-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
        />
        {product.badge && (
          <div className="absolute top-2 left-4 bg-amber-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-md z-20 uppercase tracking-tighter">
            {product.badge}
          </div>
        )}
      </div>

      {/* Right: Info (65%) */}
      <div className="w-[65%] p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-black text-slate-900 leading-tight mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[10px] text-slate-500 font-medium line-clamp-3 leading-snug">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-black text-slate-900 tracking-tighter">
            {formattedPrice}
          </span>

          <ScaleButton
            onClick={handleAddToCart}
            className={`
              h-9 px-3 rounded-xl transition-all duration-300
              ${justAdded 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-900 text-white'
              }
            `}
          >
            <AnimatePresence mode="wait">
              {justAdded ? (
                <motion.div 
                  key="added"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check size={16} strokeWidth={4} />
                </motion.div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Plus size={16} strokeWidth={3} />
                  <span className="text-[9px] font-black uppercase">Kit</span>
                </div>
              )}
            </AnimatePresence>
          </ScaleButton>
        </div>
      </div>

      {/* Cart Quantity Indicator */}
      {quantityInCart > 0 && !justAdded && (
        <div className="absolute top-2 right-2 bg-action-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-black border-2 border-white shadow-sm">
          {quantityInCart}
        </div>
      )}
    </motion.div>
  );
};

export default ComboCard;
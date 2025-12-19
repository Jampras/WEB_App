
import React, { useState } from 'react';
import { Plus, Check, Zap, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../types/types';
import { useCart } from '../../context/CartContext';
import ScaleButton from '../ui/ScaleButton';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const quantityInCart = items.find(i => i.id === product.id)?.quantity || 0;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  const isCold = index % 3 === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  // Badge Logic based on text content
  const getBadgeColor = (badge: string) => {
    if (badge.includes('Mais Vendido') || badge.includes('Sugestão')) return 'bg-amber-500';
    if (badge.includes('Economia') || badge.includes('Promo')) return 'bg-red-500';
    if (badge.includes('Premium')) return 'bg-blue-600';
    return 'bg-slate-700';
  };

  return (
    /* Added explicit cast to bypass Framer Motion type inference issues in current environment */
    <motion.div
      initial={{ opacity: 0, scale: 0.9 } as any}
      animate={{ opacity: 1, scale: 1 } as any}
      transition={{ duration: 0.4, delay: (index % 5) * 0.05, type: "spring", stiffness: 260, damping: 20 } as any}
      className="flex flex-col w-44 h-full bg-white rounded-[2rem] border border-slate-100 shadow-sm group relative shrink-0 overflow-hidden"
    >
      <div className="relative h-36 w-full p-4 overflow-hidden bg-slate-50 group-hover:bg-white transition-colors duration-500">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Dynamic Marketing Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 text-white text-[9px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-lg z-20 ${getBadgeColor(product.badge)}`}>
            {product.badge}
          </div>
        )}

        <div className="absolute bottom-2 left-3 z-20">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-xl border border-white/20 shadow-md">
            <span className="text-[8px] font-black text-slate-800 uppercase tracking-tighter flex items-center gap-1">
              {isCold ? '❄️ Gelada' : '🔥 Rápido'}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-tight mb-1 line-clamp-2 min-h-[2rem]">
            {product.name}
          </h3>
          <span className="text-xl font-black text-slate-900 leading-none tracking-tighter block mb-3">
            {formattedPrice}
          </span>
        </div>

        <ScaleButton
          onClick={handleAddToCart}
          className={`
            w-full h-10 rounded-xl transition-all duration-300
            ${justAdded 
              ? 'bg-green-500 text-white shadow-green-500/20' 
              : quantityInCart > 0 
                ? 'bg-action-500 text-white shadow-action-500/20' 
                : 'bg-action-500 text-white shadow-action-500/20'
            }
          `}
        >
          <AnimatePresence mode="wait">
            {justAdded ? (
              /* Added explicit cast to bypass Framer Motion type inference issues in current environment */
              <motion.div 
                key="added"
                initial={{ opacity: 0, y: 10 } as any}
                animate={{ opacity: 1, y: 0 } as any}
                exit={{ opacity: 0, y: -10 } as any}
                className="flex items-center gap-2"
              >
                <Check size={16} strokeWidth={4} />
                <span className="text-[10px] font-black uppercase">Adicionado!</span>
              </motion.div>
            ) : quantityInCart > 0 ? (
              <motion.div 
                key="cart"
                initial={{ opacity: 0 } as any}
                animate={{ opacity: 1 } as any}
                className="flex items-center gap-2"
              >
                <Check size={16} strokeWidth={4} />
                <span className="text-xs font-black">{quantityInCart} no Carrinho</span>
              </motion.div>
            ) : (
              <motion.div 
                key="add"
                initial={{ opacity: 0 } as any}
                animate={{ opacity: 1 } as any}
                className="flex items-center gap-2"
              >
                <Plus size={18} strokeWidth={4} />
                <span className="text-xs font-black uppercase">Adicionar</span>
              </motion.div>
            )}
          </AnimatePresence>
        </ScaleButton>
      </div>
    </motion.div>
  );
};

export default ProductCard;

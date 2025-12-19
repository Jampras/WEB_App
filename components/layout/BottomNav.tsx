
import React from 'react';
import { Home, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

interface BottomNavProps {
  onScrollToTop: () => void;
  currentView: 'menu' | 'cart';
  onSetView: (view: 'menu' | 'cart') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onScrollToTop, currentView, onSetView }) => {
  const { totalItems } = useCart();

  const navItems = [
    { id: 'menu', icon: Home, label: 'Início' },
    { id: 'cart', icon: ShoppingBag, label: 'Carrinho', hasBadge: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-2xl border-t border-slate-100 z-50 pb-safe shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center h-full max-w-2xl mx-auto px-4">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;

          return (
            <button 
              key={item.id}
              onClick={() => item.id === 'menu' && currentView === 'menu' ? onScrollToTop() : onSetView(item.id as any)}
              className="flex flex-col items-center justify-center relative w-20 h-16 group outline-none"
            >
              {/* Added explicit cast to bypass Framer Motion type inference issues in current environment */}
              <motion.div 
                whileTap={{ scale: 0.85 } as any}
                className={`
                  p-2 rounded-2xl transition-all duration-300
                  ${isActive ? 'bg-action-500/10 text-action-600' : 'text-slate-400 group-hover:text-slate-600'}
                `}
              >
                <Icon size={24} strokeWidth={isActive ? 3 : 2} />
              </motion.div>
              
              <span className={`
                text-[9px] font-black uppercase tracking-widest mt-1
                ${isActive ? 'text-action-700 opacity-100 translate-y-0' : 'text-slate-400 opacity-0 translate-y-1'}
                transition-all duration-300
              `}>
                {item.label}
              </span>

              {item.hasBadge && totalItems > 0 && (
                <AnimatePresence>
                  {/* Added explicit cast to bypass Framer Motion type inference issues in current environment */}
                  <motion.div
                    key={totalItems}
                    initial={{ scale: 0, rotate: -20 } as any}
                    animate={{ scale: 1, rotate: 0 } as any}
                    transition={{ type: "spring", stiffness: 500, damping: 15 } as any}
                    className="absolute top-2 right-4 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white shadow-lg z-10"
                  >
                    {totalItems}
                  </motion.div>
                </AnimatePresence>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

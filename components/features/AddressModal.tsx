
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ScaleButton from '../ui/ScaleButton';

const AddressModal: React.FC = () => {
  const { 
    userAddress, 
    setUserAddress, 
    isAddressModalOpen, 
    setAddressModalOpen, 
    finishOrder, 
    checkoutAfterAddress, 
    setCheckoutAfterAddress 
  } = useCart();
  const [inputValue, setInputValue] = useState(userAddress || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAddressModalOpen) {
      setInputValue(userAddress || '');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isAddressModalOpen, userAddress]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newAddress = inputValue.trim();
      setUserAddress(newAddress);
      setAddressModalOpen(false);
      
      // If modal was opened from a checkout intent, trigger redirect automatically
      if (checkoutAfterAddress) {
        setCheckoutAfterAddress(false);
        // finishOrder uses the updated address from context/storage
        setTimeout(() => finishOrder(), 300);
      }
    }
  };

  const handleClose = () => {
    setAddressModalOpen(false);
    setCheckoutAfterAddress(false);
  };

  return (
    <AnimatePresence>
      {isAddressModalOpen && (
        <>
          {/* Added explicit cast to bypass Framer Motion type inference issues in current environment */}
          <motion.div
            initial={{ opacity: 0 } as any}
            animate={{ opacity: 1 } as any}
            exit={{ opacity: 0 } as any}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
          />
          
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            {/* Added explicit cast to bypass Framer Motion type inference issues in current environment */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 } as any}
              animate={{ scale: 1, opacity: 1, y: 0 } as any}
              exit={{ scale: 0.9, opacity: 0, y: 20 } as any}
              className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-black text-slate-900 leading-tight">
                      Onde vamos entregar? 🛵
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Precisamos do seu endereço para the checkout.
                    </p>
                  </div>
                  <button 
                    onClick={handleClose}
                    className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleConfirm} className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-action-500">
                      <Navigation size={18} strokeWidth={2.5} />
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Rua, Número e Bairro"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder-slate-400 focus:border-action-500 outline-none transition-all"
                    />
                  </div>

                  <ScaleButton
                    type="submit"
                    fullWidth
                    disabled={!inputValue.trim()}
                    className="py-4 shadow-xl shadow-action-500/20 disabled:opacity-50 disabled:shadow-none"
                  >
                    Salvar Endereço
                  </ScaleButton>
                </form>
                
                <div className="mt-4 text-center">
                  <button 
                    onClick={handleClose}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddressModal;


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation, CreditCard, Banknote, QrCode, MapPin, Loader2 } from 'lucide-react';
import { useCart, PaymentMethod } from '../../context/CartContext';
import ScaleButton from './ScaleButton';

const AddressModal: React.FC = () => {
  const { 
    userAddress, 
    setUserAddress, 
    isAddressModalOpen, 
    setAddressModalOpen, 
    finishOrder, 
    checkoutAfterAddress, 
    setCheckoutAfterAddress,
    paymentMethod,
    setPaymentMethod,
    changeAmount,
    setChangeAmount,
    setLocationLink
  } = useCart();

  const [inputValue, setInputValue] = useState(userAddress || '');
  const [isLocating, setIsLocating] = useState(false);
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
      
      if (checkoutAfterAddress) {
        setCheckoutAfterAddress(false);
        setTimeout(() => finishOrder(), 300);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Clear precise coordinates if user types manually to avoid mismatch
    if (value !== userAddress) {
      localStorage.removeItem('bever_lat');
      localStorage.removeItem('bever_lng');
      setLocationLink(null);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Save raw coordinates for precise WhatsApp links
        localStorage.setItem('bever_lat', latitude.toString());
        localStorage.setItem('bever_lng', longitude.toString());
        
        // Use coordinates to generate the base link
        const mapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        setLocationLink(mapsLink);
        
        // In a real app, we'd reverse geocode here. 
        // For now, we set a helpful placeholder or keep the current address.
        if (!inputValue.trim()) {
          setInputValue("Minha Localização (GPS)");
        }
        
        setIsLocating(false);
        alert("📍 Localização capturada com sucesso!");
      },
      (error) => {
        console.error("Erro ao obter localização", error);
        setIsLocating(false);
        alert("Não foi possível obter sua localização. Por favor, digite o endereço manualmente.");
      },
      { enableHighAccuracy: true }
    );
  };

  const handleClose = () => {
    setAddressModalOpen(false);
    setCheckoutAfterAddress(false);
  };

  const paymentOptions: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
    { id: 'PIX', label: 'PIX', icon: <QrCode size={18} /> },
    { id: 'Cartão', label: 'Cartão', icon: <CreditCard size={18} /> },
    { id: 'Dinheiro', label: 'Dinheiro', icon: <Banknote size={18} /> },
  ];

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
                      Finalizar Pedido 🛵
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Confirme os detalhes para the entrega.
                    </p>
                  </div>
                  <button 
                    onClick={handleClose}
                    className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleConfirm} className="space-y-6">
                  {/* Address Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Endereço</label>
                      <button 
                        type="button"
                        onClick={handleGetLocation}
                        disabled={isLocating}
                        className="flex items-center gap-1 text-[10px] font-black uppercase text-action-600 hover:text-action-700 disabled:opacity-50"
                      >
                        {isLocating ? <Loader2 size={12} className="animate-spin" /> : <MapPin size={12} />}
                        Usar Localização
                      </button>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-action-500">
                        <Navigation size={18} strokeWidth={2.5} />
                      </div>
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Rua, Número e Bairro"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder-slate-400 focus:border-action-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Payment Method Section */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Forma de Pagamento</label>
                    <div className="grid grid-cols-3 gap-2">
                      {paymentOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPaymentMethod(opt.id)}
                          className={`
                            flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border-2 transition-all
                            ${paymentMethod === opt.id 
                              ? 'bg-action-500 border-action-500 text-white shadow-lg shadow-action-500/20' 
                              : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-200'
                            }
                          `}
                        >
                          {opt.icon}
                          <span className="text-[10px] font-black uppercase tracking-tighter">{opt.label}</span>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {paymentMethod === 'Dinheiro' && (
                        /* Added explicit cast to bypass Framer Motion type inference issues in current environment */
                        <motion.div
                          initial={{ height: 0, opacity: 0 } as any}
                          animate={{ height: 'auto', opacity: 1 } as any}
                          exit={{ height: 0, opacity: 0 } as any}
                          className="overflow-hidden"
                        >
                          <input
                            type="text"
                            placeholder="Troco para quanto?"
                            value={changeAmount}
                            onChange={(e) => setChangeAmount(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 placeholder-slate-400 focus:border-action-500 outline-none transition-all"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <ScaleButton
                    type="submit"
                    fullWidth
                    disabled={!inputValue.trim() || isLocating}
                    className="py-4 shadow-xl shadow-action-500/20 disabled:opacity-50 disabled:shadow-none"
                  >
                    Confirmar e Finalizar
                  </ScaleButton>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddressModal;

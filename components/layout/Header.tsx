import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const { userAddress, setAddressModalOpen } = useCart();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const hour = new Date().getHours();
      setIsOpen(hour >= 8 && hour < 22);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const displayAddress = userAddress 
    ? (userAddress.length > 25 ? userAddress.substring(0, 23) + '...' : userAddress)
    : "Onde vamos entregar?";

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <button 
          onClick={() => setAddressModalOpen(true)}
          className="flex items-center gap-3 text-left focus:outline-none group flex-1 min-w-0 p-1.5 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
        >
          <div className="p-2 bg-action-500 text-white rounded-xl shadow-sm group-active:scale-90 transition-transform shrink-0">
            <MapPin size={18} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight leading-none mb-0.5">
              Entregar em
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-black text-gray-900 leading-none truncate">
                {displayAddress}
              </span>
              <ChevronDown size={14} className="text-action-500 shrink-0" strokeWidth={3} />
            </div>
          </div>
        </button>

        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-tight shrink-0 ${
          isOpen ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-600'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          {isOpen ? 'Aberto' : 'Fechado'}
        </div>
      </div>
    </header>
  );
};

export default Header;
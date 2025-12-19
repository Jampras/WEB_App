
import React from 'react';
import { motion } from 'framer-motion';

const HeroBanner: React.FC = () => {
  return (
    <div className="px-5 mb-6">
      {/* Added explicit cast to bypass Framer Motion type inference issues in current environment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 } as any}
        animate={{ opacity: 1, scale: 1 } as any}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-action-500 to-orange-600 p-6 shadow-xl shadow-action-500/20"
      >
        <div className="relative z-10 flex flex-col gap-1">
          <h2 className="text-white text-2xl font-black tracking-tight leading-tight">
            Happy Hour em Casa! 🍻
          </h2>
          <p className="text-white/90 text-sm font-medium">
            Bebidas geladíssimas em até 30min.
          </p>
          <div className="mt-4">
            <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Aproveite Agora
            </span>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute right-0 top-0 w-24 h-24 bg-black/5 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </div>
  );
};

export default HeroBanner;

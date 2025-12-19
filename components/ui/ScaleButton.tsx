
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ScaleButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

const ScaleButton: React.FC<ScaleButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden rounded-2xl font-black transition-colors flex items-center justify-center gap-2 select-none";
  
  const variants = {
    primary: "bg-action-500 text-white shadow-lg shadow-action-500/30 hover:bg-action-400 active:bg-action-600",
    secondary: "bg-white text-slate-900 border-2 border-slate-100 shadow-sm hover:border-slate-200",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100"
  };

  return (
    /* Added explicit cast to bypass Framer Motion type inference issues in current environment */
    <motion.button
      whileTap={{ scale: 0.94, rotate: -0.5 } as any}
      whileHover={{ scale: 1.02 } as any}
      transition={{ type: "spring", stiffness: 400, damping: 20 } as any}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

export default ScaleButton;

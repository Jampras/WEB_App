
import React from 'react';
import { motion } from 'framer-motion';
import { Beer, Wine, Droplets, CupSoda, LayoutGrid } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Todos': <LayoutGrid size={22} />,
  'Cervejas': <Beer size={22} />,
  'Destilados': <Wine size={22} />,
  'Refrigerantes': <CupSoda size={22} />,
  'Água & Gelo': <Droplets size={22} />
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="py-4 overflow-x-auto no-scrollbar">
      <div className="flex gap-6 min-w-max pb-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="flex flex-col items-center gap-2 group outline-none"
            >
              {/* Added explicit cast to bypass Framer Motion type inference issues in current environment */}
              <motion.div
                whileTap={{ scale: 0.9 } as any}
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2
                  ${isSelected 
                    ? 'bg-action-500 border-action-500 text-white shadow-lg shadow-action-500/30' 
                    : 'bg-white border-slate-200 text-slate-600 group-hover:border-slate-300 shadow-sm'
                  }
                `}
              >
                {categoryIcons[category] || <LayoutGrid size={22} />}
              </motion.div>
              <span className={`
                text-[11px] font-black tracking-tight uppercase transition-colors
                ${isSelected ? 'text-action-700' : 'text-slate-500'}
              `}>
                {category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;

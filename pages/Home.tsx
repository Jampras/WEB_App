import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SearchX, ChevronRight, Sparkles } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import HeroBanner from '../components/features/HeroBanner';
import CategoryFilter from '../components/features/CategoryFilter';
import ProductCard from '../components/features/ProductCard';
import ComboCard from '../components/features/ComboCard';
import CartSummary from '../components/features/CartSummary';
import ScaleButton from '../components/ui/ScaleButton';
import { products } from '../data/products';

interface HomeProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  scrollToTop: () => void;
}

const Home: React.FC<HomeProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  scrollToTop 
}) => {
  const categories = useMemo(() => {
    return ['Todos', ...Array.from(new Set(products.map(p => p.category)))];
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        p.description?.toLowerCase().includes(lowerSearch)
      );
    }
    return result;
  }, [selectedCategory, searchTerm]);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, typeof products> = {};
    filteredProducts.forEach(product => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }
      groups[product.category].push(product);
    });
    return groups;
  }, [filteredProducts]);

  return (
    <motion.div
      initial={{ opacity: 0 } as any}
      animate={{ opacity: 1 } as any}
      exit={{ opacity: 0 } as any}
      className="pb-10"
    >
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      {!searchTerm && <HeroBanner />}

      <div className="sticky top-16 z-30 bg-slate-50/80 backdrop-blur-xl px-5 py-2 border-b border-slate-200/50">
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToTop();
          }}
        />
      </div>

      <div className="mt-6">
        {Object.keys(groupedProducts).length > 0 ? (
          Object.entries(groupedProducts).map(([category, items], groupIndex) => {
            const isComboCategory = category === 'Combos & Kits';

            return (
              <div key={category} className="mb-10">
                <div className="px-5 flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-2">
                    {isComboCategory && <Sparkles size={18} className="text-amber-500 fill-amber-500" />}
                    {category}
                    <ChevronRight size={18} className="text-action-500" strokeWidth={3} />
                  </h2>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {items.length} {items.length === 1 ? 'Opção' : 'Opções'}
                  </span>
                </div>

                {isComboCategory ? (
                  /* Featured Horizontal Scroll for Combos */
                  <div className="flex overflow-x-auto no-scrollbar gap-5 px-5 pb-6 snap-x snap-mandatory">
                    {items.map((product, index) => (
                      <div key={product.id} className="snap-center shrink-0">
                        <ComboCard 
                          product={product} 
                          index={index}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Standard Horizontal Scroll for individual items */
                  <div className="flex overflow-x-auto no-scrollbar gap-4 px-5 pb-6 snap-x">
                    {items.map((product, index) => (
                      <div key={product.id} className="snap-start">
                        <ProductCard 
                          product={product} 
                          index={index}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center px-5">
            <div className="w-28 h-28 bg-slate-100 rounded-full flex items-center justify-center mb-8 text-slate-300">
              <SearchX size={54} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">Estoque Seco? 😱</h3>
            <p className="text-sm text-slate-500 max-w-[240px] mx-auto font-medium leading-relaxed">
              Não encontramos nada com "{searchTerm}". Tente buscar por cerveja, gin ou água!
            </p>
            <ScaleButton 
              onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}
              className="mt-10 px-8 py-4 uppercase text-xs tracking-widest"
            >
              Ver Todo o Cardápio
            </ScaleButton>
          </div>
        )}
      </div>
      
      <CartSummary />
    </motion.div>
  );
};

export default Home;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import AddressModal from './components/ui/AddressModal';
import Home from './pages/Home';
import Cart from './pages/Cart';

type View = 'menu' | 'cart';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-action-500/20 pb-32">
      <Header />
      
      <main className="max-w-2xl mx-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'menu' && (
            <Home 
              key="home"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              scrollToTop={scrollToTop}
            />
          )}

          {currentView === 'cart' && (
            <Cart 
              key="cart"
              onBack={() => setCurrentView('menu')} 
            />
          )}
        </AnimatePresence>
      </main>

      <BottomNav 
        currentView={currentView}
        onSetView={setCurrentView}
        onScrollToTop={scrollToTop} 
      />

      <AddressModal />
    </div>
  );
};

export default App;
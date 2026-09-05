import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function ScrollControls() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed left-6 bottom-8 z-[9999] group">
      <button 
        onClick={scrollToTop}
        className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-transparent text-gray-400/80 dark:text-gray-500/80 hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
        title="Scroll to Top"
      >
        <ArrowUp className="w-6 h-6 lg:w-8 lg:h-8 drop-shadow-sm" strokeWidth={2.5} />
      </button>
    </div>
  );
}

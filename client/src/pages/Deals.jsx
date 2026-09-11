import React from 'react';
import { motion } from 'framer-motion';

export default function Deals() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20 relative text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-bold text-sm uppercase tracking-wider mb-4">
          Limited Time Offer
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter">
          Flash <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Deals</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
          Get up to 50% off on selected items. The clock is ticking!
        </p>
        
        <div className="flex justify-center gap-4 py-8">
          {['Days', 'Hours', 'Mins', 'Secs'].map((unit, i) => (
            <div key={unit} className="flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <span className="text-2xl md:text-3xl font-black text-primary">{Math.floor(Math.random() * 60)}</span>
              <span className="text-xs text-gray-500 font-bold uppercase">{unit}</span>
            </div>
          ))}
        </div>
        
        <button className="bg-primary hover:bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/30 transition-transform hover:-translate-y-1">
          Shop Deals Now
        </button>
      </motion.div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-6">
            About <span className="text-primary">Trendzo</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-medium">
            Trendzo started with a simple idea: bringing premium, modern products to people who appreciate minimalist design and high quality. We believe shopping should be an experience, not a chore.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            Our team scours the globe to curate collections that elevate your everyday life. From sleek electronics to essential lifestyle accessories, every item is chosen with purpose and passion.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <h3 className="text-4xl font-black text-primary mb-2">10k+</h3>
              <p className="font-bold text-gray-600 dark:text-gray-400">Happy Customers</p>
            </div>
            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <h3 className="text-4xl font-black text-primary mb-2">500+</h3>
              <p className="font-bold text-gray-600 dark:text-gray-400">Premium Products</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" 
            alt="About us" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}

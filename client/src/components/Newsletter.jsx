import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-pink-50 dark:bg-pink-900/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden"
        >
          {/* Left Text */}
          <div className="md:w-1/3 mb-8 md:mb-0 z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-fancy font-black text-gray-900 dark:text-white mb-2">
              Stay in the <span className="text-primary font-sans">Loop</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
          </div>

          {/* Center Input */}
          <div className="md:w-1/3 w-full z-10">
            <form className="flex w-full relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full pl-6 pr-32 py-4 rounded-full border-none focus:ring-2 focus:ring-primary shadow-lg dark:bg-surface-dark dark:text-white text-sm"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 px-6 bg-primary text-white font-bold rounded-full hover:bg-primary-hover transition-colors shadow-md text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right Graphic area */}
          <div className="md:w-1/3 hidden md:flex justify-end relative z-10">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center transform rotate-12">
                <Gift className="w-16 h-16 text-primary" />
              </div>
            </motion.div>
          </div>

          {/* Background circles */}
          <div className="absolute left-[-10%] top-[-50%] w-64 h-64 bg-primary rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute right-[-10%] bottom-[-50%] w-64 h-64 bg-primary rounded-full opacity-5 blur-3xl"></div>

        </motion.div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Wifi, Bluetooth, Camera, Monitor, Smartphone, Headphones, Watch } from 'lucide-react';

const brands = [
  { name: 'TechPro', icon: Monitor },
  { name: 'Bolt', icon: Zap },
  { name: 'Connect', icon: Wifi },
  { name: 'AudioX', icon: Headphones },
  { name: 'SmartLife', icon: Smartphone },
  { name: 'TimeSync', icon: Watch },
  { name: 'Vision', icon: Camera },
  { name: 'BlueLink', icon: Bluetooth },
];

export default function FeaturedBrands() {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-black/20 border-y border-gray-100 dark:border-gray-800/50 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-10">
        <h3 className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
          Featured Brands
        </h3>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left/Right Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
        
        <motion.div 
          className="flex space-x-16 px-8 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {/* Duplicate the array 3 times for a seamless loop effect */}
          {[...brands, ...brands, ...brands].map((brand, index) => {
            const Icon = brand.icon;
            return (
              <div 
                key={index} 
                className="flex items-center justify-center gap-3 text-gray-400 dark:text-gray-600 hover:text-primary dark:hover:text-primary transition-colors duration-300 min-w-max cursor-pointer"
              >
                <Icon size={32} strokeWidth={1.5} />
                <span className="text-2xl font-black font-fancy tracking-tight">{brand.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

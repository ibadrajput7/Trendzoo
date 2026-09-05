import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromoBanners() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Banner 1 - Up to 30% Off */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="group rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[350px] shadow-2xl shadow-pink-500/10 hover:shadow-pink-500/20 transition-shadow duration-500"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80" 
                alt="Promo Background" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-20 dark:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-white dark:from-pink-900/80 dark:to-background-dark opacity-90"></div>
            </div>

            <div className="z-10 w-[80%] relative">
              <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-3 block">Limited Time Offer</span>
              <h3 className="text-4xl lg:text-5xl font-fancy font-black text-gray-900 dark:text-white mb-3 leading-none">Up to 30% Off</h3>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-8">On Selected Items</p>
              <Link to="/sale" className="inline-flex items-center px-8 py-3 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary-hover transition-colors shadow-lg shadow-primary/30 transform group-hover:-translate-y-1">
                Shop Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            {/* Discount Badge */}
            <motion.div 
              whileHover={{ rotate: 0 }}
              className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-primary to-pink-600 rounded-full text-white flex flex-col items-center justify-center transform rotate-12 shadow-xl border-4 border-white dark:border-gray-900 z-10 transition-transform duration-300"
            >
              <span className="text-2xl font-black leading-none">30%</span>
              <span className="text-[10px] font-bold tracking-wider">OFF</span>
            </motion.div>
          </motion.div>

          {/* Banner 2 - MagSafe Collection */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            className="group rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[350px] shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-shadow duration-500"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1620189507195-68309c04c4d0?w=800&q=80" 
                alt="MagSafe Background" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-30 dark:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/80 dark:to-background-dark opacity-90"></div>
            </div>

            <div className="z-10 w-[80%] relative">
              <span className="text-purple-500 font-bold text-xs tracking-[0.2em] uppercase mb-3 block">New Launch</span>
              <h3 className="text-3xl lg:text-4xl font-fancy font-black text-gray-900 dark:text-white mb-8 leading-tight">Trendzo MagSafe Collection</h3>
              <Link to="/magsafe" className="inline-flex items-center text-purple-600 dark:text-purple-400 text-sm font-bold hover:underline tracking-wide group-hover:text-primary transition-colors">
                Explore Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>

          {/* Column for Banners 3 & 4 */}
          <div className="flex flex-col gap-8">
            
            {/* Banner 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group bg-surface dark:bg-surface-dark rounded-3xl p-8 flex-1 relative overflow-hidden flex items-center shadow-xl border border-gray-100 dark:border-gray-800"
            >
              <div className="z-10 w-[70%]">
                <span className="text-primary font-bold text-[10px] tracking-widest uppercase mb-2 block">Combo Deals</span>
                <h3 className="text-2xl font-fancy font-black text-gray-900 dark:text-white mb-4">Best Prices Ever</h3>
                <Link to="/combos" className="inline-flex items-center text-gray-500 hover:text-primary text-xs font-bold transition-colors uppercase tracking-wider">
                  Shop Combos <ArrowRight className="w-3 h-3 ml-2" />
                </Link>
              </div>
              
              {/* Image Asset */}
              <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-40 h-40">
                <img 
                  src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=300&q=80" 
                  alt="Combo Deals" 
                  className="w-full h-full object-contain transform group-hover:rotate-12 transition-transform duration-500 drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Banner 4 - Dark Premium */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group bg-gray-900 rounded-3xl p-8 flex-1 relative overflow-hidden flex items-center shadow-2xl shadow-black/40"
            >
              {/* Background gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800"></div>
              
              <div className="z-10 w-[70%] relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-bold text-[10px] tracking-widest uppercase mb-2 block">Trending Now</span>
                <h3 className="text-2xl font-fancy font-black text-white mb-4 leading-tight">Cool Gadgets For Gen Z</h3>
                <Link to="/trending" className="inline-flex items-center text-pink-400 hover:text-white text-xs font-bold transition-colors uppercase tracking-wider">
                  Explore Now <ArrowRight className="w-3 h-3 ml-2" />
                </Link>
              </div>
              
              {/* Image Asset */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40">
                <img 
                  src="https://images.unsplash.com/photo-1572569432755-9ca0ac5e94b2?w=300&q=80" 
                  alt="Trending" 
                  className="w-full h-full object-contain transform group-hover:-rotate-12 transition-transform duration-500 drop-shadow-2xl opacity-90"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

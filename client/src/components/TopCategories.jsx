import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/categories';

export default function TopCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.success) {
          // Sort categories by number of products descending
          const sorted = data.data.sort((a, b) => {
            const countA = a._count?.products || 0;
            const countB = b._count?.products || 0;
            return countB - countA;
          });
          setCategories(sorted.slice(0, 7)); // Take top 7
        }
      } catch (err) {
        console.error("Failed to load top categories");
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-20 mb-10 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gradient-to-r from-primary/5 via-purple-500/5 to-transparent -z-10 skew-y-3"></div>

      <div className="container mx-auto px-6 text-center">
        
        <div className="mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2"
          >
            All Your Favorites
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-fancy font-black text-gray-900 dark:text-white tracking-tight"
          >
            Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 font-sans">Categories</span>
          </motion.h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {categories.map((cat, index) => (
            <Link key={cat.id} to={`/shop?category=${cat.name.toLowerCase()}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="group flex flex-col items-center cursor-pointer"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-5 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-gray-200 dark:shadow-black/40 border-4 border-white dark:border-gray-800 group-hover:border-primary/50 relative flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  {cat.imageUrl ? (
                    <img 
                      src={cat.imageUrl} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out absolute inset-0"
                    />
                  ) : (
                    <ImageIcon className="text-gray-400 w-1/3 h-1/3" />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
                <h4 className="font-bold text-sm md:text-base text-gray-900 dark:text-white group-hover:text-primary transition-colors max-w-[120px] leading-snug">
                  {cat.name}
                </h4>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Link to="/categories" className="inline-block bg-white dark:bg-surface-dark border-2 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 font-bold px-10 py-4 rounded-full hover:border-primary hover:text-primary hover:shadow-lg transition-all duration-300 tracking-wider text-sm uppercase">
            View All Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

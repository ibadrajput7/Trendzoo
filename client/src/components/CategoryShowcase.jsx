import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/categories';

export default function CategoryShowcase() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.success) {
          setCategories(data.data.slice(0, 9)); // Show top 9
        }
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6 text-center">
        
        <div className="mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-4"
          >
            Shop By Category
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-fancy font-black text-gray-900 dark:text-white tracking-tight"
          >
            Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400 font-sans">You Need</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-5 mb-16">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, type: "spring", stiffness: 120 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-3xl overflow-hidden mb-4 relative shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-500 border-2 border-transparent group-hover:border-primary/50 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {cat.imageUrl ? (
                  <img 
                    src={cat.imageUrl} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <ImageIcon className="text-gray-400 w-1/3 h-1/3" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base group-hover:text-primary transition-colors">{cat.name}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{cat._count?.products || 0} Products</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/categories" className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-primary to-pink-500 text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary/40 transform hover:-translate-y-1 transition-all duration-300 tracking-wider">
            View All Categories <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
}

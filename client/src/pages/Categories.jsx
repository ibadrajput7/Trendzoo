import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/categories';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 md:py-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-fancy font-black text-gray-900 dark:text-white tracking-tight mb-4">
          Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Category</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl">Find exactly what you're looking for by exploring our curated categories.</p>
      </div>

      {loading ? (
        <Loader text="Loading categories..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <Link key={cat.id} to={`/shop?category=${cat.name.toLowerCase()}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-64 overflow-hidden rounded-3xl cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
                <img 
                  src={cat.imageUrl || 'https://via.placeholder.com/600'} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-3xl font-black text-white tracking-wider mb-2">{cat.name}</h3>
                  <div className="w-12 h-1 bg-primary rounded-full transition-all duration-300 group-hover:w-24"></div>
                  {cat.description && (
                    <p className="mt-4 text-sm font-medium text-white/80">
                      {cat.description}
                    </p>
                  )}
                  <div className="mt-6">
                    <span className="inline-block bg-primary text-white font-bold px-6 py-2 rounded-full shadow-lg shadow-primary/30 text-sm hover:bg-primary/90 transition-colors">
                      Explore Category
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          {categories.length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-500 font-bold">
               No categories available right now.
             </div>
          )}
        </div>
      )}
    </div>
  );
}

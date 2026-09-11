import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/products';

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.success) {
          // Assuming API returns products sorted by createdAt desc
          // We'll just slice the first 8 for "New Arrivals"
          setProducts(data.data.slice(0, 8));
        }
      } catch (err) {
        console.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 md:py-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="mb-12">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider mb-4">
          Fresh Drops
        </div>
        <h1 className="text-4xl md:text-5xl font-fancy font-black text-gray-900 dark:text-white tracking-tight mb-4">
          New <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Arrivals</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl">Be the first to get your hands on our latest and greatest products just added to the store.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05, type: "spring" }}
              className="group flex flex-col bg-white dark:bg-surface-dark rounded-3xl p-3 shadow-lg hover:shadow-2xl hover:shadow-primary/20 dark:shadow-black/50 transition-all duration-500 border border-gray-100 dark:border-gray-800 relative"
            >
              <div className="absolute top-6 right-6 z-20 bg-primary text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg transform rotate-12">
                NEW
              </div>
              <div className="relative aspect-square rounded-2xl mb-4 overflow-hidden bg-gray-100 dark:bg-gray-800 block">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.imageUrl || 'https://via.placeholder.com/500'} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out cursor-pointer"
                  />
                </Link>
                <div className="absolute inset-0 bg-black/20 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                  <motion.button 
                    onClick={(e) => { e.preventDefault(); addToCart(product); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="pointer-events-auto bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-full p-4 shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-primary hover:text-white"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-col flex-grow px-2 pb-2">
                <Link to={`/product/${product.id}`}>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer leading-relaxed">
                    {product.name}
                  </h4>
                </Link>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-black text-xl text-gray-900 dark:text-white">Rs {parseFloat(product.price).toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="md:hidden w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

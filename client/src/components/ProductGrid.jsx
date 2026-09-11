import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/products';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.success) {
          // Display up to 6 products
          setProducts(data.data.slice(0, 6));
        }
      } catch (err) {
        console.error("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-fancy font-black text-gray-900 dark:text-white tracking-tight">
              Best Selling <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Products</span>
            </h2>
          </div>
          <Link to="/products" className="hidden md:flex items-center text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary transition-colors uppercase tracking-wider">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="group flex flex-col bg-white dark:bg-surface-dark rounded-3xl p-3 shadow-lg hover:shadow-2xl hover:shadow-primary/20 dark:shadow-black/50 transition-all duration-500 border border-gray-100 dark:border-gray-800"
            >
              {/* Image Container */}
              <div className="relative aspect-square rounded-2xl mb-4 overflow-hidden bg-gray-100 dark:bg-gray-800 block">
                {product.status !== 'Active' && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] tracking-wider font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                    {product.status.toUpperCase()}
                  </div>
                )}
                
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.imageUrl || 'https://via.placeholder.com/500'} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out cursor-pointer"
                  />
                </Link>

                {/* Add to Cart Overlay */}
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

              {/* Product Info */}
              <div className="flex flex-col flex-grow px-2 pb-2">
                <Link to={`/product/${product.id}`}>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer leading-relaxed">
                    {product.name}
                  </h4>
                </Link>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-black text-xl text-gray-900 dark:text-white">${parseFloat(product.price).toFixed(2)}</span>
                  </div>
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
          {products.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              Loading products...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

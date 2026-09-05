import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Wireless Earbuds Pro',
    rating: 4.9,
    reviews: 320,
    price: 29.99,
    originalPrice: 37.99,
    discount: '20%',
    imgUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
  },
  {
    id: 2,
    name: 'MagSafe Case for iPhone 15',
    rating: 4.7,
    reviews: 210,
    price: 19.99,
    originalPrice: 24.99,
    discount: '15%',
    imgUrl: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=500&q=80',
  },
  {
    id: 3,
    name: '100W Fast Charging Cable',
    rating: 4.8,
    reviews: 180,
    price: 9.99,
    originalPrice: 13.49,
    discount: '25%',
    imgUrl: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=500&q=80',
  },
  {
    id: 4,
    name: '10000mAh Power Bank',
    rating: 4.6,
    reviews: 150,
    price: 22.99,
    originalPrice: 32.99,
    discount: '30%',
    imgUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80',
  },
  {
    id: 5,
    name: 'Premium Phone Stand',
    rating: 4.8,
    reviews: 130,
    price: 15.99,
    originalPrice: 19.99,
    discount: '20%',
    imgUrl: 'https://images.unsplash.com/photo-1586771107445-d3afeb0de203?w=500&q=80',
  },
  {
    id: 6,
    name: 'LED Neon Light',
    rating: 4.9,
    reviews: 110,
    price: 18.99,
    originalPrice: 22.99,
    discount: '15%',
    imgUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80',
  }
];

export default function ProductGrid() {
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
              <div className="relative aspect-square rounded-2xl mb-4 overflow-hidden bg-gray-100 dark:bg-gray-800">
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-pink-500 text-white text-[10px] tracking-wider font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                  {product.discount} OFF
                </div>
                
                {/* Product Image */}
                <img 
                  src={product.imgUrl} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Add to Cart Overlay (Glassmorphism) */}
                <div className="absolute inset-0 bg-black/20 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-full p-4 shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-primary hover:text-white"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow px-2 pb-2">
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-current drop-shadow-sm" />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer leading-relaxed">
                  {product.name}
                </h4>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-black text-xl text-gray-900 dark:text-white">${product.price}</span>
                    <span className="text-xs text-gray-400 line-through font-medium">${product.originalPrice}</span>
                  </div>
                  <button className="md:hidden w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

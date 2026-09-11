import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Star, ShieldCheck, Truck, RotateCcw, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/products';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
        }
      } catch (err) {
        console.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-[70vh] items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold dark:text-white">Product not found.</h2>
        <button onClick={() => navigate('/')} className="text-primary hover:underline">Go back home</button>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100 shadow-2xl dark:bg-gray-800"
        >
          {product.status !== 'Active' && (
            <div className="absolute top-6 left-6 z-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-4 py-1.5 text-xs font-bold tracking-wider text-white shadow-lg">
              {product.status.toUpperCase()}
            </div>
          )}
          <img 
            src={product.imageUrl || 'https://via.placeholder.com/600'} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110 cursor-zoom-in"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            {product.category?.name || 'Uncategorized'}
          </div>
          <h1 className="mb-4 text-4xl font-black text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {product.name}
          </h1>
          
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < 4 ? 'fill-current' : ''} />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-500">(128 Reviews)</span>
          </div>

          <div className="mb-8 flex items-baseline gap-4">
            <span className="text-4xl font-black text-gray-900 dark:text-white">
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>

          <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
            {product.description || 'This premium product is crafted with the highest quality materials to ensure durability and style. It seamlessly blends modern aesthetics with functional design, making it an essential addition to your lifestyle.'}
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <ShieldCheck className="text-green-500" size={24} />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">1 Year Warranty</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <Truck className="text-blue-500" size={24} />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Fast Shipping</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center justify-between rounded-full border-2 border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900 sm:w-1/3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl font-bold text-gray-500 hover:text-primary">-</button>
              <span className="text-lg font-black text-gray-900 dark:text-white">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-xl font-bold text-gray-500 hover:text-primary">+</button>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(product, quantity)}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-white px-8 py-4 font-bold tracking-wider text-primary shadow-xl shadow-primary/10 transition-colors hover:bg-primary hover:text-white dark:bg-gray-900 sm:w-1/3"
            >
              <ShoppingCart size={20} /> Add to Cart
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-bold tracking-wider text-white shadow-xl shadow-primary/30 transition-colors hover:bg-indigo-600 sm:w-1/3"
            >
              <Zap size={20} className="fill-current" /> Buy Now
            </motion.button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

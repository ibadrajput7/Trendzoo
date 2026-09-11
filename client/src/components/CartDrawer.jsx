import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[110] flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-gray-900"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-800">
              <h2 className="flex items-center gap-2 text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                <ShoppingBag className="text-primary" /> Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-6 dark:bg-gray-800">
                    <ShoppingBag size={48} className="text-gray-300 dark:text-gray-600" />
                  </div>
                  <p className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Your cart is empty</p>
                  <p className="text-gray-500">Looks like you haven't added anything yet.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 rounded-full bg-primary/10 px-6 py-3 font-bold text-primary hover:bg-primary/20 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div layout key={item.id} className="flex gap-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                        <img src={item.imageUrl || item.imgUrl} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between">
                          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 pr-4">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="flex items-center rounded-full border border-gray-200 dark:border-gray-700 p-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-black text-gray-900 dark:text-white">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-6 space-y-3">
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="font-medium text-green-500">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-black text-primary">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-bold tracking-wider text-white shadow-xl shadow-primary/30 hover:bg-indigo-600 transition-all transform hover:-translate-y-1"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

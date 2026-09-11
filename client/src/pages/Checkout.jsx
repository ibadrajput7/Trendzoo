import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Truck, CreditCard, ShieldCheck, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/orders';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      customerName: formData.customerName,
      email: formData.email,
      address: `${formData.address}, ${formData.city}, ${formData.zip}`,
      totalAmount: getCartTotal(),
      items: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        clearCart();
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (err) {
      alert('An error occurred while placing the order.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto max-w-md rounded-3xl bg-white p-12 shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-500 dark:bg-green-500/20"
          >
            <CheckCircle size={48} />
          </motion.div>
          <h2 className="mb-4 text-3xl font-black text-gray-900 dark:text-white">Order Confirmed!</h2>
          <p className="mb-8 text-gray-500 dark:text-gray-400">
            Thank you for shopping with Trendzo. Your order has been received and will be shipped shortly via Cash on Delivery.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full rounded-full bg-primary px-8 py-4 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 hover:bg-indigo-600"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold dark:text-white">Your cart is empty.</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-primary hover:underline">Go back to store</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center text-gray-500 hover:text-primary transition-colors font-bold">
        <ArrowLeft className="mr-2" size={20} /> Back
      </button>

      <div className="grid gap-12 lg:grid-cols-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Checkout</h1>
            <p className="text-gray-500">Please enter your shipping details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="rounded-3xl border border-gray-200/50 bg-white/50 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                <Truck className="text-primary" size={24} /> Shipping Information
              </h3>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                  <input
                    type="text" name="customerName" required value={formData.customerName} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-4 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                  <input
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-4 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Street Address</label>
                  <input
                    type="text" name="address" required value={formData.address} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-4 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                    placeholder="123 Main St"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">City</label>
                  <input
                    type="text" name="city" required value={formData.city} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-4 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">ZIP Code</label>
                  <input
                    type="text" name="zip" required value={formData.zip} onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-4 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200/50 bg-white/50 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                <CreditCard className="text-primary" size={24} /> Payment Method
              </h3>
              <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6 dark:bg-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Cash on Delivery (COD)</h4>
                    <p className="text-sm text-gray-500">Pay with cash upon delivery.</p>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                    <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-5 text-lg font-bold tracking-wider text-white shadow-xl shadow-primary/30 transition-all hover:bg-indigo-600 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <ShieldCheck size={24} />}
              {loading ? 'Processing...' : 'Place Order'}
            </motion.button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-gray-200/50 bg-gray-50/50 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50">
            <h3 className="mb-6 text-xl font-black text-gray-900 dark:text-white">Order Summary</h3>
            
            <div className="mb-6 max-h-[40vh] space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <img src={item.imageUrl || item.imgUrl} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white">Rs {(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-6 dark:border-gray-800">
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-gray-900 dark:text-white">Rs {getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span className="font-medium">Shipping</span>
                <span className="font-bold text-green-500">Free</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span className="font-medium">Taxes</span>
                <span className="font-bold text-gray-900 dark:text-white">Rs 0.00</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 dark:border-gray-800 flex justify-between">
                <span className="text-xl font-black text-gray-900 dark:text-white">Total</span>
                <span className="text-3xl font-black text-primary">Rs {getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

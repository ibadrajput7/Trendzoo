import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PackagePlus, DollarSign, UploadCloud, Loader2 } from 'lucide-react';

const API_URL_PRODUCTS = import.meta.env.VITE_BACKEND_URL + '/api/v1/products';
const API_URL_CATEGORIES = import.meta.env.VITE_BACKEND_URL + '/api/v1/categories';

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('Active');
  
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Fetch categories for dropdown
    const fetchCategories = async () => {
      try {
        const res = await fetch(API_URL_CATEGORIES);
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !categoryId) {
      setMessage({ text: 'Name, Price, and Category are required.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock || 0);
    formData.append('categoryId', categoryId);
    formData.append('status', status);
    if (images && images.length > 0) {
      images.forEach(img => {
        formData.append('images', img);
      });
    }

    try {
      const response = await fetch(API_URL_PRODUCTS, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Product created successfully!', type: 'success' });
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setCategoryId('');
        setStatus('Active');
        setImages([]);
        setPreviews([]);
      } else {
        setMessage({ text: data.message || 'Failed to create product.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Add New Product</h2>
        <p className="text-gray-500 dark:text-gray-400">List a new product in your store.</p>
      </div>

      {message.text && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className={`mb-6 rounded-2xl p-4 font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}
        >
          {message.text}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* General Information */}
          <div className="rounded-3xl border border-gray-200/50 bg-white/50 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">General Information</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Product Title</label>
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)} required
                  className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-4 font-medium text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                  placeholder="e.g. Vintage Leather Jacket"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Description</label>
                <textarea
                  rows="5" value={description} onChange={e => setDescription(e.target.value)}
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-white/50 px-4 py-4 font-medium text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                  placeholder="Write a detailed description..."
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="rounded-3xl border border-gray-200/50 bg-white/50 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Media</h3>
            
            {previews.length > 0 && (
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                    <img src={src} alt={`Preview ${idx}`} className="h-full w-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-red-600"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50/50 py-12 transition-all hover:border-primary hover:bg-primary/5 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-primary dark:hover:bg-primary/10">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white dark:bg-gray-700 dark:text-gray-400">
                <UploadCloud size={28} />
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-lg">Click to browse your files</p>
              <p className="mt-2 text-sm text-gray-500">Supports JPG, PNG, WEBP (Multiple allowed)</p>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        <div className="space-y-8">
          {/* Pricing & Stock */}
          <div className="rounded-3xl border border-gray-200/50 bg-white/50 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign size={20} className="text-primary" /> Pricing & Inventory
            </h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Base Price</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-gray-500 font-bold">Rs</span>
                  </div>
                  <input
                    type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required
                    className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-3 pl-9 font-medium text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Stock Quantity</label>
                <input
                  type="number" value={stock} onChange={e => setStock(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-3 font-medium text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="rounded-3xl border border-gray-200/50 bg-white/50 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Organization</h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Category</label>
                <select 
                  value={categoryId} onChange={e => setCategoryId(e.target.value)} required
                  className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-3 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Status</label>
                <select 
                  value={status} onChange={e => setStatus(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-3 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-indigo-600 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <PackagePlus size={20} />}
            {loading ? 'Publishing...' : 'Publish Product'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

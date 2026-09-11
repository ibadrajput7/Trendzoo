import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderPlus, Image as ImageIcon, UploadCloud, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/categories';

export default function AddCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage({ text: 'Category name is required.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Category created successfully!', type: 'success' });
        // Reset form
        setName('');
        setDescription('');
        setImage(null);
        setPreview(null);
      } else {
        setMessage({ text: data.message || 'Failed to create category.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred while communicating with the server.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Add New Category</h2>
        <p className="text-gray-500 dark:text-gray-400">Create a new product category for your store.</p>
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
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-gray-200/50 bg-white/50 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white/50 px-4 py-4 font-medium text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                  placeholder="e.g. Summer Collection 2026"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Description</label>
                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-white/50 px-4 py-4 font-medium text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:focus:border-primary dark:focus:bg-gray-800"
                  placeholder="Describe this category..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-indigo-600 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <FolderPlus size={20} />}
                {loading ? 'Creating...' : 'Create Category'}
              </motion.button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200/50 bg-white/50 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ImageIcon size={20} className="text-primary" />
              Category Image
            </h3>
            
            <label className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 py-12 transition-all hover:border-primary hover:bg-primary/5 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-primary dark:hover:bg-primary/10">
              {preview ? (
                <img src={preview} alt="Preview" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <>
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-all group-hover:bg-primary group-hover:text-white dark:bg-gray-700 dark:text-gray-400">
                    <UploadCloud size={24} />
                  </div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Click to upload</p>
                  <p className="mt-1 text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            {preview && (
              <button 
                type="button"
                onClick={() => { setImage(null); setPreview(null); }}
                className="mt-3 w-full rounded-xl bg-red-100 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30"
              >
                Remove Image
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

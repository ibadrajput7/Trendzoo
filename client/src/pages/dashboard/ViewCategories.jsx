import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Loader2, Image as ImageIcon, UploadCloud } from 'lucide-react';
import EditModal from '../../components/EditModal';
import Loader from '../../components/Loader';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/categories';

export default function ViewCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      } else {
        alert('Failed to delete category');
      }
    } catch (err) {
      alert('Error deleting category');
    }
  };

  const openEdit = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditDescription(category.description || '');
    setEditPreview(category.imageUrl);
    setEditImage(null);
    setIsEditOpen(true);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    const formData = new FormData();
    formData.append('name', editName);
    formData.append('description', editDescription);
    if (editImage) {
      formData.append('image', editImage);
    }

    try {
      const res = await fetch(`${API_URL}/${editingCategory.id}`, {
        method: 'PATCH',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setIsEditOpen(false);
        fetchCategories(); // Refresh the list
      } else {
        alert(data.message || 'Failed to update');
      }
    } catch (err) {
      alert('Error updating category');
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen={true} text="Loading categories..." />;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Categories</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage your product categories.</p>
        </div>
      </div>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="overflow-hidden rounded-3xl border border-gray-200/50 bg-white/50 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50/50 text-xs uppercase text-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
              <tr>
                <th className="px-6 py-5 font-bold">Category</th>
                <th className="px-6 py-5 font-bold">Products</th>
                <th className="px-6 py-5 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={cat.id} 
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 dark:border-gray-800 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-4">
                      {cat.imageUrl ? (
                        <img src={cat.imageUrl} alt={cat.name} className="h-12 w-12 rounded-xl object-cover border border-gray-200 dark:border-gray-700" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 text-gray-400 dark:bg-gray-700">
                          <ImageIcon size={20} />
                        </div>
                      )}
                      <div>
                        <span className="block font-bold text-gray-900 dark:text-white text-base">{cat.name}</span>
                        <span className="text-xs text-gray-500">{cat.description?.substring(0, 30)}...</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">
                    {cat._count?.products || 0} items
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => openEdit(cat)} className="text-gray-400 hover:text-primary transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <div className="p-8 text-center text-gray-500">No categories found. Add one!</div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Category">
        <form onSubmit={handleEditSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Category Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              rows="3"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Image</label>
            <label className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-8 transition-all hover:border-primary dark:border-gray-700 dark:bg-gray-800/50">
              {editPreview ? (
                <img src={editPreview} alt="Preview" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500 dark:bg-gray-700">
                  <UploadCloud size={20} />
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleEditImageChange} />
            </label>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={editLoading}
            className="flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-3 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-indigo-600 disabled:opacity-70"
          >
            {editLoading ? <Loader2 className="animate-spin" size={20} /> : 'Save Changes'}
          </motion.button>
        </form>
      </EditModal>
    </div>
  );
}

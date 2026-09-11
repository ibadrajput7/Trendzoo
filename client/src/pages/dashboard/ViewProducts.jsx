import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Loader2, Image as ImageIcon, UploadCloud } from 'lucide-react';
import EditModal from '../../components/EditModal';

const API_URL_PRODUCTS = import.meta.env.VITE_BACKEND_URL + '/api/v1/products';
const API_URL_CATEGORIES = import.meta.env.VITE_BACKEND_URL + '/api/v1/categories';

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editCategoryId, setEditCategoryId] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL_PRODUCTS);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(API_URL_CATEGORIES);
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API_URL_PRODUCTS}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((prod) => prod.id !== id));
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      alert('Error deleting product');
    }
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditDescription(product.description || '');
    setEditPrice(product.price);
    setEditStock(product.stock);
    setEditCategoryId(product.categoryId);
    setEditStatus(product.status || 'Active');
    setEditPreview(product.imageUrl);
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
    formData.append('price', editPrice);
    formData.append('stock', editStock);
    formData.append('categoryId', editCategoryId);
    formData.append('status', editStatus);
    if (editImage) {
      formData.append('image', editImage);
    }

    try {
      const res = await fetch(`${API_URL_PRODUCTS}/${editingProduct.id}`, {
        method: 'PATCH',
        body: formData,
      });
      if (res.ok) {
        setIsEditOpen(false);
        fetchProducts(); // Refresh list
      } else {
        alert('Failed to update product');
      }
    } catch (err) {
      alert('Error updating product');
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Products</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage your store inventory.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200/50 bg-white/50 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50/50 text-xs uppercase text-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
              <tr>
                <th className="px-6 py-5 font-bold">Product</th>
                <th className="px-6 py-5 font-bold">Category</th>
                <th className="px-6 py-5 font-bold">Price</th>
                <th className="px-6 py-5 font-bold">Stock</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={product.id} 
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 dark:border-gray-800 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-4">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="h-12 w-12 rounded-xl object-cover border border-gray-200 dark:border-gray-700" />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 text-gray-400 dark:bg-gray-700">
                          <ImageIcon size={20} />
                        </div>
                      )}
                      <div>
                        <span className="block font-bold text-gray-900 dark:text-white text-base">{product.name}</span>
                        <span className="text-xs text-gray-500">{product.description?.substring(0, 30)}...</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{product.category?.name || 'Uncategorized'}</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">${parseFloat(product.price).toFixed(2)}</td>
                  <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                      product.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => openEdit(product)} className="text-gray-400 hover:text-primary transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-8 text-center text-gray-500">No products found. Add one!</div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Product">
        <form onSubmit={handleEditSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Product Name</label>
            <input
              type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Price ($)</label>
              <input
                type="number" step="0.01" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Stock</label>
              <input
                type="number" value={editStock} onChange={(e) => setEditStock(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Category</label>
              <select 
                value={editCategoryId} onChange={(e) => setEditCategoryId(e.target.value)} required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
              >
                <option value="" disabled>Select category</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Status</label>
              <select 
                value={editStatus} onChange={(e) => setEditStatus(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Low Stock">Low Stock</option>
              </select>
            </div>
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

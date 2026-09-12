import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, ChevronRight, Loader2 } from 'lucide-react';
import Loader from '../../components/Loader';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/v1/orders';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) {
    return <Loader fullScreen={true} text="Loading orders..." />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Orders</h2>
          <p className="text-gray-500 dark:text-gray-400">Track and fulfill customer orders.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200/50 bg-white/50 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50/50 text-xs uppercase text-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
              <tr>
                <th className="px-6 py-5 font-bold">Order ID</th>
                <th className="px-6 py-5 font-bold">Customer</th>
                <th className="px-6 py-5 font-bold">Date</th>
                <th className="px-6 py-5 font-bold">Total</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500 font-medium">No orders found.</td>
                </tr>
              ) : orders.map((order, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={order.id} 
                  className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/50 dark:border-gray-800 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-5 font-bold text-gray-900 dark:text-white">
                    #ORD-{order.id}
                  </td>
                  <td className="px-6 py-5 font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary dark:bg-primary/20 uppercase">
                        {order.customerName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div>{order.customerName}</div>
                        <div className="text-xs text-gray-400 font-normal">{order.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-5 font-bold text-gray-900 dark:text-white">Rs {parseFloat(order.totalAmount).toFixed(2)}</td>
                  <td className="px-6 py-5">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold outline-none border-none appearance-none ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-white hover:text-primary dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary">
                      View <ChevronRight size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

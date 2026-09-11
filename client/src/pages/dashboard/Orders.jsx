import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ChevronRight } from 'lucide-react';

export default function Orders() {
  const dummyOrders = [
    { id: '#ORD-7829', customer: 'Alice Johnson', date: 'Oct 24, 2026', total: '$129.00', status: 'Delivered' },
    { id: '#ORD-7830', customer: 'Bob Smith', date: 'Oct 24, 2026', total: '$89.00', status: 'Processing' },
    { id: '#ORD-7831', customer: 'Charlie Davis', date: 'Oct 23, 2026', total: '$249.50', status: 'Shipped' },
    { id: '#ORD-7832', customer: 'Diana Prince', date: 'Oct 22, 2026', total: '$45.00', status: 'Cancelled' },
  ];

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
              {dummyOrders.map((order, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={order.id} 
                  className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/50 dark:border-gray-800 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="whitespace-nowrap px-6 py-5 font-bold text-gray-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-5 font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary dark:bg-primary/20">
                        {order.customer.charAt(0)}
                      </div>
                      {order.customer}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-500">{order.date}</td>
                  <td className="px-6 py-5 font-bold text-gray-900 dark:text-white">{order.total}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' :
                      'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 transition-colors group-hover:bg-white group-hover:text-primary dark:text-gray-400 dark:group-hover:bg-gray-800 dark:group-hover:text-primary">
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

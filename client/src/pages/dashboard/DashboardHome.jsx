import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHome() {
  const { admin } = useAuth();

  const stats = [
    { name: 'Total Users', value: '1,234', icon: Users, change: '+12%', changeType: 'increase' },
    { name: 'Total Products', value: '456', icon: Package, change: '+5%', changeType: 'increase' },
    { name: 'Revenue', value: 'Rs 12,345', icon: LayoutDashboard, change: '+23%', changeType: 'increase' },
  ];

  return (
    <>
      <header className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500"
          >
            Welcome back, {admin?.name || 'Admin'}
          </motion.h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Here's what's happening with your store today.</p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/50 p-6 shadow-sm backdrop-blur-md transition-all hover:shadow-xl dark:border-white/10 dark:bg-black/20"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all group-hover:bg-primary/20"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20">
                <stat.icon size={28} />
              </div>
            </div>
            <div className="relative z-10 mt-6 flex items-center text-sm">
              <span className="flex items-center font-bold text-green-500">
                {stat.change}
              </span>
              <span className="ml-2 text-gray-400">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, PackagePlus, Package, FolderPlus, FolderOpen, ShoppingBag, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebarMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '.', end: true, icon: LayoutDashboard },
    { name: 'Add Categories', path: 'add-category', icon: FolderPlus },
    { name: 'View Categories', path: 'categories', icon: FolderOpen },
    { name: 'Add Products', path: 'add-product', icon: PackagePlus },
    { name: 'View Products', path: 'products', icon: Package },
    { name: 'Your Orders', path: 'orders', icon: ShoppingBag },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background dark:bg-background-dark relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200/20 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/95 transition-all duration-300 md:relative overflow-hidden ${
          isSidebarOpen ? 'w-72 p-6 translate-x-0' : 'w-0 p-0 -translate-x-full border-r-0'
        }`}
      >
        <div className="mb-10 flex items-center justify-between px-2 shrink-0">
          <div className="flex items-center gap-4 whitespace-nowrap">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg shadow-primary/30">
              <ShoppingBag size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">Trendzo</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white shrink-0 ml-2">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) => 
                `group flex w-full shrink-0 items-center gap-4 rounded-2xl px-5 py-4 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/20 dark:shadow-primary/10' 
                    : 'text-gray-500 hover:bg-gray-100/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
                }`
              }
              onClick={closeSidebarMobile}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary transition-colors'} />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="group flex w-full shrink-0 items-center gap-4 rounded-2xl px-5 py-4 text-left text-sm font-bold text-red-500 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 whitespace-nowrap mt-auto"
        >
          <LogOut size={20} className="transition-transform group-hover:-translate-x-1" />
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header - Always visible to hold the toggle button */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200/20 px-6 lg:px-12 dark:border-white/10">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="flex items-center justify-center rounded-xl bg-gray-100/50 p-2.5 text-gray-900 backdrop-blur-md transition-colors hover:bg-gray-200/50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              aria-label="Toggle Sidebar"
            >
              <Menu size={20} />
            </button>
            <span className={`text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 ${isSidebarOpen ? 'md:hidden' : 'block'}`}>
              Trendzo
            </span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-500 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 md:hidden"
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

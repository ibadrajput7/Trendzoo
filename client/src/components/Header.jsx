import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Deals', path: '/deals' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 dark:bg-background-dark/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-black tracking-tight">
            trend<span className="text-primary">zo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => clsx(
                  "text-sm font-semibold transition-colors duration-200 hover:text-primary",
                  isActive ? "text-primary border-b-2 border-primary pb-1" : "text-gray-600 dark:text-gray-300"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors ml-2"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>
      <CartDrawer />
    </>
  );
}

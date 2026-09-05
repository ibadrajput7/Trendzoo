import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const YoutubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;

export default function Footer() {
  return (
    <footer className="bg-surface dark:bg-surface-dark pt-16 pb-8 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-black tracking-tight mb-4 inline-block">
              trend<span className="text-primary">zo</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
              Trendy gadgets and accessories designed for your lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <YoutubeIcon />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Shop</h4>
            <ul className="space-y-3">
              {['All Products', 'Best Sellers', 'New Arrivals', 'Deals', 'Gift Cards'].map(link => (
                <li key={link}><Link to="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Categories</h4>
            <ul className="space-y-3">
              {['Mobile Accessories', 'Gadgets', 'Stands & Holders', 'Audio', 'Smart Wearables', 'Tumblers'].map(link => (
                <li key={link}><Link to="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Information</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact Us', 'Shipping Policy', 'Return Policy', 'Privacy Policy'].map(link => (
                <li key={link}><Link to="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-500 dark:text-gray-400">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-500 dark:text-gray-400">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <span>support@trendzo.com</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>123 Trendy Street,<br/>Los Angeles, CA 90001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            &copy; 2026 Trendzo. All rights reserved.
          </p>
          <div className="flex space-x-4 opacity-70">
            <span className="text-sm font-bold text-blue-600">VISA</span>
            <span className="text-sm font-bold text-red-500">MasterCard</span>
            <span className="text-sm font-bold text-blue-400">PayPal</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

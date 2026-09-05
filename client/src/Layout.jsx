import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollControls from './components/ScrollControls';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-gray-900 dark:bg-background-dark dark:text-gray-100 font-sans flex flex-col transition-colors duration-300">
      <Preloader />
      <CustomCursor />
      <ScrollControls />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

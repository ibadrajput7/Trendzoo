import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import Preloader from './Preloader';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background text-gray-900 dark:bg-background-dark dark:text-gray-100 font-sans flex flex-col transition-colors duration-300">
      <Preloader />
      <CustomCursor />
      <main className="flex-grow flex w-full">
        <Outlet />
      </main>
    </div>
  );
}

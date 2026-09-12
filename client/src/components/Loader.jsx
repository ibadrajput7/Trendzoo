import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ fullScreen = false, text = "Loading..." }) {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md"
    : "flex flex-col items-center justify-center py-16 w-full h-full";

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center justify-center w-16 h-16 mb-6">
        <motion.div
          className="absolute inset-0 border-4 border-primary/30 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="w-8 h-8 bg-gradient-to-tr from-primary to-purple-500 rounded-full blur-md opacity-50"
          animate={{ scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {text && (
        <motion.h3 
          className="text-lg font-black font-fancy tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.h3>
      )}
    </div>
  );
}

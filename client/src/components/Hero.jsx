import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import bannerImage from '../assets/bannerimage.png';

// Three.js animated background component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full opacity-60 dark:opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        
        <Suspense fallback={null}>
          {/* Main pink particles */}
          <Sparkles count={80} scale={12} size={3} speed={0.3} opacity={0.5} color="#ff1493" />
          {/* Slower purple particles */}
          <Sparkles count={40} scale={10} size={5} speed={0.15} opacity={0.4} color="#a855f7" />
          {/* Larger sparse pink particles */}
          <Sparkles count={15} scale={15} size={8} speed={0.1} opacity={0.3} color="#ec4899" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative pt-10 pb-12 lg:pt-16 lg:pb-16 overflow-hidden">
      
      {/* Three.js Background */}
      <AnimatedBackground />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Text Content */}
          <div className="lg:w-1/2 lg:pr-10 text-center lg:text-left mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-primary text-xs font-bold rounded-full uppercase tracking-[0.2em] mb-6 shadow-sm border border-pink-200 dark:border-pink-800/50"
            >
              New Arrivals
            </motion.div>
            
            {/* Fancy Italic Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-fancy italic text-gray-900 dark:text-white leading-[1.1] mb-6 drop-shadow-sm"
            >
              Level Up.<br/>
              Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400 not-italic font-sans font-black">Trendzo.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              Discover the coolest gadgets and mobile accessories for your everyday grind. Upgrade your tech game.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-5"
            >
              <Link 
                to="/shop" 
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-primary to-pink-500 hover:from-primary-hover hover:to-pink-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-xl shadow-primary/30 tracking-wider"
              >
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/deals" 
                className="w-full sm:w-auto px-10 py-4 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 font-bold rounded-full transition-all duration-300 hover:border-primary dark:hover:border-primary hover:shadow-lg flex items-center justify-center tracking-wider"
              >
                Explore Deals
              </Link>
            </motion.div>
          </div>

          {/* Image with Continuous Floating Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="lg:w-1/2 relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10 w-full max-w-lg lg:max-w-xl mx-auto"
            >
              <img 
                src={bannerImage} 
                alt="Cool gadgets and accessories" 
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

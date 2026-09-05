import React, { useState, useEffect } from 'react';
import preloaderImg from '../assets/preloader.png';

export default function Preloader() {
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Start fading out after 4 seconds (increased to guarantee visibility)
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 4000);

    // Unmount completely after the fade transition
    const unmountTimer = setTimeout(() => {
      setIsMounted(false);
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999999,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'auto',
        transition: 'opacity 1s ease-in-out'
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Breathing Animation for the image */}
        <div 
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
          style={{
            animation: 'breathe 2s ease-in-out infinite'
          }}
        >
          <img 
            src={preloaderImg} 
            alt="Loading Trendzo..." 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
}

import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const videos = [
  {
    id: 1,
    title: 'Unboxing the new MagSafe Collection',
    views: '124K views',
    thumbnail: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=700&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Top 5 Desk Accessories for 2024',
    views: '89K views',
    thumbnail: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=400&h=700&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Is this the best power bank ever?',
    views: '210K views',
    thumbnail: 'https://images.unsplash.com/photo-1627916946654-e0b0476831d3?w=400&h=700&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'My Gaming Setup Tour',
    views: '450K views',
    thumbnail: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=700&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Aesthetic room transformation with LED',
    views: '320K views',
    thumbnail: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=400&h=700&fit=crop&q=80',
  },
];

export default function VideoSlider() {
  const duplicatedVideos = [...videos, ...videos];

  return (
    <section className="py-24 bg-background dark:bg-background-dark overflow-hidden relative">
      <div className="container mx-auto px-6 text-center mb-16 relative z-10">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-4"
        >
          Community
        </motion.h3>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-fancy font-black text-gray-900 dark:text-white tracking-tight"
        >
          Trending on <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Social</span>
        </motion.h2>
      </div>

      {/* Slider Container */}
      <div className="relative w-full max-w-[100vw] overflow-hidden flex group">
        {/* Fading Edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background dark:from-background-dark to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track (Reverse) */}
        <motion.div 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          className="flex w-max py-4 hover:[animation-play-state:paused]"
        >
          {duplicatedVideos.map((video, index) => (
            <div 
              key={`${video.id}-${index}`} 
              className="w-[240px] md:w-[280px] h-[400px] md:h-[500px] flex-shrink-0 mx-3 md:mx-4 bg-gray-900 rounded-[2rem] overflow-hidden relative shadow-2xl shadow-gray-200/30 dark:shadow-black/50 group/video cursor-pointer"
            >
              {/* Thumbnail */}
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover transform group-hover/video:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover/video:opacity-100"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover/video:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Text Info */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                <h4 className="text-white font-bold text-lg mb-2 leading-snug drop-shadow-md">
                  {video.title}
                </h4>
                <p className="text-gray-300 text-sm font-medium">
                  {video.views}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

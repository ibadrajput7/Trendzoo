import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const feedImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500', likes: '2.4k', comments: '124' },
  { id: 2, url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500', likes: '3.1k', comments: '89' },
  { id: 3, url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500', likes: '1.8k', comments: '56' },
  { id: 4, url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=500', likes: '4.5k', comments: '210' },
  { id: 5, url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=500', likes: '1.2k', comments: '45' },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-background dark:bg-background-dark relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none transform -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider mb-4">
            <InstagramIcon size={16} className="mr-2" />
            Social Feed
          </div>
          <h2 className="text-4xl md:text-5xl font-fancy font-black text-gray-900 dark:text-white tracking-tight">
            Follow Us On <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Instagram</span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-lg">
            Tag us <span className="font-bold text-primary">@trendzo</span> in your photos to be featured on our feed!
          </p>
        </div>
        
        <a href="#" className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-colors shadow-lg">
          Follow @trendzo
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2 md:px-6">
        {feedImages.map((img, index) => (
          <motion.div 
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
          >
            <img 
              src={img.url} 
              alt="Instagram feed item" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
              <div className="flex items-center space-x-6 text-white font-bold">
                <div className="flex items-center">
                  <Heart size={20} className="mr-2 fill-white" />
                  <span>{img.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle size={20} className="mr-2 fill-white" />
                  <span>{img.comments}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Tech Enthusiast',
    text: 'Absolutely in love with the MagSafe case I bought. The quality is unmatched and delivery was super fast!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Content Creator',
    text: 'Trendzo is my go-to for all my setup accessories. The neon lights completely transformed my studio vibe.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Daily Commuter',
    text: 'The wireless earbuds have amazing noise cancellation. I cannot imagine my morning commute without them now.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 4,
  },
  {
    id: 4,
    name: 'Marcus Johnson',
    role: 'Gamer',
    text: 'Incredible gaming accessories. The mechanical keyboard I picked up here is the best I have ever used.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 5,
  },
  {
    id: 5,
    name: 'Sophia Patel',
    role: 'Student',
    text: 'Great prices and amazing quality! The power bank literally saves my life during long study sessions on campus.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    rating: 5,
  },
];

export default function TestimonialSlider() {
  // Duplicate the array to create a seamless infinite loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-surface dark:bg-surface-dark overflow-hidden relative">
      <div className="container mx-auto px-6 text-center mb-16 relative z-10">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-4"
        >
          Customer Reviews
        </motion.h3>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-fancy font-black text-gray-900 dark:text-white tracking-tight"
        >
          Loved By <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Thousands</span>
        </motion.h2>
      </div>

      {/* Slider Container */}
      <div className="relative w-full max-w-[100vw] overflow-hidden flex group">
        {/* Fading Edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-surface dark:from-surface-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-surface dark:from-surface-dark to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track */}
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          className="flex w-max py-4 hover:[animation-play-state:paused]"
        >
          {duplicatedReviews.map((review, index) => (
            <div 
              key={`${review.id}-${index}`} 
              className="w-[300px] md:w-[400px] flex-shrink-0 mx-3 md:mx-4 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 relative"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-primary/10" />
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-700'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg italic font-medium leading-relaxed mb-8">
                "{review.text}"
              </p>
              <div className="flex items-center space-x-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{review.name}</h4>
                  <p className="text-xs text-primary font-bold">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Phone Cases', imgUrl: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=500&q=80', count: '200+ Products' },
  { name: 'Chargers', imgUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80', count: '120+ Products' },
  { name: 'Cables', imgUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=500&q=80', count: '150+ Products' },
  { name: 'Earbuds', imgUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80', count: '180+ Products' },
  { name: 'Power Banks', imgUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80', count: '100+ Products' },
  { name: 'Protectors', imgUrl: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&q=80', count: '80+ Products' },
  { name: 'Stands', imgUrl: 'https://images.unsplash.com/photo-1586771107445-d3afeb0de203?w=500&q=80', count: '70+ Products' },
  { name: 'Watches', imgUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80', count: '60+ Products' },
  { name: 'Tumblers', imgUrl: 'https://images.unsplash.com/photo-1517088926442-9988220cb6b6?w=500&q=80', count: '50+ Products' },
];

export default function CategoryShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6 text-center">
        
        <div className="mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mb-4"
          >
            Shop By Category
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-fancy font-black text-gray-900 dark:text-white tracking-tight"
          >
            Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400 font-sans">You Need</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-5 mb-16">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, type: "spring", stiffness: 120 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-3xl overflow-hidden mb-4 relative shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-500 border-2 border-transparent group-hover:border-primary/50">
                <img 
                  src={cat.imgUrl} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base group-hover:text-primary transition-colors">{cat.name}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{cat.count}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/categories" className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-primary to-pink-500 text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary/40 transform hover:-translate-y-1 transition-all duration-300 tracking-wider">
            View All Categories <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
}

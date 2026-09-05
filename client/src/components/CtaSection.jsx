import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-gray-900 dark:bg-black z-0">
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80" 
          alt="Tech background" 
          className="w-full h-full object-cover opacity-20 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-fancy font-black text-white mb-6 leading-tight"
          >
            Ready to Upgrade Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">Tech Game?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-10"
          >
            Join over 50,000 happy customers and discover why Trendzo is the #1 destination for premium tech accessories.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-10"
          >
            <Link 
              to="/shop" 
              className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-hover transition-colors shadow-xl shadow-primary/30 flex items-center justify-center tracking-wider text-lg transform hover:-translate-y-1"
            >
              Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center text-gray-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
              Free Worldwide Shipping
            </div>
            <div className="flex items-center text-gray-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
              24/7 Customer Support
            </div>
            <div className="flex items-center text-gray-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
              Secure Checkout
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary rounded-full opacity-20 blur-[100px] z-0"></div>
    </section>
  );
}

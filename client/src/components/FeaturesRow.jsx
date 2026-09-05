import React from 'react';
import { Tag, Truck, RefreshCcw, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Tag className="w-6 h-6 text-primary" />,
    title: 'High-Quality',
    description: 'Products'
  },
  {
    icon: <Truck className="w-6 h-6 text-primary" />,
    title: 'Fast & Free',
    description: 'Delivery'
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-primary" />,
    title: '7-Day',
    description: 'Returns'
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: 'Secure',
    description: 'Payments'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function FeaturesRow() {
  return (
    <div className="container mx-auto px-6 -mt-10 mb-16 relative z-20">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 p-6 md:p-8 flex flex-wrap justify-between items-center gap-6 border border-gray-100 dark:border-gray-800"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants} className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white leading-tight">{feature.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

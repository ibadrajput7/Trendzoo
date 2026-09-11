import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Have a question? We'd love to hear from you.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          {[
            { icon: Mail, title: 'Email', value: 'hello@trendzo.com' },
            { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567' },
            { icon: MapPin, title: 'Address', value: '123 Trend Avenue, NY 10001' }
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-6 p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-gray-500 font-medium">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700"
        >
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">Your Name</label>
                <input type="text" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors font-medium dark:text-white" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">Your Email</label>
                <input type="email" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors font-medium dark:text-white" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">Subject</label>
              <input type="text" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors font-medium dark:text-white" placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">Message</label>
              <textarea rows="5" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors font-medium dark:text-white resize-none" placeholder="Write your message here..."></textarea>
            </div>
            <button className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-indigo-600 text-white py-5 rounded-full font-bold text-lg shadow-xl shadow-primary/30 transition-all">
              <Send size={20} /> Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

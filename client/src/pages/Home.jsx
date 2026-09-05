import React from 'react';
import Hero from '../components/Hero';
import FeaturesRow from '../components/FeaturesRow';
import CategoryShowcase from '../components/CategoryShowcase';
import PromoBanners from '../components/PromoBanners';
import ProductGrid from '../components/ProductGrid';
import TopCategories from '../components/TopCategories';
import TestimonialSlider from '../components/TestimonialSlider';
import VideoSlider from '../components/VideoSlider';
import CtaSection from '../components/CtaSection';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen overflow-hidden">
      <Hero />
      <FeaturesRow />
      <CategoryShowcase />
      <PromoBanners />
      <ProductGrid />
      <TestimonialSlider />
      <TopCategories />
      <VideoSlider />
      <CtaSection />
      <Newsletter />
    </div>
  );
}

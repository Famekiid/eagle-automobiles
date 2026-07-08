'use client';

import HeroSection from '@/components/home/HeroSection';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import WhyEagle from '@/components/home/WhyEagle';
import FinanceSection from '@/components/home/FinanceSection';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />
      <FeaturedBrands />
      <FeaturedVehicles />
      <WhyEagle />
      <FinanceSection />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

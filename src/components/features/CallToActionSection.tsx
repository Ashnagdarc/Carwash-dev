import React from 'react';
import { Button } from '../ui/Button';

export function CallToActionSection() {
  return (
    <section className="py-20 bg-black text-white transition-colors duration-300 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready for a Spotless Ride?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
          Book your premium car wash today and experience the difference. Fast, easy, and professional service at your fingertips.
        </p>
        <Button size="lg" variant="secondary" className="font-semibold px-8 py-4 text-lg shadow-xl animate-pulse hover:animate-none">
          Book Now
        </Button>
      </div>
    </section>
  );
}

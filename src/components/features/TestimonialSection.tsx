import React from 'react';

const testimonials = [
  {
    name: 'Jane Doe',
    text: 'Absolutely loved the service! My car has never looked better.',
    title: 'Regular Customer',
  },
  {
    name: 'John Smith',
    text: 'Fast, friendly, and super convenient. Highly recommend!',
    title: 'Business Owner',
  },
  {
    name: 'Emily Chen',
    text: 'The 3D car selector is so cool and easy to use. Great experience!',
    title: 'Tech Enthusiast',
  },
];

export function TestimonialSection() {
  return (
    <section className="py-20 bg-black transition-colors duration-300 animate-fade-in-up">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-4">Testimonials</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Hear from our happy customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className={`bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up delay-${i * 200}`}>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4">
                {t.name.charAt(0)}
              </div>
              <p className="text-lg text-gray-200 mb-4 italic">“{t.text}”</p>
              <div className="font-semibold text-gray-100">{t.name}</div>
              <div className="text-sm text-gray-400">{t.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

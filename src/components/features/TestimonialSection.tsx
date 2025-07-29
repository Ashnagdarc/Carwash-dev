import React from 'react';
import UberCard from '../ui/UberCard';
import { Star, Quote } from 'lucide-react';

export function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      rating: 5,
      comment: 'Absolutely loved the service! My car has never looked better. The team was professional and the convenience of having it done at home is unbeatable.',
      avatar: 'SJ',
      car: 'Tesla Model 3'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      rating: 5,
      comment: 'Fast, friendly, and super convenient. I use this service weekly for my company vehicles. Highly recommend!',
      avatar: 'MC',
      car: 'BMW X5'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Tech Enthusiast',
      rating: 5,
      comment: 'The booking process is so smooth and the results are amazing. My car looks brand new every time!',
      avatar: 'ER',
      car: 'Audi A4'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Fleet Manager',
      rating: 5,
      comment: 'Professional service, reliable scheduling, and excellent results. Perfect for our company fleet maintenance.',
      avatar: 'DT',
      car: 'Mercedes-Benz C-Class'
    }
  ];

  return (
    <div className="bg-gray-50 font-uber py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-heading font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <UberCard
              key={testimonial.id}
              variant="elevated"
              padding="lg"
              className="relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4">
                <Quote className="h-6 w-6 text-blue-200" />
              </div>

              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-body text-gray-700 leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-caption font-semibold text-blue-600">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-body font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-caption text-gray-600">
                      {testimonial.role}
                    </p>
                    <p className="text-caption text-gray-500">
                      {testimonial.car}
                    </p>
                  </div>
                </div>
              </div>
            </UberCard>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-display font-bold text-gray-900">4.9</div>
                <div className="text-caption text-gray-600">Average Rating</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-display font-bold text-gray-900">500+</div>
                <div className="text-caption text-gray-600">Happy Customers</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-display font-bold text-gray-900">100%</div>
                <div className="text-caption text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

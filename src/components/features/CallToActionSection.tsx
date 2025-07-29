import React from 'react';
import { useNavigate } from 'react-router-dom';
import UberCard from '../ui/UberCard';
import UberButton from '../ui/UberButton';
import { Car, Sparkles, Shield, Clock, MapPin, Star, Users, Award } from 'lucide-react';

export function CallToActionSection() {
  const navigate = useNavigate();

  const services = [
    {
      id: 'basic',
      title: 'Basic Wash',
      description: 'Quick and convenient exterior clean with interior vacuuming.',
      price: '$25',
      time: '15-20 min',
      icon: Car,
      features: ['Exterior hand wash', 'Spot-free rinse', 'Basic interior vacuuming', 'Window cleaning']
    },
    {
      id: 'premium',
      title: 'Premium Wash',
      description: 'Deep clean with waxing and interior detailing.',
      price: '$45',
      time: '30-40 min',
      icon: Sparkles,
      features: ['Exterior wash & waxing', 'Interior vacuuming & cleaning', 'Window cleaning inside & out', 'Tire shine']
    },
    {
      id: 'detailing',
      title: 'Full Detailing',
      description: 'Complete package for top-tier cleanliness and protection.',
      price: '$85',
      time: '60-90 min',
      icon: Shield,
      features: ['Full wash, waxing & polishing', 'Deep interior detailing', 'Tire & wheel cleaning', 'Engine cleaning']
    }
  ];

  const stats = [
    { number: '500+', label: 'Cars Washed', icon: Car },
    { number: '4.9', label: 'Customer Rating', icon: Star },
    { number: '15min', label: 'Average Time', icon: Clock },
    { number: '100%', label: 'Satisfaction', icon: Award }
  ];

  return (
    <div className="bg-white font-uber py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Service Suggestions */}
        <div className="mb-20">
          <h2 className="text-heading font-bold text-gray-900 text-center mb-4">
            Choose Your Service
          </h2>
          <p className="text-body text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Professional car washing and detailing services tailored to your needs.
            Fast, convenient, and eco-friendly solutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <UberCard
                  key={service.id}
                  variant="elevated"
                  padding="lg"
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 group"
                  onClick={() => navigate('/auth')}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-subheading font-semibold text-gray-900">
                            {service.title}
                          </h3>
                          <p className="text-caption text-gray-600">
                            {service.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-heading font-bold text-gray-900">
                          {service.price}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-body text-gray-600">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-caption text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <UberButton
                      variant="outline"
                      size="md"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 border-blue-600 font-semibold shadow-md"
                    >
                      Book Now
                    </UberButton>
                  </div>
                </UberCard>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-heading font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              Join our growing community of satisfied customers who trust us with their vehicles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-display font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-caption text-gray-600">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-white">
            <h2 className="text-heading font-bold mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-body text-blue-100 mb-8 max-w-2xl mx-auto">
              Book your first car wash today and see why thousands of customers choose our professional service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <UberButton
                variant="primary"
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg"
              >
                Get Started Now
              </UberButton>
              <UberButton
                variant="outline"
                size="lg"
                onClick={() => navigate('/auth')}
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
              >
                View All Services
              </UberButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Check, Star, Sparkles, Car, ShieldCheck, Clock } from 'lucide-react';
import UberCard from '../ui/UberCard';
import UberButton from '../ui/UberButton';

interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  category: 'basic' | 'premium' | 'deluxe';
  popular?: boolean;
  onBook?: () => void;
}

export function ServiceCard({
  name,
  description,
  price,
  duration,
  features,
  category,
  popular = false,
  onBook
}: ServiceCardProps) {
  const categoryColors = {
    basic: 'from-gray-400 to-gray-500',
    premium: 'from-blue-500 to-indigo-500',
    deluxe: 'from-amber-400 to-yellow-500'
  };

  const categoryBadgeColors = {
    basic: 'bg-gray-100 text-gray-800',
    premium: 'bg-blue-100 text-blue-800',
    deluxe: 'bg-amber-100 text-amber-800'
  };

  const categoryIcons = {
    basic: <Car className="h-8 w-8 text-gray-400" />,
    premium: <Sparkles className="h-8 w-8 text-blue-400" />,
    deluxe: <ShieldCheck className="h-8 w-8 text-amber-400" />
  };

  return (
    <div className="relative group">
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-caption font-semibold flex items-center shadow-lg">
            <Star className="h-4 w-4 mr-2" />
            Recommended
          </div>
        </div>
      )}

      <UberCard
        variant={popular ? "elevated" : "default"}
        padding="lg"
        className={`relative transition-all duration-300 hover:scale-105 ${popular ? 'ring-2 ring-blue-400 scale-105 z-10' : ''}`}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-6">
            <span className={`px-3 py-1 rounded-xl text-caption font-semibold ${categoryBadgeColors[category]}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            <span className="text-subheading font-bold text-gray-900">₦{price.toLocaleString()}</span>
          </div>

          {/* Large icon/illustration */}
          <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
            {categoryIcons[category]}
          </div>

          <h3 className="text-subheading font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors text-center">
            {name}
          </h3>

          <p className="text-body text-gray-600 mb-6 leading-relaxed text-center">
            {description}
          </p>

          <div className="mb-8 w-full">
            <p className="text-caption text-gray-500 mb-4 font-medium flex items-center justify-center">
              <Clock className="h-4 w-4 mr-2 text-blue-400" />
              Duration: {duration} minutes
            </p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 group/feature justify-center">
                  <div className="p-1 bg-blue-100 rounded-full group-hover/feature:bg-blue-200 transition-colors">
                    <Check className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="text-caption text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <UberButton
            variant="primary"
            size="lg"
            onClick={onBook}
            className={`w-full bg-gradient-to-r ${categoryColors[category]} hover:opacity-90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
          >
            Book {name}
          </UberButton>
        </div>
      </UberCard>
    </div>
  );
}
import React from 'react';
import { Check, Star, Sparkles, Car, ShieldCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';

interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  category: 'basic' | 'premium' | 'deluxe';
  popular?: boolean;
}

export function ServiceCard({
  name,
  description,
  price,
  duration,
  features,
  category,
  popular = false
}: ServiceCardProps) {
  const categoryColors = {
    basic: 'from-gray-400 to-gray-500',
    premium: 'from-cyan-500 to-blue-500',
    deluxe: 'from-amber-400 to-yellow-500'
  };

  const categoryBadgeColors = {
    basic: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
    premium: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200',
    deluxe: 'bg-amber-100 dark:bg-yellow-900/30 text-amber-800 dark:text-yellow-200'
  };

  const categoryIcons = {
    basic: <Car className="h-8 w-8 text-gray-400" />,
    premium: <Sparkles className="h-8 w-8 text-cyan-400" />,
    deluxe: <ShieldCheck className="h-8 w-8 text-amber-400" />
  };

  return (
    <Card className={`relative group bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up delay-[var(--delay)] ${popular ? 'ring-2 ring-cyan-400 dark:ring-cyan-300 scale-110 z-10' : ''}`} style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)', '--delay': `${(category === 'basic' ? 0 : category === 'premium' ? 200 : 400)}ms` }}>
      {popular && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-full text-base font-semibold flex items-center shadow-lg animate-bounce-slow">
            <Star className="h-5 w-5 mr-2" />
            Recommended
          </div>
        </div>
      )}
      <CardContent className="pt-8 pb-4 px-6 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4">
          <span className={`px-4 py-1 rounded-2xl text-sm font-semibold ${categoryBadgeColors[category]}`}>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">₦{price.toLocaleString()}</span>
        </div>
        {/* Large icon/illustration */}
        <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/40 to-gray-200/10 dark:from-gray-800/40 dark:to-gray-900/10 shadow-inner">
          {categoryIcons[category]}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-center">{description}</p>
        <div className="mb-6 w-full">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium flex items-center justify-center"><Clock className="h-4 w-4 mr-1 text-cyan-400" /> Duration: {duration} minutes</p>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 group/feature justify-center">
                <div className="p-1 bg-cyan-100 dark:bg-cyan-900/30 rounded-full group-hover/feature:bg-cyan-200 dark:group-hover/feature:bg-cyan-900/50 transition-colors">
                  <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full bg-gradient-to-r ${categoryColors[category]} hover:opacity-90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg font-semibold py-3 rounded-2xl`}
          size="lg"
        >
          Book {name}
        </Button>
      </CardFooter>
    </Card>
  );
}
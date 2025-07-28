import { Sparkles, ArrowRight, Play, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Fullscreen YouTube video background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe
          src="https://www.youtube.com/embed/B4QI0VzbkHk?autoplay=1&mute=1&loop=1&playlist=B4QI0VzbkHk&controls=0&showinfo=0&modestbranding=1&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer"
          title="Car Wash Demo"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        ></iframe>
        {/* Simple dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70 z-10" />
      </div>
      {/* Centered content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4 py-8 min-h-[calc(90vh-4rem)]">
        <div className="flex items-center space-x-3 mb-4 justify-center">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 h-6 w-6 text-cyan-400 animate-ping opacity-20">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <span className="text-cyan-400 font-semibold text-lg tracking-wide drop-shadow-lg">On-demand car wash</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-white mb-6 drop-shadow-2xl">
          <span className="block animate-fade-in-up">Effortless Clean</span>
          <span className="block animate-fade-in-up delay-200">and Drive</span>
          <span className="block text-cyan-400 animate-fade-in-up delay-400">Comfortably</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in-up delay-600 drop-shadow-lg px-4">
          Experience the perfect blend of effortless cleanliness and unmatched driving comfort, making every journey enjoyable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12 animate-fade-in-up delay-800 px-4">
          <Button size="lg" variant="secondary" className="group shadow-xl font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm group font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>
        {/* Premium feature list with icons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-2 animate-fade-in-up delay-1000 justify-center items-center px-4">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
            <span className="text-white font-medium text-base sm:text-lg">Convenient at your doorstep</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
            <span className="text-white font-medium text-base sm:text-lg">Fast 24-hour service</span>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
            <span className="text-white font-medium text-base sm:text-lg">Premium quality guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
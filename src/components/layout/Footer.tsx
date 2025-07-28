import React from 'react';

export function Footer() {
  return (
    <footer className="py-8 bg-gray-900 text-gray-300 text-center animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-2">
          &copy; {new Date().getFullYear()} Carwash. All rights reserved.
        </div>
        <div className="text-sm">
          Built with <span className="text-cyan-400">React</span> & <span className="text-cyan-400">Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}

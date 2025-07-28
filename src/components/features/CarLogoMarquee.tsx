import React from 'react';

const carLogos = [
    'audi.svg', 'bmw.svg', 'chevrolet.svg', 'ford.svg', 'honda.svg', 'hyundai.svg', 'jaguar.svg', 'jeep.svg', 'kia.svg', 'landrover.svg',
    'lexus.svg', 'mazda.svg', 'mercedes.svg', 'mini.svg', 'mitsubishi.svg', 'nissan.svg', 'peugeot.svg', 'porsche.svg', 'renault.svg', 'skoda.svg',
    'subaru.svg', 'suzuki.svg', 'tesla.svg', 'toyota.svg', 'volkswagen.svg', 'volvo.svg', 'fiat.svg', 'infiniti.svg', 'acura.svg', 'cadillac.svg', 'dodge.svg'
];

export function CarLogoMarquee() {
    return (
        <div className="relative w-full py-8 bg-black overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
            {/* Marquee */}
            <div className="w-full overflow-hidden">
                <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                    {carLogos.concat(carLogos).map((logo, idx) => (
                        <img
                            key={idx}
                            src={`/logos/${logo}`}
                            alt={logo.replace('.svg', '')}
                            className="h-12 w-auto opacity-80 grayscale hover:grayscale-0 transition duration-300"
                            style={{ minWidth: 64 }}
                            draggable="false"
                        />
                    ))}
                </div>
            </div>
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
      `}</style>
        </div>
    );
} 
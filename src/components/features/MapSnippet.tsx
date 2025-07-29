import React from 'react';

interface MapSnippetProps {
    startLocation: string;
    endLocation: string;
    className?: string;
}

const MapSnippet: React.FC<MapSnippetProps> = ({ startLocation, endLocation, className = "" }) => {
    return (
        <div className={`w-28 h-28 bg-gray-100 rounded-xl flex-shrink-0 relative overflow-hidden ${className}`}>
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                {/* Grid lines to simulate map */}
                <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full" style={{
                        backgroundImage: `
                            linear-gradient(to right, #ccc 1px, transparent 1px),
                            linear-gradient(to bottom, #ccc 1px, transparent 1px)
                        `,
                        backgroundSize: '8px 8px'
                    }} />
                </div>
            </div>

            {/* Route Line */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Start Point */}
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                    </div>

                    {/* Route Line */}
                    <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2">
                        <div className="w-full h-0.5 bg-black rounded-full"></div>
                    </div>

                    {/* End Point */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2.5 h-2.5 bg-gray-600 border border-gray-400 rounded-sm"></div>
                    </div>
                </div>
            </div>

            {/* Location Labels */}
            <div className="absolute bottom-2 left-2 right-2">
                <div className="text-small text-gray-600 font-medium leading-tight">
                    <div className="truncate">{startLocation}</div>
                    <div className="truncate">{endLocation}</div>
                </div>
            </div>
        </div>
    );
};

export default MapSnippet;
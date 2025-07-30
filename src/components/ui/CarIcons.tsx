import React from 'react';

interface CarIconProps {
    className?: string;
    size?: number;
    color?: string;
}

// Car Top View Icon (using actual car_top.png image)
export const CarTopIcon: React.FC<CarIconProps> = ({
    className = "h-6 w-6",
    size = 24,
    color
}) => {
    return (
        <img
            src="/images/car_top.png"
            alt="Car top view"
            className={className}
            style={{ width: size, height: size }}
        />
    );
};

// Car Side View Icon (using actual standard.png image)
export const CarSideIcon: React.FC<CarIconProps> = ({
    className = "h-6 w-6",
    size = 24,
    color
}) => {
    return (
        <img
            src="/images/standard.png"
            alt="Car side view"
            className={className}
            style={{ width: size, height: size }}
        />
    );
};

// Default car icon (uses side view as default)
export const CarIcon: React.FC<CarIconProps> = (props) => {
    return <CarSideIcon {...props} />;
}; 
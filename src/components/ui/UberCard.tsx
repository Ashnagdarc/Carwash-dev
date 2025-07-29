import React from 'react';

interface UberCardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'interactive';
    padding?: 'sm' | 'md' | 'lg' | 'xl';
    onClick?: () => void;
    className?: string;
}

const UberCard: React.FC<UberCardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    onClick,
    className = '',
}) => {
    const baseClasses = 'bg-white border border-gray-200 rounded-2xl transition-all duration-200';

    const variantClasses = {
        default: 'hover:shadow-lg',
        elevated: 'shadow-lg',
        interactive: 'hover:shadow-lg cursor-pointer',
    };

    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
    };

    const classes = [
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        className,
    ].join(' ');

    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
};

export default UberCard;
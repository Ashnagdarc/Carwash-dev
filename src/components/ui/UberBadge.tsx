import React from 'react';

interface UberBadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'yellow' | 'blue' | 'green' | 'purple' | 'red' | 'gray';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const UberBadge: React.FC<UberBadgeProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
}) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full';

    const variantClasses = {
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-gray-100 text-gray-700',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-indigo-100 text-indigo-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        purple: 'bg-purple-100 text-purple-800',
        red: 'bg-red-100 text-red-800',
        gray: 'bg-gray-100 text-gray-700',
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-small',
        md: 'px-3 py-1 text-caption',
        lg: 'px-4 py-2 text-body',
    };

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
    ].join(' ');

    return (
        <span className={classes}>
            {children}
        </span>
    );
};

export default UberBadge;
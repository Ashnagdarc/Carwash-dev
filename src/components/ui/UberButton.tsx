import React from 'react';
import { components } from '../../utils/designSystem';

interface UberButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const UberButton: React.FC<UberButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    onClick,
    disabled = false,
    className = '',
    type = 'button',
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'bg-black text-white hover:bg-gray-800 focus:ring-black',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-caption',
        md: 'px-6 py-3 text-body',
        lg: 'px-8 py-4 text-body',
    };

    const iconSizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-5 w-5',
    };

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
    ].join(' ');

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && iconPosition === 'left' && (
                <span className={`mr-2 ${iconSizeClasses[size]}`}>
                    {icon}
                </span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
                <span className={`ml-2 ${iconSizeClasses[size]}`}>
                    {icon}
                </span>
            )}
        </button>
    );
};

export default UberButton;
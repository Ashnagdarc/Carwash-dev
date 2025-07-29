import React from 'react';

interface UberInputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    error?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const UberInput: React.FC<UberInputProps> = ({
    label,
    placeholder,
    value,
    onChange,
    type = 'text',
    error,
    disabled = false,
    required = false,
    className = '',
    icon,
    iconPosition = 'left',
}) => {
    const baseClasses = 'w-full px-4 py-3 border rounded-xl text-body transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';

    const stateClasses = error
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '';

    const iconClasses = icon ? (iconPosition === 'left' ? 'pl-12' : 'pr-12') : '';

    const inputClasses = [
        baseClasses,
        stateClasses,
        disabledClasses,
        iconClasses,
        className,
    ].join(' ');

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-caption font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && iconPosition === 'left' && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}

                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={inputClasses}
                />

                {icon && iconPosition === 'right' && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-caption text-red-600">{error}</p>
            )}
        </div>
    );
};

export default UberInput;
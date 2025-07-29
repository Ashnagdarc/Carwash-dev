/**
 * Uber-Style Design System
 * 
 * This file contains all design tokens, typography, spacing, colors,
 * and component styles that follow the Uber design system.
 * 
 * Usage:
 * - Import this file in components
 * - Use the exported classes and styles
 * - Maintain consistency across the application
 */

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

export const typography = {
    // Font Family
    fontFamily: {
        primary: "'Inter', 'Uber Move', 'UberMove', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },

    // Font Sizes
    fontSize: {
        display: '2.25rem',      // 36px - Large headings
        heading: '1.875rem',     // 30px - Section headings
        subheading: '1.25rem',   // 20px - Sub-headings
        body: '1rem',           // 16px - Body text
        caption: '0.875rem',    // 14px - Captions
        small: '0.75rem',       // 12px - Small text
    },

    // Line Heights
    lineHeight: {
        display: '1.2',
        heading: '1.3',
        subheading: '1.4',
        body: '1.5',
        caption: '1.4',
        small: '1.3',
    },

    // Font Weights
    fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },

    // Letter Spacing
    letterSpacing: {
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
    },
};

// ============================================================================
// SPACING SYSTEM
// ============================================================================

export const spacing = {
    // Component Spacing
    component: {
        xs: '0.5rem',    // 8px
        sm: '1rem',      // 16px
        md: '1.5rem',    // 24px
        lg: '2rem',      // 32px
        xl: '2.5rem',    // 40px
        '2xl': '3rem',   // 48px
        '3xl': '4rem',   // 64px
    },

    // Section Spacing
    section: {
        sm: '2rem',      // 32px
        md: '2.5rem',    // 40px
        lg: '3rem',      // 48px
        xl: '4rem',      // 64px
    },

    // Page Spacing
    page: {
        padding: '2rem', // 32px
        maxWidth: '72rem', // 1152px
    },
};

// ============================================================================
// COLOR SYSTEM
// ============================================================================

export const colors = {
    // Primary Colors
    primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
    },

    // Neutral Colors
    neutral: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
    },

    // Status Colors
    status: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
    },
};

// ============================================================================
// BORDER RADIUS SYSTEM
// ============================================================================

export const borderRadius = {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
};

// ============================================================================
// SHADOW SYSTEM
// ============================================================================

export const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

// ============================================================================
// ICON SIZES
// ============================================================================

export const iconSizes = {
    xs: '0.75rem',    // 12px
    sm: '1rem',       // 16px
    md: '1.25rem',    // 20px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '2.5rem',  // 40px
};

// ============================================================================
// COMPONENT STYLES
// ============================================================================

export const components = {
    // Button Styles
    button: {
        primary: 'bg-black text-white hover:bg-gray-800 px-8 py-4 text-body font-medium transition-colors duration-200',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-3 text-body font-medium transition-colors duration-200',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-body font-medium transition-colors duration-200',
    },

    // Card Styles
    card: {
        default: 'bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200',
        elevated: 'bg-white border border-gray-200 rounded-2xl p-6 shadow-lg',
        interactive: 'bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer',
    },

    // Input Styles
    input: {
        default: 'w-full px-4 py-3 border border-gray-300 rounded-xl text-body focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
        error: 'w-full px-4 py-3 border border-red-300 rounded-xl text-body focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200',
    },

    // Badge Styles
    badge: {
        default: 'inline-flex items-center px-3 py-1 rounded-full text-caption font-medium',
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-gray-100 text-gray-700',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
    },
};

// ============================================================================
// LAYOUT UTILITIES
// ============================================================================

export const layout = {
    // Container
    container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',

    // Grid
    grid: {
        '2-cols': 'grid grid-cols-1 lg:grid-cols-2 gap-8',
        '3-cols': 'grid grid-cols-1 lg:grid-cols-3 gap-8',
        '4-cols': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    },

    // Flex
    flex: {
        center: 'flex items-center justify-center',
        between: 'flex items-center justify-between',
        start: 'flex items-center justify-start',
        end: 'flex items-center justify-end',
    },

    // Spacing
    spacing: {
        section: 'space-y-10',
        component: 'space-y-6',
        item: 'space-y-4',
    },
};

// ============================================================================
// TYPOGRAPHY CLASSES (for Tailwind)
// ============================================================================

export const typographyClasses = {
    display: 'text-display font-bold leading-tight tracking-tight',
    heading: 'text-heading font-semibold leading-tight tracking-tight',
    subheading: 'text-subheading font-semibold leading-tight tracking-tight',
    body: 'text-body font-normal leading-relaxed',
    caption: 'text-caption font-normal leading-relaxed',
    small: 'text-small font-normal leading-relaxed',
    button: 'text-body font-medium leading-tight',
    link: 'text-body font-medium leading-tight hover:underline',
};

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

export const animations = {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
};

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
};

// ============================================================================
// EXPORT ALL DESIGN TOKENS
// ============================================================================

export default {
    typography,
    spacing,
    colors,
    borderRadius,
    shadows,
    iconSizes,
    components,
    layout,
    typographyClasses,
    breakpoints,
    animations,
    zIndex,
};
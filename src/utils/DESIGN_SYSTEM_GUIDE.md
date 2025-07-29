# Uber-Style Design System Guide

## Overview

This design system provides a consistent, Uber-inspired UI experience across the car wash application. It includes typography, spacing, colors, and reusable components.

## Design Tokens

### Typography

- `text-display`: 48px, font-bold (Main headings)
- `text-heading`: 32px, font-semibold (Section headings)
- `text-subheading`: 24px, font-semibold (Subsection headings)
- `text-body`: 16px, font-normal (Body text)
- `text-caption`: 14px, font-medium (Captions, labels)
- `text-small`: 12px, font-medium (Small text)

### Spacing

- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-10`: 40px
- `space-12`: 48px

### Colors

- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Gray scale: 50-900

### Border Radius

- `rounded-xl`: 12px
- `rounded-2xl`: 16px

### Shadows

- `shadow-lg`: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- `shadow-xl`: 0 20px 25px -5px rgba(0, 0, 0, 0.1)

### Icon Sizes

- `h-4 w-4`: Small icons
- `h-5 w-5`: Medium icons
- `h-6 w-6`: Large icons

## Components

### UberButton

A versatile button component with multiple variants and sizes.

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: ReactNode (optional)
- `disabled`: boolean
- `onClick`: function
- `className`: string

**Usage:**

```tsx
<UberButton variant="primary" size="md" icon={<Plus />}>
  Add Item
</UberButton>
```

### UberCard

A card component for content containers.

**Props:**

- `variant`: 'default' | 'elevated'
- `padding`: 'sm' | 'md' | 'lg'
- `children`: ReactNode
- `className`: string

**Usage:**

```tsx
<UberCard variant="elevated" padding="lg">
  <h3>Card Title</h3>
  <p>Card content</p>
</UberCard>
```

### UberInput

An input component with consistent styling.

**Props:**

- `label`: string
- `placeholder`: string
- `value`: string
- `onChange`: (value: string) => void
- `icon`: ReactNode (optional)
- `type`: string
- `required`: boolean
- `disabled`: boolean

**Usage:**

```tsx
<UberInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  icon={<Mail />}
/>
```

### UberBadge

A badge component for status indicators and labels.

**Props:**

- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `children`: ReactNode
- `className`: string

**Usage:**

```tsx
<UberBadge variant="success" size="md">
  Completed
</UberBadge>
```

### UberModal

A modal component for dialogs and overlays.

**Props:**

- `isOpen`: boolean
- `onClose`: () => void
- `title`: string (optional)
- `children`: ReactNode
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `showCloseButton`: boolean
- `className`: string

**Usage:**

```tsx
<UberModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content</p>
</UberModal>
```

### SignOutModal

A specialized modal for sign-out confirmation.

**Props:**

- `isOpen`: boolean
- `onClose`: () => void
- `onConfirm`: () => void

**Usage:**

```tsx
<SignOutModal
  isOpen={signOutModalOpen}
  onClose={() => setSignOutModalOpen(false)}
  onConfirm={handleLogout}
/>
```

## File Structure

```
src/
├── components/
│   └── ui/
│       ├── UberButton.tsx
│       ├── UberCard.tsx
│       ├── UberInput.tsx
│       ├── UberBadge.tsx
│       ├── UberModal.tsx
│       └── SignOutModal.tsx
└── utils/
    └── DESIGN_SYSTEM_GUIDE.md
```

## Usage Guidelines

### 1. Typography Hierarchy

- Use `text-display` for main page titles
- Use `text-heading` for section headers
- Use `text-body` for regular content
- Use `text-caption` for labels and secondary text

### 2. Spacing Consistency

- Use the defined spacing tokens for margins and padding
- Maintain consistent spacing between related elements
- Use larger spacing for section separation

### 3. Color Usage

- Use primary blue for main actions and branding
- Use semantic colors (success, warning, error) appropriately
- Maintain good contrast ratios for accessibility

### 4. Component Composition

- Compose complex UIs using the basic components
- Maintain consistent padding and spacing
- Use appropriate variants for different contexts

## Component Checklist

When creating new components, ensure they follow these guidelines:

- [ ] Use design system typography classes
- [ ] Apply consistent spacing with defined tokens
- [ ] Use semantic color classes
- [ ] Include proper hover and focus states
- [ ] Support both light and dark themes
- [ ] Include proper TypeScript types
- [ ] Follow the established naming conventions
- [ ] Include proper accessibility attributes
- [ ] Test with different screen sizes
- [ ] Document props and usage examples

## Best Practices

1. **Consistency**: Always use the design system components and tokens
2. **Accessibility**: Ensure proper contrast ratios and keyboard navigation
3. **Responsive**: Design for mobile-first and scale up
4. **Performance**: Use efficient rendering patterns
5. **Maintainability**: Keep components focused and reusable

## Extending the System

When adding new components:

1. Follow the established patterns
2. Use the existing design tokens
3. Document the component thoroughly
4. Update this guide
5. Test across different contexts

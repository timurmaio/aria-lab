import { type ReactNode } from 'react';
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { height: '2rem', padding: '0 0.75rem', fontSize: '0.75rem' },
  md: { height: '2.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem' },
  lg: { height: '3rem', padding: '0.5rem 2rem', fontSize: '1.125rem' },
  icon: { height: '2.5rem', width: '2.5rem' },
  'icon-sm': { height: '2rem', width: '2rem' },
  'icon-lg': { height: '3rem', width: '3rem' },
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--aria-accent)',
    color: 'var(--aria-accent-text)',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'var(--aria-bg-secondary)',
    color: 'var(--aria-text-primary)',
    border: '1px solid var(--aria-border)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--aria-text-primary)',
    border: 'none',
  },
  link: {
    backgroundColor: 'transparent',
    color: 'var(--aria-accent)',
    border: 'none',
    textDecoration: 'underline',
  },
  destructive: {
    backgroundColor: 'var(--aria-error)',
    color: '#ffffff',
    border: 'none',
  },
};

const baseStyles: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  whiteSpace: 'nowrap',
  borderRadius: 'var(--aria-radius-md)',
  fontSize: '0.875rem',
  fontWeight: '500',
  transition: 'all 200ms ease',
  cursor: 'pointer',
  outline: 'none',
};

const focusStyles: React.CSSProperties = {
  boxShadow: 'var(--aria-focus-ring)',
};

const disabledStyles: React.CSSProperties = {
  opacity: '0.5',
  cursor: 'not-allowed',
  pointerEvents: 'none',
};

export interface ButtonProps extends AriaButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  style,
  ...props
}: ButtonProps) {
  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <AriaButton
      className={className}
      style={combinedStyles}
      {...props}
    >
      {children}
    </AriaButton>
  );
}

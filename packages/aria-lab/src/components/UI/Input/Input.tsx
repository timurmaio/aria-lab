import { type ReactNode, type InputHTMLAttributes } from 'react';
import { Input as AriaInput } from 'react-aria-components';

type InputVariant = 'default' | 'error';
type InputSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<InputSize, React.CSSProperties> = {
  sm: { height: '2rem', padding: '0 0.5rem', fontSize: '0.75rem' },
  md: { height: '2.5rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem' },
  lg: { height: '3rem', padding: '0.75rem 1rem', fontSize: '1.125rem' },
};

const variantStyles: Record<InputVariant, React.CSSProperties> = {
  default: {
    border: '1px solid var(--aria-border)',
    backgroundColor: 'var(--aria-bg-primary)',
  },
  error: {
    border: '1px solid var(--aria-error)',
    backgroundColor: 'var(--aria-bg-primary)',
  },
};

const baseStyles: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  borderRadius: 'var(--aria-radius-md)',
  color: 'var(--aria-text-primary)',
  transition: 'all 200ms ease',
  outline: 'none',
  fontSize: '0.875rem',
};

const focusStyles: React.CSSProperties = {
  boxShadow: 'var(--aria-focus-ring)',
};

const disabledStyles: React.CSSProperties = {
  opacity: '0.5',
  cursor: 'not-allowed',
  pointerEvents: 'none',
  backgroundColor: 'var(--aria-bg-disabled)',
};

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
}

export function Input({
  variant = 'default',
  size = 'md',
  className,
  style,
  disabled,
  ...props
}: InputProps) {
  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...(disabled ? disabledStyles : {}),
    ...style,
  };

  return (
    <AriaInput
      className={className}
      style={combinedStyles}
      disabled={disabled}
      {...props}
    />
  );
}

export interface InputGroupProps {
  children: ReactNode;
  className?: string;
}

export function InputGroup({ children, className }: InputGroupProps) {
  return (
    <div style={{ position: 'relative' }} className={className}>
      {children}
    </div>
  );
}

export interface InputAddonProps {
  children: ReactNode;
  position?: 'left' | 'right';
  className?: string;
}

export function InputAddon({ children, position = 'left', className }: InputAddonProps) {
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 0.75rem',
    fontSize: '0.875rem',
    color: 'var(--aria-text-secondary)',
    ...(position === 'left' ? { left: 0 } : { right: 0 }),
  };

  return (
    <div style={positionStyle} className={className}>
      {children}
    </div>
  );
}

import { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
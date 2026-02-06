import { ReactNode, HTMLAttributes } from 'react';
import './Card.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated';
  borderColor?: string;
}

export function Card({
  children,
  variant = 'default',
  borderColor,
  className = '',
  ...props
}: CardProps) {
  const style = borderColor ? { borderLeftColor: borderColor } : undefined;
  
  return (
    <div
      className={`card card-${variant} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

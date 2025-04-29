import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined';
  children: React.ReactNode;
}

export default function Button({ variant = 'filled', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-6 py-2 rounded-lg font-medium transition-all duration-200 text-lg';
  const variantStyles = {
    filled: 'bg-amber-600 text-white hover:bg-amber-700 hover:cursor-pointer',
    outlined: 'border-2 border-amber-600 text-amber-700 hover:bg-amber-100/50 hover:cursor-pointer hover:bg-amber-700 hover:text-[white]'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 
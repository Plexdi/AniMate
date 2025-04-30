'use client'
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function Button({
  children,
  onClick,
  variant = 'filled',
  size = 'md',
  className = ''
}: ButtonProps) {
  const base = 'font-semibold rounded transition duration-200';
  const sizes = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const variants = {
    filled: '',
    outlined: 'border', // just apply border, caller controls color
  };

  const styles = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

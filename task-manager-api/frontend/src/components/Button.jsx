import { cn, btnBase, btnPrimary, btnSecondary, btnDanger, btnGhost } from '../styles/classes.js';

/**
 * Reusable raised button.
 *
 * Variants: primary | secondary | danger | ghost
 * Sizes:    sm | md | lg
 */
const VARIANTS = {
  primary: btnPrimary,
  secondary: btnSecondary,
  danger: btnDanger,
  ghost: btnGhost,
};

const SIZES = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3',
};

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
  ...rest
}) => {
  const variantClasses = VARIANTS[variant] || VARIANTS.primary;
  const sizeClasses = SIZES[size] || SIZES.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(btnBase, variantClasses, sizeClasses, className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

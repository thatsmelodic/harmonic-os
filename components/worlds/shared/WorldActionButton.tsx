import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
};

type Props = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function WorldActionButton({ children, className = '', variant = 'primary', href, type = 'button', ...buttonProps }: Props) {
  const classes = `cinematic-action cinematic-action--${variant} ${className}`;
  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button type={type} className={classes} {...buttonProps}>{children}</button>;
}

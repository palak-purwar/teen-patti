import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = {
  kind?: 'primary' | 'secondary' | 'link';
  href?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function Button({ kind = 'primary', href, children, className = '', disabled, ...rest }: Props) {
  const cls = `btn btn-${kind} ${className}`.trim();
  if (href !== undefined)
    return (
      <a className={cls} href={href} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined}
        onClick={(e) => { if (disabled) e.preventDefault(); else (rest.onClick as unknown as ((ev: unknown) => void) | undefined)?.(e); }}>
        {children}
      </a>
    );
  return (
    <button type="button" className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

export const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
export const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const CheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);
export const WheelIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
  </svg>
);

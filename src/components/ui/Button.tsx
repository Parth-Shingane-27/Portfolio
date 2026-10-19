import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

const styles: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:bg-ink',
  ghost: 'border border-line-strong text-ink hover:border-accent hover:text-accent',
}

export function ButtonLink({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: { variant?: Variant; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...rest}
      className={`roll-host inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

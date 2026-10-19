import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

const styles: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:brightness-110',
  ghost: 'border border-line text-ink hover:border-ink',
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
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

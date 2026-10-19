import { SplitChars } from '../fx/SplitText'

/** Every section opens the same way: small eyebrow, big heading. `title` may wrap words in *asterisks* for the accent colour. */
export function SectionHeading({ eyebrow, title, className = '' }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className={`mb-14 md:mb-16 ${className}`}>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
        <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 className="display mt-5 max-w-4xl text-[clamp(2.4rem,6.4vw,5.5rem)]">
        <SplitChars text={title} inView stagger={0.018} />
      </h2>
    </div>
  )
}

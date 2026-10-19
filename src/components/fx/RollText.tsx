/** Text that rolls up to a duplicate on hover. The parent link/button must carry the `roll-host` class. */
export function RollText({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}

import type { FeaturedProject } from '../../data/portfolio'

// Illustrative graphics only. They are labelled as such in ProjectCard and are not application screenshots.

function SafeDrainVisual() {
  const bars = [30, 44, 38, 62, 48, 78, 56, 40, 34]
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="480" height="300" fill="var(--bg-alt)" />
      <text x="24" y="36" className="fill-muted font-mono" fontSize="11" letterSpacing="2">GAS LEVEL · SENSOR 03</text>
      {bars.map((h, i) => (
        <rect key={i} x={24 + i * 28} y={140 - h} width="18" height={h} rx="2" fill={i === 5 ? 'var(--accent)' : 'var(--line)'} />
      ))}
      <line x1="24" y1="140" x2="276" y2="140" stroke="var(--line)" />
      <line x1="24" y1="90" x2="276" y2="90" stroke="var(--accent)" strokeDasharray="4 4" />
      <text x="280" y="94" className="fill-accent font-mono" fontSize="10">THRESHOLD</text>
      <g transform="translate(24 176)">
        {['Worker A · in sewer', 'Worker B · at surface', 'SOS · acknowledged'].map((t, i) => (
          <g key={t} transform={`translate(0 ${i * 38})`}>
            <rect width="300" height="30" rx="4" fill="none" stroke="var(--line)" />
            <circle cx="16" cy="15" r="4" fill={i === 0 ? 'var(--accent)' : 'var(--muted)'} className={i === 0 ? 'pulse' : undefined} />
            <text x="30" y="19" className="fill-ink font-mono" fontSize="11">{t}</text>
          </g>
        ))}
      </g>
      <g transform="translate(350 60)">
        <circle cx="50" cy="50" r="46" fill="none" stroke="var(--line)" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="var(--line)" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="var(--line)" />
        <circle cx="68" cy="38" r="5" fill="var(--accent)" className="pulse" />
        <circle cx="34" cy="62" r="4" fill="var(--ink)" />
        <text x="50" y="128" textAnchor="middle" className="fill-muted font-mono" fontSize="10" letterSpacing="2">LIVE MAP</text>
      </g>
    </svg>
  )
}

function GridlockVisual() {
  const cells = Array.from({ length: 8 * 5 }, (_, i) => {
    const x = i % 8
    const y = Math.floor(i / 8)
    const d = Math.hypot(x - 5, y - 2)
    return Math.max(0.06, 1 - d / 5)
  })
  const pts = [20, 44, 36, 70, 58, 92, 80, 110, 98]
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="480" height="300" fill="var(--bg-alt)" />
      <text x="24" y="36" className="fill-muted font-mono" fontSize="11" letterSpacing="2">DEMAND DENSITY · GRID</text>
      {cells.map((o, i) => (
        <rect key={i} x={24 + (i % 8) * 34} y={50 + Math.floor(i / 8) * 34} width="30" height="30" rx="3" fill="var(--accent)" opacity={o} />
      ))}
      <text x="330" y="36" className="fill-muted font-mono" fontSize="11" letterSpacing="2">ENSEMBLE</text>
      <polyline points={pts.map((p, i) => `${330 + i * 17},${150 - p}`).join(' ')} fill="none" stroke="var(--ink)" strokeWidth="2" />
      <polyline points={pts.map((p, i) => `${330 + i * 17},${156 - p * 0.95}`).join(' ')} fill="none" stroke="var(--accent)" strokeWidth="2" className="flow" />
      <g transform="translate(24 245)">
        {['LightGBM', 'CatBoost', 'Blend'].map((t, i) => (
          <g key={t} transform={`translate(${i * 100} 0)`}>
            <rect width="88" height="28" rx="14" fill="none" stroke={i === 2 ? 'var(--accent)' : 'var(--line)'} />
            <text x="44" y="18" textAnchor="middle" className="fill-ink font-mono" fontSize="11">{t}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

function WeatherVisual() {
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="480" height="300" fill="var(--bg-alt)" />
      <text x="24" y="36" className="fill-muted font-mono" fontSize="11" letterSpacing="2">RAINFALL · REGIONAL VIEW</text>
      <path d="M70 90 C 120 50, 200 60, 240 80 S 340 70, 380 110 S 400 190, 340 230 S 200 250, 140 220 S 40 150, 70 90Z" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      {[
        [150, 120, 34],
        [250, 150, 46],
        [320, 130, 24],
        [210, 200, 28],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="var(--accent)" opacity={0.18 + i * 0.07} className={i === 1 ? 'pulse' : undefined} />
      ))}
      {[
        [150, 120],
        [250, 150],
        [320, 130],
        [210, 200],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="var(--ink)" />
      ))}
      <g transform="translate(24 252)">
        {['Forecast', 'Warnings', 'Nowcast'].map((t, i) => (
          <g key={t} transform={`translate(${i * 100} 0)`}>
            <rect width="88" height="28" rx="14" fill="none" stroke="var(--line)" />
            <text x="44" y="18" textAnchor="middle" className="fill-ink font-mono" fontSize="11">{t}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

export function ProjectVisual({ id }: { id: FeaturedProject['id'] }) {
  if (id === 'safedrain') return <SafeDrainVisual />
  if (id === 'gridlock') return <GridlockVisual />
  return <WeatherVisual />
}

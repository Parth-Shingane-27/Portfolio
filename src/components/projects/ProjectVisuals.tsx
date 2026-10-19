import type { FeaturedProject } from '../../data/portfolio'

// Illustrative graphics only. They are labelled as such in ProjectShowcase and are not application screenshots.

function SafeDrainVisual() {
  const bars = [30, 44, 38, 62, 48, 78, 56, 40, 34]
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="480" height="300" fill="var(--surface)" />
      <text x="24" y="36" className="fill-muted font-mono" fontSize="11" letterSpacing="2">GAS LEVEL · SENSOR 03</text>
      {bars.map((h, i) => (
        <rect key={i} x={24 + i * 28} y={140 - h} width="18" height={h} rx="2" fill={i === 5 ? 'var(--p)' : 'var(--line)'} />
      ))}
      <line x1="24" y1="140" x2="276" y2="140" stroke="var(--line)" />
      <line x1="24" y1="90" x2="276" y2="90" stroke="var(--p)" strokeDasharray="4 4" />
      <text x="280" y="94" className="fill-[var(--p)] font-mono" fontSize="10">THRESHOLD</text>
      <g transform="translate(24 176)">
        {['Worker A · in sewer', 'Worker B · at surface', 'SOS · acknowledged'].map((t, i) => (
          <g key={t} transform={`translate(0 ${i * 38})`}>
            <rect width="300" height="30" rx="4" fill="none" stroke="var(--line)" />
            <circle cx="16" cy="15" r="4" fill={i === 0 ? 'var(--p)' : 'var(--muted)'} className={i === 0 ? 'pulse' : undefined} />
            <text x="30" y="19" className="fill-ink font-mono" fontSize="11">{t}</text>
          </g>
        ))}
      </g>
      <g transform="translate(350 60)">
        <circle cx="50" cy="50" r="46" fill="none" stroke="var(--line)" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="var(--line)" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="var(--line)" />
        <circle cx="68" cy="38" r="5" fill="var(--p)" className="pulse" />
        <circle cx="34" cy="62" r="4" fill="var(--ink)" />
        <text x="50" y="128" textAnchor="middle" className="fill-muted font-mono" fontSize="10" letterSpacing="2">LIVE MAP</text>
      </g>
    </svg>
  )
}

function KrishiBhavVisual() {
  const pts = [60, 78, 66, 96, 88, 120, 110, 140, 128, 156]
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="480" height="300" fill="var(--surface)" />
      <text x="24" y="36" className="fill-muted font-mono" fontSize="11" letterSpacing="2">PRICE FORECAST · MANDI</text>
      <line x1="24" y1="210" x2="456" y2="210" stroke="var(--line)" />
      <polyline points={pts.map((p, i) => `${24 + i * 48},${210 - p}`).join(' ')} fill="none" stroke="var(--ink)" strokeWidth="2" />
      <polyline points={pts.slice(5).map((p, i) => `${264 + i * 48},${204 - p}`).join(' ')} fill="none" stroke="var(--p)" strokeWidth="2" strokeDasharray="6 5" className="flow" />
      <circle cx="456" cy={54} r="5" fill="var(--p)" className="pulse" />
      <g transform="translate(24 245)">
        {['Agmarknet', 'Forecast', 'Mandi'].map((t, i) => (
          <g key={t} transform={`translate(${i * 100} 0)`}>
            <rect width="88" height="28" rx="14" fill="none" stroke={i === 2 ? 'var(--p)' : 'var(--line)'} />
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
      <rect width="480" height="300" fill="var(--surface)" />
      <text x="24" y="36" className="fill-muted font-mono" fontSize="11" letterSpacing="2">RAINFALL · REGIONAL VIEW</text>
      <path d="M70 90 C 120 50, 200 60, 240 80 S 340 70, 380 110 S 400 190, 340 230 S 200 250, 140 220 S 40 150, 70 90Z" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      {[
        [150, 120, 34],
        [250, 150, 46],
        [320, 130, 24],
        [210, 200, 28],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="var(--p)" opacity={0.18 + i * 0.07} className={i === 1 ? 'pulse' : undefined} />
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

function AStarVisual() {
  const cols = 12
  const rows = 6
  const walls = new Set(['3,1', '3,2', '3,3', '6,2', '6,3', '6,4', '6,5', '9,0', '9,1', '9,2'])
  const path: [number, number][] = [[0, 3], [1, 3], [2, 4], [3, 4], [4, 4], [5, 3], [5, 2], [5, 1], [6, 1], [7, 1], [8, 2], [8, 3], [9, 3], [10, 3], [11, 3]]
  const cell = 34
  return (
    <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="480" height="300" fill="var(--surface)" />
      <text x="24" y="36" className="fill-muted font-mono" fontSize="11" letterSpacing="2">A* SEARCH · GRID</text>
      <g transform="translate(36 56)">
        {Array.from({ length: cols * rows }, (_, i) => {
          const x = i % cols
          const y = Math.floor(i / cols)
          return <rect key={i} x={x * cell} y={y * cell} width={cell - 3} height={cell - 3} rx="3" fill={walls.has(`${x},${y}`) ? 'var(--ink)' : 'none'} fillOpacity={0.55} stroke="var(--line)" />
        })}
        <polyline points={path.map(([x, y]) => `${x * cell + cell / 2 - 1},${y * cell + cell / 2 - 1}`).join(' ')} fill="none" stroke="var(--p)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flow" />
        <circle cx={cell / 2 - 1} cy={3 * cell + cell / 2 - 1} r="7" fill="var(--p)" />
        <circle cx={11 * cell + cell / 2 - 1} cy={3 * cell + cell / 2 - 1} r="7" fill="none" stroke="var(--p)" strokeWidth="2" className="pulse" />
      </g>
      <g transform="translate(24 266)">
        {['g(n) cost', 'h(n) heuristic', 'f = g + h'].map((t, i) => (
          <g key={t} transform={`translate(${i * 112} 0)`}>
            <rect width="104" height="26" rx="13" fill="none" stroke={i === 2 ? 'var(--p)' : 'var(--line)'} />
            <text x="52" y="17" textAnchor="middle" className="fill-ink font-mono" fontSize="10">{t}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

export function ProjectVisual({ id }: { id: FeaturedProject['id'] }) {
  if (id === 'safedrain') return <SafeDrainVisual />
  if (id === 'krishibhav') return <KrishiBhavVisual />
  if (id === 'astar') return <AStarVisual />
  return <WeatherVisual />
}

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './DashboardSandbox.module.css'

/* ─── Accent palette options ─────────────────────────── */
const ACCENTS = [
  { key: 'Cyan', value: 'var(--project-cyan-accent)', dim: 'var(--project-cyan-bg)', bright: 'var(--project-cyan-text)' },
  { key: 'Magenta', value: 'var(--project-magenta-accent)', dim: 'var(--project-magenta-bg)', bright: 'var(--project-magenta-text)' },
  { key: 'Amber', value: 'var(--project-yellow-accent)', dim: 'var(--project-yellow-bg)', bright: 'var(--project-yellow-text)' },
  { key: 'Green', value: 'var(--project-green-accent)', dim: 'var(--project-green-bg)', bright: 'var(--project-green-text)' },
]

/* ─── Metric sparklines ────────────────────────────────── */
function Sparkline({ points, color, width = 120, height = 36 }) {
  if (!points.length) return null
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const step = width / (points.length - 1)

  const path = points
    .map((p, i) => {
      const x = i * step
      const y = height - ((p - min) / range) * (height - 4) - 2
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  const fillPath = `${path} L${((points.length - 1) * step).toFixed(1)},${height} L0,${height} Z`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={styles.sparkline}>
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#sg-${color.replace('#', '')})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Individual Metric card ───────────────────────────── */
function MetricCard({ label, value, unit, suffix, color, history, accentColor }) {
  const displayColor = color === 'accent' ? accentColor : color
  return (
    <div className={styles.metricCard}>
      <div className={styles.metricTop}>
        <span className={styles.metricLabel}>{label}</span>
        <div className={styles.metricValue} style={{ color: displayColor }}>
          {value}<span className={styles.metricUnit}>{unit || suffix}</span>
        </div>
      </div>
      <Sparkline points={history} color={displayColor} />
    </div>
  )
}

/* ─── Main Component ───────────────────────────────────── */
export default function DashboardSandbox() {
  const { language, t } = useLanguage()
  const [users, setUsers] = useState(248)
  const [latency, setLatency] = useState(42)
  const [cpu, setCpu] = useState(31)
  const [accentIdx, setAccentIdx] = useState(() => {
    const saved = localStorage.getItem('portfolio-accent')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.key) {
          const idx = ACCENTS.findIndex(a => a.key.toLowerCase() === parsed.key.toLowerCase())
          if (idx !== -1) return idx
        }
        if (parsed.value) {
          // Compatibility with older saved hex values
          const oldHexMap = {
            '#00D4FF': 'Cyan',
            '#FF2079': 'Magenta',
            '#D97706': 'Amber',
            '#00FF88': 'Green'
          }
          const keyName = oldHexMap[parsed.value]
          if (keyName) {
            const idx = ACCENTS.findIndex(a => a.key === keyName)
            if (idx !== -1) return idx
          }
        }
      } catch {
        return 0
      }
    }
    return 0
  })
  const accent = ACCENTS[accentIdx]

  // History buffers for sparklines
  const [usersHist, setUsersHist] = useState(() => Array.from({ length: 12 }, () => Math.floor(200 + Math.random() * 100)))
  const [latHist, setLatHist] = useState(() => Array.from({ length: 12 }, () => Math.floor(30 + Math.random() * 40)))
  const [cpuHist, setCpuHist] = useState(() => Array.from({ length: 12 }, () => Math.floor(20 + Math.random() * 50)))

  const push = useCallback((hist, val) => [...hist.slice(-11), val], [])

  // Live drift simulation
  useEffect(() => {
    const id = setInterval(() => {
      setUsers(v => {
        const next = Math.max(50, Math.min(500, v + Math.round((Math.random() - 0.48) * 8)))
        setUsersHist(h => push(h, next))
        return next
      })
      setLatency(v => {
        const next = Math.max(8, Math.min(200, v + Math.round((Math.random() - 0.5) * 6)))
        setLatHist(h => push(h, next))
        return next
      })
      setCpu(v => {
        const next = Math.max(5, Math.min(95, v + Math.round((Math.random() - 0.5) * 4)))
        setCpuHist(h => push(h, next))
        return next
      })
    }, 1400)
    return () => clearInterval(id)
  }, [push])

  // Apply accent to CSS variables globally and save to localStorage
  useEffect(() => {
    const root = document.documentElement
    const key = accent.key.toLowerCase()
    root.setAttribute('data-accent', key)
    localStorage.setItem('portfolio-accent', JSON.stringify({ key: accent.key }))
  }, [accent])

  const cpuColor = cpu > 70 ? 'var(--red-stat)' : cpu > 45 ? 'var(--accent-2)' : 'var(--green)'
  const latColor = latency > 100 ? 'var(--red-stat)' : latency > 60 ? 'var(--accent-2)' : 'var(--green)'

  return (
    <div className={styles.sandbox}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>{t('dashboard.eyebrow')}</span>
          <h3 className={styles.sandboxTitle}>{t('dashboard.sandboxTitle')}</h3>
          <p className={styles.sandboxSub}>{t('dashboard.sandboxSub')}</p>
        </div>
        <div className={styles.liveChip}>
          <span className={styles.liveDot} />
          Live
        </div>
      </div>

      {/* ── Metric cards ── */}
      <div className={styles.metrics}>
        <MetricCard
          label={t('dashboard.activeUsers')}
          value={users}
          color="accent"
          accentColor={accent.value}
          history={usersHist}
        />
        <MetricCard
          label={t('dashboard.networkLatency')}
          value={latency}
          unit=" ms"
          color={latColor}
          accentColor={accent.value}
          history={latHist}
        />
        <MetricCard
          label={t('dashboard.cpu')}
          value={cpu}
          suffix="%"
          color={cpuColor}
          accentColor={accent.value}
          history={cpuHist}
        />
      </div>

      {/* ── Sliders ── */}
      <div className={styles.controls}>
        <div className={styles.sliderRow}>
          <label className={styles.sliderLabel}>
            <span>{t('dashboard.usersLabel')}</span>
            <span className={styles.sliderVal}>{users}</span>
          </label>
          <input
            type="range" min="50" max="500"
            value={users}
            className={styles.slider}
            style={{ '--pct': `${((users - 50) / 450) * 100}%`, '--clr': accent.value }}
            onChange={e => {
              const v = +e.target.value
              setUsers(v)
              setUsersHist(h => push(h, v))
            }}
          />
        </div>

        <div className={styles.sliderRow}>
          <label className={styles.sliderLabel}>
            <span>{t('dashboard.latencyLabel')}</span>
            <span className={styles.sliderVal} style={{ color: latColor }}>{latency}</span>
          </label>
          <input
            type="range" min="8" max="200"
            value={latency}
            className={styles.slider}
            style={{ '--pct': `${((latency - 8) / 192) * 100}%`, '--clr': latColor }}
            onChange={e => {
              const v = +e.target.value
              setLatency(v)
              setLatHist(h => push(h, v))
            }}
          />
        </div>

        <div className={styles.sliderRow}>
          <label className={styles.sliderLabel}>
            <span>{t('dashboard.cpuLabel')}</span>
            <span className={styles.sliderVal} style={{ color: cpuColor }}>{cpu}</span>
          </label>
          <input
            type="range" min="5" max="95"
            value={cpu}
            className={styles.slider}
            style={{ '--pct': `${((cpu - 5) / 90) * 100}%`, '--clr': cpuColor }}
            onChange={e => {
              const v = +e.target.value
              setCpu(v)
              setCpuHist(h => push(h, v))
            }}
          />
        </div>
      </div>

      {/* ── Theme customizer ── */}
      <div className={styles.themeRow}>
        <span className={styles.themeLabel}>{t('dashboard.portfolioColor')}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className={styles.swatches}>
            {ACCENTS.map((a, i) => {
              const swatchName = t(`dashboard.accent${a.key}`)
              return (
                <button
                  key={a.key}
                  title={swatchName}
                  className={`${styles.swatch} ${i === accentIdx ? styles.swatchActive : ''}`}
                  style={{ background: a.value }}
                  onClick={() => setAccentIdx(i)}
                  aria-label={language === 'es' ? `Cambiar a ${swatchName}` : `Change to ${swatchName}`}
                />
              )
            })}
          </div>
          {accentIdx !== 0 && (
            <button
              onClick={() => setAccentIdx(0)}
              className={styles.resetBtn}
              aria-label={language === 'es' ? 'Restablecer color predeterminado' : 'Reset default color'}
              title={language === 'es' ? 'Restablecer' : 'Reset'}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px' }}>
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              {language === 'es' ? 'Restablecer' : 'Reset'}
            </button>
          )}
        </div>
        <span className={styles.themeHint}>{t('dashboard.themeHint')}</span>
      </div>
    </div>
  )
}

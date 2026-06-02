import { useState, useRef, useEffect } from 'react'
import styles from '../ProjectCard.module.css'

function sparklinePoints() {
  const pts = []
  let seed = 42
  const next = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  for (let i = 0; i < 20; i++) {
    const x = i * 10
    const y = 40 - (Math.sin(i * 0.5) * 15 + (next() - 0.5) * 10 + 20)
    pts.push(`${x},${y}`)
  }
  return pts.join(' ')
}

export default function Sparkline({ accent, isActive }) {
  const [drawn, setDrawn] = useState(false)
  const [hover, setHover] = useState(false)
  const [points] = useState(sparklinePoints)
  const svgRef = useRef(null)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setDrawn(true), 300)
          obs.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const active = drawn || hover
  const lastPoint = points.split(' ').at(-1)?.split(',')
  const cx = lastPoint?.[0]
  const cy = lastPoint?.[1]

  return (
    <svg
      ref={svgRef}
      width="190" height="50" viewBox="0 0 190 50"
      className={styles.sparkline}
      onMouseEnter={() => isActive && setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <polyline
        fill="none"
        stroke={accent}
        strokeOpacity="0.25"
        strokeWidth="1"
        points={points}
      />
      <polyline
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        strokeDasharray="400"
        strokeDashoffset={active ? '0' : '400'}
        className={styles.sparklinePath}
      />
      {active && (
        <circle
          cx={cx}
          cy={cy}
          r="3"
          fill={accent}
          className={styles.sparklineDot}
        />
      )}
      <defs>
        <linearGradient id="sparkGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={accent} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon
        fill="url(#sparkGlow)"
        points={`0,50 ${points} 190,50`}
        opacity={active ? 1 : 0}
        className={styles.sparklineFill}
      />
    </svg>
  )
}

import { useState, useEffect, useRef } from 'react'
import { techIcons } from '../data/techIcons'
import styles from './FloatingIcons.module.css'

const TECH_ICONS = [
  { name: 'React',        url: techIcons.react,       size: 42 },
  { name: 'Vite',         url: techIcons.vite,        size: 38 },
  { name: 'HTML5',        url: techIcons.html5,       size: 46 },
  { name: 'CSS3',         url: techIcons.css3,        size: 38 },
  { name: 'JavaScript',   url: techIcons.javascript,  size: 48 },
  { name: 'Node.js',      url: techIcons.nodejs,      size: 44 },
  { name: 'Python',       url: techIcons.python,      size: 48 },
  { name: 'Express',      url: techIcons.express,     size: 36 },
  { name: 'SQLite',       url: techIcons.sqlite,      size: 40 },
  { name: 'OpenCV',       url: techIcons.opencv,      size: 44 },
  { name: 'Pandas',       url: techIcons.pandas,      size: 38 },
  { name: 'Git',          url: techIcons.git,         size: 46 },
  { name: 'GitHub',       url: techIcons.github,      size: 36 },
  { name: 'PostgreSQL',   url: techIcons.postgresql,  size: 48 },
  { name: 'MySQL',        url: techIcons.mysql,       size: 44 },
  { name: 'Tailwind CSS', url: techIcons.tailwindcss, size: 38 },
  { name: 'JWT',          url: techIcons.jwt,         size: 38 },
  { name: 'Flask',        url: techIcons.flask,       size: 40 },
  { name: 'Django',       url: techIcons.django,      size: 42 },
]

const TOP_OFFSET = 72
const CENTER_TOP = 0.30
const CENTER_BOT = 0.68

export default function FloatingIcons() {
  const [tooltip, setTooltip] = useState(null)
  const containerRef = useRef(null)
  const iconsRef = useRef([])   // img DOM elements
  const stateRef = useRef([])   // mutable { x, y, vx, vy } per icon
  const rafRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.offsetWidth
    let height = container.offsetHeight

    // Seed initial positions spread evenly to avoid clumping, starting below navbar
    stateRef.current = TECH_ICONS.map((icon, i) => {
      const col = i % 4
      const row = Math.floor(i / 4)
      const usableHeight = height - TOP_OFFSET
      const numRows = Math.ceil(TECH_ICONS.length / 4)
      const x = Math.min(
        (col + 0.5 + (Math.random() - 0.5) * 0.6) * (width / 4) - icon.size / 2,
        width - icon.size
      )
      const y = TOP_OFFSET + (row + 0.5 + (Math.random() - 0.5) * 0.6) * (usableHeight / numRows) - icon.size / 2
      return {
        x: Math.max(0, x),
        y: Math.max(TOP_OFFSET, y),
        vx: (Math.random() < 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.45),
        vy: (Math.random() < 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.45),
      }
    })

    function animate() {
      if (!containerRef.current) return
      width = container.offsetWidth
      height = container.offsetHeight

      stateRef.current.forEach((s, i) => {
        const icon = TECH_ICONS[i]
        const el = iconsRef.current[i]
        if (!el) return

        // Move
        s.x += s.vx
        s.y += s.vy

        // Bounce on edges — top edge respects navbar height
        if (s.x <= 0)                    { s.x = 0;                    s.vx =  Math.abs(s.vx) }
        if (s.x + icon.size >= width)    { s.x = width - icon.size;    s.vx = -Math.abs(s.vx) }
        if (s.y <= TOP_OFFSET)           { s.y = TOP_OFFSET;           s.vy =  Math.abs(s.vy) }
        if (s.y + icon.size >= height)   { s.y = height - icon.size;   s.vy = -Math.abs(s.vy) }

        // Apply position via CSS custom props
        el.style.setProperty('--ix', `${s.x}px`)
        el.style.setProperty('--iy', `${s.y}px`)

        // Center zone
        const yCenter = s.y + icon.size / 2
        const inCenter = yCenter / height > CENTER_TOP && yCenter / height < CENTER_BOT
        const wasCenter = el.dataset.center === 'true'
        if (inCenter !== wasCenter) el.dataset.center = String(inCenter)
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      if (!containerRef.current) return
      width = container.offsetWidth
      height = container.offsetHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  function handleMouseEnter(e, name) {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({ name, x: rect.left + rect.width / 2, y: rect.top - 6 })
  }

  return (
    <>
      <div ref={containerRef} className={styles.iconsLayer} aria-hidden="true">
        {TECH_ICONS.map((icon, i) => (
          <img
            key={icon.name}
            ref={(el) => (iconsRef.current[i] = el)}
            src={icon.url}
            alt={icon.name}
            data-name={icon.name}
            data-center="false"
            className={styles.floatingIcon}
            style={{ width: icon.size, height: icon.size }}
            draggable={false}
            onMouseEnter={(e) => handleMouseEnter(e, icon.name)}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}
      </div>

      {tooltip && (
        <div
          className={styles.iconTooltip}
          style={{ left: tooltip.x, top: tooltip.y }}
          aria-hidden="true"
        >
          {tooltip.name}
        </div>
      )}
    </>
  )
}

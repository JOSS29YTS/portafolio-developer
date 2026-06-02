import useInView from '../hooks/useInView'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * Reveal — fade + slide animation on scroll
 * Props:
 *   delay   — CSS transition-delay in seconds (default 0)
 *   distance — translateY offset in px (default 32)
 *   direction — 'up' | 'left' | 'right' (default 'up')
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  distance = 32,
  direction = 'up',
  style,
  ...props
}) {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <Tag ref={ref} style={{ opacity: 1, transform: 'none', ...style }} {...props}>
        {children}
      </Tag>
    )
  }

  const hidden = {
    opacity: 0,
    transform:
      direction === 'left'
        ? `translateX(-${distance}px)`
        : direction === 'right'
        ? `translateX(${distance}px)`
        : `translateY(${distance}px)`,
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  }

  const visible = {
    opacity: 1,
    transform: 'translate(0)',
  }

  return (
    <Tag
      ref={ref}
      style={{ ...hidden, ...(inView ? visible : {}), ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}

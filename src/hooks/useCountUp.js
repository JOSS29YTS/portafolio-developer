import { useEffect, useState } from 'react'

export default function useCountUp(end, { duration = 2000, startOnView = true, inView = true } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView && startOnView) return
    if (end === 0) return

    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [end, duration, startOnView, inView])

  return value
}

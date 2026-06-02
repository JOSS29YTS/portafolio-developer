import { useState, useEffect, useRef } from 'react'

export default function useTypewriter(
  phrases,
  {
    typeSpeed = 48,
    deleteSpeed = 24,
    pauseAfter = 2200,
    pauseBefore = 400,
  } = {}
) {
  const [display, setDisplay] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const phraseIdx = useRef(0)
  const charIdx = useRef(0)
  const deleting = useRef(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!phrases || phrases.length === 0) return

    const cursorTimer = setInterval(() => setShowCursor((v) => !v), 530)

    function tick() {
      const phrase = phrases[phraseIdx.current]
      if (!phrase) return

      if (!deleting.current) {
        charIdx.current++
        setDisplay(phrase.slice(0, charIdx.current))
        if (charIdx.current === phrase.length) {
          deleting.current = true
          timer.current = setTimeout(tick, pauseAfter + pauseBefore)
          return
        }
      } else {
        charIdx.current--
        setDisplay(phrase.slice(0, charIdx.current))
        if (charIdx.current === 0) {
          deleting.current = false
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length
          timer.current = setTimeout(tick, pauseBefore)
          return
        }
      }
      timer.current = setTimeout(tick, deleting.current ? deleteSpeed : typeSpeed)
    }

    timer.current = setTimeout(tick, 600)
    return () => {
      clearTimeout(timer.current)
      clearInterval(cursorTimer)
    }
  }, [phrases, typeSpeed, deleteSpeed, pauseAfter, pauseBefore])

  return { display, showCursor }
}

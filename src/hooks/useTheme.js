import { useState, useEffect } from 'react'

const STORAGE_KEY = 'portfolio-theme'
const DARK = 'dark'
const LIGHT = 'light'

/**
 * Hook que gestiona el tema claro/oscuro del portafolio.
 * - Persiste en localStorage bajo la clave 'portfolio-theme'
 * - Aplica data-theme="light" | "dark" en <html>
 * - Lee la preferencia del sistema como valor inicial si no hay nada guardado
 */
export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === LIGHT || saved === DARK) return saved
    } catch { /* localStorage blocked */ }
    // Fallback: por defecto siempre modo oscuro (Cyberpunk)
    return DARK
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === LIGHT) {
      root.setAttribute('data-theme', 'light')
    } else {
      root.removeAttribute('data-theme')
    }
    const themeColor = theme === LIGHT ? '#F5F0E8' : '#070711'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch { /* localStorage blocked */ }
  }, [theme])

  const toggle = () => setTheme(t => t === DARK ? LIGHT : DARK)

  return { theme, toggle, isDark: theme === DARK }
}

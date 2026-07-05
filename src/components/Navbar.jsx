import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import { useLanguage } from '../context/LanguageContext'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'inicio',     href: '/#home',     section: 'home'     },
  { label: 'sobre mí',  href: '/#about',    section: 'about'    },
  { label: 'experiencia', href: '/#timeline', section: 'timeline' },
  { label: '3D',        href: '/#3d',        section: '3d'       },
  { label: 'proyectos', href: '/#projects', section: 'projects' },
  { label: 'contacto',  href: '/#contact',  section: 'contact'  },
  { label: 'blog',      href: '/blog',       section: 'blog'     },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { pathname } = useLocation()
  const { isDark, toggle } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visibleRatios = useRef({})

  useEffect(() => {
    if (pathname !== '/') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection('')
      return
    }

    setActiveSection('home')

    let observer

    const timer = setTimeout(() => {
      const sections = NAV_LINKS.map(l => document.getElementById(l.section)).filter(Boolean)

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            visibleRatios.current[entry.target.id] = entry.intersectionRatio
          })

          let best = ''
          let bestRatio = 0
          for (const l of NAV_LINKS) {
            const r = visibleRatios.current[l.section] || 0
            if (r > bestRatio) {
              bestRatio = r
              best = l.section
            }
          }
          if (best) setActiveSection(best)
        },
        { threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] }
      )

      sections.forEach(el => observer.observe(el))
    }, 400)

    return () => {
      clearTimeout(timer)
      if (observer) observer.disconnect()
    }
  }, [pathname])

  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Saltar al contenido principal
      </a>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>ale<span>.dev</span></Link>

          <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            {pathname === '/' && NAV_LINKS.filter(l => l.section !== 'blog').map(l => (
              <a
                key={l.label}
                href={l.href}
                className={activeSection === l.section ? styles.active : ''}
                onClick={() => setMenuOpen(false)}
              >
                {t(`nav.${l.section}`)}
              </a>
            ))}
            {pathname !== '/' && (
              <Link to="/" onClick={() => setMenuOpen(false)}>
                {t('nav.home')}
              </Link>
            )}
            <Link
              to="/blog"
              className={pathname.startsWith('/blog') ? styles.active : ''}
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
          </div>

          {/* Controles del lado derecho: toggle de tema + toggle de idioma + hamburguesa */}
          <div className={styles.actions}>
            <button
              className={styles.langBtn}
              onClick={toggleLanguage}
              aria-label={language === 'es' ? 'Cambiar a inglés' : 'Change to Spanish'}
              title={language === 'es' ? 'English' : 'Español'}
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            <button
              className={styles.themeBtn}
              onClick={toggle}
              aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              {isDark ? (
                /* Sol — visible en modo oscuro para activar el claro */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2"  x2="12" y2="4"/>
                  <line x1="12" y1="20" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="2"  y1="12" x2="4"  y2="12"/>
                  <line x1="20" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                /* Luna — visible en modo claro para activar el oscuro */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            <button
              className={styles.menuBtn}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={menuOpen ? styles.x1 : ''}></span>
              <span className={menuOpen ? styles.x2 : ''}></span>
              <span className={menuOpen ? styles.x3 : ''}></span>
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

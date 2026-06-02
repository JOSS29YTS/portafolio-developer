import { useMemo } from 'react'
import { config } from '../data/portfolioConfig'
import useTypewriter from '../hooks/useTypewriter'
import { useLanguage } from '../context/LanguageContext'
import FloatingIcons from './FloatingIcons'
import styles from './Hero.module.css'

export default function Hero() {
  const { language, t } = useLanguage()

  const phrases = useMemo(() => {
    return language === 'es' ? [
      'Estudiante de Ing. de Sistemas — USM',
      'Construyo interfaces con React',
      'Web Full-Stack Junior',
      'Apasionado por el diseño de sistemas',
    ] : [
      'Systems Engineering Student — USM',
      'Building interfaces with React',
      'Junior Full-Stack Developer',
      'Passionate about systems design',
    ]
  }, [language])

  const { display, showCursor } = useTypewriter(phrases)

  // Dynamically set the CV URL based on active language
  const activeCvUrl = language === 'es' 
    ? '/CV_Alejandro_Villa.pdf' 
    : '/CV_Alejandro_Villa_EN.pdf'

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.dotGrid} />
      <div className={styles.scanLine} />
      <div className={styles.glow} />
      <FloatingIcons />

      <div className={styles.content}>
        <div className={styles.tagLine}>
          <span className={styles.tagDot} />
          <span className={styles.tagMono}>
            {language === 'es' ? '> Caracas, VE // disponible' : '> Caracas, VE // available'}
          </span>
        </div>

        <h1 className={styles.title}>
          {t('hero.greeting')}{' '}
          <span className={styles.glitchWrap}>
            <span className={styles.nameGlitch} data-text={config.name}>
              <span className={styles.nameGradient}>{config.name}</span>
            </span>
          </span>
        </h1>

        <p className={styles.role} aria-live="polite">
          {display}
          <span className={styles.cursor} style={{ opacity: showCursor ? 1 : 0 }}>|</span>
        </p>

        <p className={styles.sub}>
          {language === 'es'
            ? 'Convierto ideas en productos web reales: del backend al frontend, del diseño a la base de datos.'
            : 'I turn ideas into real web products: from backend to frontend, from design to database.'}
        </p>

        <div className={styles.actions}>
          <a href="#projects" className={styles.btnPrimary}>
            {t('hero.projectsBtn')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#contact" className={styles.btnSecondary}>
            {t('hero.contactBtn')}
          </a>
          {config.cvUrl && (
            <a href={activeCvUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              CV
            </a>
          )}
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <rect x="1.5" y="1.5" width="17" height="25" rx="8.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
          <circle cx="10" cy="8" r="2" fill="var(--accent)" className={styles.scrollDot}/>
        </svg>
      </div>
    </section>
  )
}

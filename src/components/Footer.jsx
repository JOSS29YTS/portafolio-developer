import { config } from '../data/portfolioConfig'
import { useLanguage } from '../context/LanguageContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { language } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>ale<span>.dev</span></span>
        <p className={styles.copy}>
          © {new Date().getFullYear()} · {language === 'es' ? 'Hecho con React + Vite' : 'Made with React + Vite'}
        </p>
        <div className={styles.links}>
          <a href={config.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={config.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${config.email}`}>Email</a>
        </div>
      </div>
    </footer>
  )
}

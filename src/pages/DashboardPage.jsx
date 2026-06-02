import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../context/LanguageContext'
import { config } from '../data/portfolioConfig'
import DashboardSandbox from '../components/DashboardSandbox'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const { language, t } = useLanguage()

  return (
    <div className={styles.page}>
      <Helmet>
        <title>{t('dashboard.title')} · Ale</title>
        <meta name="description" content={t('dashboard.desc')} />
        <meta property="og:title" content={`${t('dashboard.title')} · Ale`} />
        <meta property="og:description" content={t('dashboard.desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${config.domain}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className={styles.header}>
        <Link to="/" className={styles.back}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {language === 'es' ? 'Volver al inicio' : 'Back to home'}
        </Link>
        <div className={styles.headerInfo}>
          <span className={styles.eyebrow}>{t('dashboard.eyebrow')}</span>
          <h1 className={styles.title}>{t('dashboard.headerTitle')}</h1>
          <p className={styles.sub}>
            {t('dashboard.headerSub')}
          </p>
        </div>
      </div>

      <DashboardSandbox />
    </div>
  )
}

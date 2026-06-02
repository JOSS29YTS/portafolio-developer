import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../context/LanguageContext'
import styles from './NotFound.module.css'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <>
      <Helmet>
        <title>404 — {t('notFound.title')} · Ale</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className={styles.page}>
        <div className={styles.glow} />
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>{t('notFound.title')}</h1>
        <p className={styles.sub}>
          {t('notFound.sub2')}
        </p>
        <Link to="/" className={styles.btn}>
          {t('notFound.backBtn')}
        </Link>
      </div>
    </>
  )
}

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import styles from './DemoWarningModal.module.css'

const COUNTDOWN = 5

export default function DemoWarningModal({ demoUrl, projectColor = 'cyan', onClose }) {
  const { language, t } = useLanguage()
  const [visible, setVisible] = useState(true)
  const [secs, setSecs] = useState(COUNTDOWN)
  const fired = useRef(false)
  const demoUrlRef = useRef(demoUrl)
  const onCloseRef = useRef(onClose)

  useEffect(() => { demoUrlRef.current = demoUrl })
  useEffect(() => { onCloseRef.current = onClose })

  const goToDemo = () => {
    if (fired.current) return
    fired.current = true
    setVisible(false)
    setTimeout(() => {
      window.open(demoUrl, '_blank', 'noopener,noreferrer')
      onClose()
    }, 250)
  }

  const handleCancel = () => {
    if (fired.current) return
    fired.current = true
    setVisible(false)
    setTimeout(onClose, 250)
  }

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const remaining = COUNTDOWN - elapsed
      if (remaining <= 0) {
        clearInterval(interval)
        if (fired.current) return
        fired.current = true
        setSecs(0)
        setVisible(false)
        setTimeout(() => {
          window.open(demoUrlRef.current, '_blank', 'noopener,noreferrer')
          onCloseRef.current()
        }, 250)
        return
      }
      setSecs(remaining)
    }, 250)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleCancel}
        >
          <motion.div
            className={styles.card}
            style={{
              '--accent': `var(--project-${projectColor}-accent)`,
              '--accent-dim': `var(--project-${projectColor}-border)`,
              '--accent-bright': `var(--project-${projectColor}-text)`,
            }}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.iconWrap}>
              <div className={styles.icon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
            </div>

            <h3 className={styles.title}>{t('demoWarning.title')}</h3>

            <p className={styles.message}>{t('demoWarning.message')}</p>

            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressFill}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: COUNTDOWN, ease: 'linear' }}
              />
            </div>

            <p className={styles.countdown}>
              {language === 'es' ? `Redirigiendo en ${secs}s...` : `Redirecting in ${secs}s...`}
            </p>

            <div className={styles.btnRow}>
              <button className={styles.btnCancel} onClick={handleCancel}>
                {t('demoWarning.cancel')}
              </button>
              <button className={styles.btnPrimary} onClick={goToDemo}>
                {t('demoWarning.gotIt')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

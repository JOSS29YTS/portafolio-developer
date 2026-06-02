import { lazy, Suspense } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './Avatar3D.module.css'

// Carga lazy para que Three.js no bloquee el bundle inicial
const Lobo3D = lazy(() => import('./Lobo3D'))

export default function Avatar3D() {
  const { t } = useLanguage()

  return (
    <section id="3d" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.label}>{t('avatar3d.label')}</span>
          <h2 className={styles.title}>{t('avatar3d.title')}</h2>
          <p className={styles.subtitle}>
            {t('avatar3d.subtitle')}
          </p>
        </div>

        {/* ── Dos tarjetas lado a lado ── */}
        <div className={styles.dualRow}>

          {/* ── Izquierda: Holograma CSS ── */}
          <div className={styles.card}>
            <div className={styles.cardLabel}>
              <span className={styles.dot} style={{ '--dot-color': 'var(--accent)' }} />
              {t('avatar3d.cssCardLabel')}
            </div>

            <div className={styles.scene}>
              <div className={styles.ring} />
              <div className={styles.ring2} />

              {[...Array(8)].map((_, i) => (
                <div key={i} className={styles.particle} style={{ '--i': i }} />
              ))}

              <div className={styles.holoCard}>
                <div className={styles.scanlines} />
                <div className={styles.flicker} />
                <img src="/avatar.webp" alt="Avatar holográfico" className={styles.holoImg} />
                <div className={styles.holoOverlay} />
                <div className={styles.holoBeam} />
              </div>

              <div className={styles.base}>
                <div className={styles.baseGlow} />
                <div className={styles.baseRing} />
              </div>
            </div>

            <p className={styles.hint}>
              <span className={styles.blip} />
              {t('avatar3d.cssHint')}
            </p>
          </div>

          {/* ── Derecha: Lobo WebGL interactivo ── */}
          <div className={styles.card}>
            <div className={styles.cardLabel}>
              <span className={styles.dot} style={{ '--dot-color': 'var(--accent-2)' }} />
              {t('avatar3d.webglCardLabel')}
            </div>

            <div className={styles.wolfWrapper}>
              <Suspense fallback={
                <div className={styles.loadingBox}>
                  <span className={styles.loadingDot} />
                  <span className={styles.loadingDot} />
                  <span className={styles.loadingDot} />
                </div>
              }>
                <Lobo3D />
              </Suspense>
            </div>

            <p className={styles.hint}>
              <span className={styles.blip} style={{ '--blip-color': 'var(--accent-2)' }} />
              {t('avatar3d.webglHint')}
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

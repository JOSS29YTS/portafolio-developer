import { stats } from '../data/portfolioConfig'
import { useLanguage } from '../context/LanguageContext'
import useInView from '../hooks/useInView'
import useCountUp from '../hooks/useCountUp'
import styles from './Stats.module.css'

function StatItem({ stat, index }) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  const count = useCountUp(stat.value, { duration: 2000, inView })
  const { t } = useLanguage()

  return (
    <div
      ref={ref}
      className={styles.item}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={styles.value}>{count}{stat.suffix}</div>
      <div className={styles.label}>{t(`stats.${stat.labelKey}`)}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {stats.map((s, i) => (
          <StatItem key={i} stat={s} index={i} />
        ))}
      </div>
    </section>
  )
}

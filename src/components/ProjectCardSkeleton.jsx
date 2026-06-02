import { motion } from 'framer-motion'
import styles from './ProjectCardSkeleton.module.css'

const pulse = {
  animate: {
    opacity: [0.3, 0.7, 0.3],
    transition: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
  },
}

export default function ProjectCardSkeleton() {
  return (
    <div className={styles.card}>
      <motion.div className={styles.preview} variants={pulse} animate="animate">
        <div className={styles.mockBar}>
          <span className={styles.d1} />
          <span className={styles.d2} />
          <span className={styles.d3} />
        </div>
        <div className={styles.mockScreen}>
          <div className={styles.line} style={{ width: '70%' }} />
          <div className={styles.line} style={{ width: '50%' }} />
          <div className={styles.line} style={{ width: '85%' }} />
          <div className={styles.line} style={{ width: '40%' }} />
        </div>
      </motion.div>

      <div className={styles.body}>
        <div className={styles.tagRow}>
          <motion.span className={styles.tagPulse} variants={pulse} animate="animate" style={{ width: 60 }} />
          <motion.span className={styles.tagPulse} variants={pulse} animate="animate" style={{ width: 80 }} />
          <motion.span className={styles.tagPulse} variants={pulse} animate="animate" style={{ width: 50 }} />
        </div>
        <motion.div className={styles.titlePulse} variants={pulse} animate="animate" />
        <motion.div className={styles.descPulse} variants={pulse} animate="animate" />
        <motion.div className={styles.descPulse} variants={pulse} animate="animate" style={{ width: '60%' }} />
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import styles from './CyberpunkLoader.module.css'

const TERMINAL_LINES = [
  'INITIALIZING SYSTEM DECRYPTION...',
  'CONNECTING TO SECURE SOCKET...',
  'DOWNLOADING PACKETS FROM CORE SERVER...',
  'PARSING INTERFACE STYLES...',
  'INJECTING NEON CHIPS...',
  'DECRYPTION SUCCESSFUL. REDIRECTING...',
]

export default function CyberpunkLoader() {
  const [lineIdx, setLineIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress bar incremental speed
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        const step = Math.floor(Math.random() * 15) + 5
        return Math.min(100, p + step)
      })
    }, 150)

    // Terminal typing animation simulation
    const textInterval = setInterval(() => {
      setLineIdx((prev) => (prev < TERMINAL_LINES.length - 1 ? prev + 1 : prev))
    }, 280)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.scanLine} />
      <div className={styles.gridOverlay} />

      <div className={styles.terminalBox}>
        {/* Terminal Header */}
        <div className={styles.terminalHeader}>
          <div className={styles.dots}>
            <span className={styles.dot} style={{ background: '#FF2079' }} />
            <span className={styles.dot} style={{ background: '#FFEA00' }} />
            <span className={styles.dot} style={{ background: '#00FF88' }} />
          </div>
          <span className={styles.terminalTitle}>ANTIGRAVITY CORE v2.8</span>
          <span className={styles.liveTag}>● SYSTEM DECRYPT</span>
        </div>

        {/* Terminal Content */}
        <div className={styles.terminalBody}>
          <div className={styles.commandLine}>
            <span className={styles.prompt}>ale@USM:~$</span>
            <span className={styles.command}>load_environment --force</span>
          </div>

          <div className={styles.logBox}>
            {TERMINAL_LINES.slice(0, lineIdx + 1).map((line, idx) => (
              <p key={idx} className={styles.logLine}>
                <span className={styles.logTime}>[{(idx * 0.12).toFixed(2)}s]</span> {line}
              </p>
            ))}
          </div>

          {/* Progress Section */}
          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>DECRYPTING FILES</span>
              <span className={styles.progressVal}>{progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

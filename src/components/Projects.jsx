import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import useReducedMotion from '../hooks/useReducedMotion'
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectCardSkeleton'
import styles from './Projects.module.css'

const ALL_TAGS = [
  'React',
  'Node.js',
  'MySQL',
  'Python/Django',
  'Python/Flask',
  'PostgreSQL',
  'SQLite3',
  'CSS',
  'Tailwind CSS',
  'Gemini AI',
  'WebSockets',
  'Ciberseguridad'
]

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : direction < 0 ? -80 : 0,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 450, damping: 35 },
      opacity: { duration: 0.15 },
      scale: { duration: 0.15 }
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : direction < 0 ? 80 : 0,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 450, damping: 35 },
      opacity: { duration: 0.1 },
      scale: { duration: 0.1 }
    }
  })
}

export default function Projects() {
  const { t } = useLanguage()
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(0)
  const [ready, setReady] = useState(false)
  const [activeTag, setActiveTag] = useState('all')
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const touchStartX = useRef(null)

  const handleHoverChange = useCallback((i, isHovered) => {
    setHoveredIndex(isHovered ? i : -1)
  }, [])

  const filtered = useMemo(
    () => activeTag === 'all' ? projects : projects.filter(p => p.tags.includes(activeTag)),
    [activeTag]
  )

  const TOTAL = filtered.length

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (activeIndex >= TOTAL) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveIndex(0)
    }
  }, [activeIndex, TOTAL])

  const isFlat = TOTAL > 0 && TOTAL <= 3

  const rotate = useCallback(
    (delta) => {
      if (isAnimating || TOTAL === 0 || isFlat) return
      setIsAnimating(true)
      setDirection(delta)
      setActiveIndex((prev) => (prev + delta + TOTAL) % TOTAL)
      setTimeout(() => setIsAnimating(false), 300)
    },
    [isAnimating, TOTAL, isFlat]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') rotate(1)
      if (e.key === 'ArrowLeft') rotate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [rotate])

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) rotate(dx > 0 ? 1 : -1)
    touchStartX.current = null
  }

  const handleTagClick = (tag) => {
    if (isAnimating || tag === activeTag) return
    setDirection(0)
    setActiveTag(tag)
    setActiveIndex(0)
  }

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>{t('projects.label')}</span>
          <h2 className={styles.title}>{t('projects.title')}</h2>
          <p className={styles.sub}>
            {t('projects.sub')}
          </p>
        </div>

        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${activeTag === 'all' ? styles.filterActive : ''}`}
            onClick={() => handleTagClick('all')}
            style={{ position: 'relative' }}
          >
            {activeTag === 'all' && !reducedMotion && (
              <motion.span
                layoutId="activeFilter"
                className={styles.filterBg}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 2 }}>{t('projects.filterAll')}</span>
          </button>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`${styles.filterBtn} ${activeTag === tag ? styles.filterActive : ''}`}
              onClick={() => handleTagClick(tag)}
              style={{ position: 'relative' }}
            >
              {activeTag === tag && !reducedMotion && (
                <motion.span
                  layoutId="activeFilter"
                  className={styles.filterBg}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 2 }}>{tag}</span>
            </button>
          ))}
        </div>

        <div
          className={styles.scene}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {!ready ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.skeletonWrap}
            >
              <ProjectCardSkeleton />
            </motion.div>
          ) : TOTAL === 0 ? (
            <p className={styles.emptyMsg}>{t('projects.emptyMsg')}</p>
          ) : (
            reducedMotion ? (
              <div>
                {isFlat ? (
                  <div className={styles.flatRow}>
                    {filtered.map((project, i) => (
                      <div key={project.id} className={styles.flatCard}>
                        <ProjectCard project={project} index={i} isActive={true} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div
                      className={styles.ambientGlow}
                      style={{
                        background: `radial-gradient(ellipse 60% 40% at 50% 60%, var(--project-${filtered[activeIndex].color}-glow) 0%, transparent 70%)`,
                      }}
                    />
                    <div className={styles.scene}>
                      <div className={styles.sliderCardWrap}>
                        <div className={styles.floatWrap}>
                          <ProjectCard
                            project={filtered[activeIndex]}
                            index={activeIndex}
                            isActive={true}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTag}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                >
                  {isFlat ? (
                    <div className={styles.flatRow}>
                      {filtered.map((project, i) => (
                        <div key={project.id} className={styles.flatCard}>
                          <ProjectCard project={project} index={i} isActive={true} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div
                        className={styles.ambientGlow}
                        style={{
                          background: `radial-gradient(ellipse 60% 40% at 50% 60%, var(--project-${filtered[activeIndex].color}-glow) 0%, transparent 70%)`,
                        }}
                      />

                      <div className={styles.scene}>
                        <AnimatePresence mode="wait" custom={direction}>
                          <motion.div
                            key={activeIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className={styles.sliderCardWrap}
                          >
                            <div className={`${styles.floatWrap} ${hoveredIndex === activeIndex ? styles.floatWrapPaused : ''}`}>
                              <ProjectCard
                                project={filtered[activeIndex]}
                                index={activeIndex}
                                isActive={true}
                                onHoverChange={handleHoverChange}
                              />
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            )
          )}

          {ready && TOTAL > 0 && !isFlat && (
            <>
              <button
                className={`${styles.navSide} ${styles.navSideLeft}`}
                onClick={() => rotate(-1)}
                aria-label="Proyecto anterior"
                disabled={isAnimating}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className={`${styles.navSide} ${styles.navSideRight}`}
                onClick={() => rotate(1)}
                aria-label="Siguiente proyecto"
                disabled={isAnimating}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {!isFlat && TOTAL > 0 && (
          <div className={styles.controls}>
            <button
              className={`${styles.mobileNavBtn} ${styles.mobileNavBtnLeft}`}
              onClick={() => rotate(-1)}
              aria-label="Proyecto anterior"
              disabled={isAnimating}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className={styles.dots} role="tablist">
              {filtered.map((p, i) => (
                <button
                  key={p.id}
                  className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                  onClick={() => {
                    if (!isAnimating && i !== activeIndex) {
                      setIsAnimating(true)
                      setDirection(i > activeIndex ? 1 : -1)
                      setActiveIndex(i)
                      setTimeout(() => setIsAnimating(false), 300)
                    }
                  }}
                  aria-label={`Ir a ${p.title}`}
                  aria-current={i === activeIndex}
                  role="tab"
                />
              ))}
            </div>

            <button
              className={`${styles.mobileNavBtn} ${styles.mobileNavBtnRight}`}
              onClick={() => rotate(1)}
              aria-label="Siguiente proyecto"
              disabled={isAnimating}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

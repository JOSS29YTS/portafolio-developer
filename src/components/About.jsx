import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { config } from '../data/portfolioConfig'
import { techIcons } from '../data/techIcons'
import { useLanguage } from '../context/LanguageContext'
import useReducedMotion from '../hooks/useReducedMotion'
import styles from './About.module.css'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const catVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const skills = [
  {
    key: 'frontend', color: 'var(--project-cyan-accent)',
    tools: [
      { name: 'React', logo: techIcons.react },
      { name: 'Vite', logo: techIcons.vite },
      { name: 'HTML5', logo: techIcons.html5 },
      { name: 'CSS3', logo: techIcons.css3 },
      { name: 'JavaScript', logo: techIcons.javascript },
      { name: 'Tailwind CSS', logo: techIcons.tailwindcss },
    ]
  },
  {
    key: 'backend', color: 'var(--project-green-accent)',
    tools: [
      { name: 'Node.js', logo: techIcons.nodejs },
      { name: 'Python', logo: techIcons.python },
      { name: 'Express', logo: techIcons.express },
      { name: 'Flask', logo: techIcons.flask },
      { name: 'Django', logo: techIcons.django },
      { name: 'MySQL', logo: techIcons.mysql },
      { name: 'PostgreSQL', logo: techIcons.postgresql },
    ]
  },
  {
    key: 'ai', color: 'var(--project-yellow-accent)',
    tools: [
      { name: 'OpenCV', logo: techIcons.opencv },
      { name: 'Pandas', logo: techIcons.pandas },
    ]
  },
  {
    key: 'others', color: 'var(--accent-2)',
    tools: [
      { name: 'Git', logo: techIcons.git },
      { name: 'GitHub', logo: techIcons.github },
      { name: 'SQLite', logo: techIcons.sqlite },
      { name: 'JWT', logo: techIcons.jwt },
    ]
  },
]

export default function About() {
  const { language, t } = useLanguage()
  const reducedMotion = useReducedMotion()

  // Dynamically set the CV URL based on active language
  const activeCvUrl = language === 'es'
    ? '/CV_Alejandro_Villa.pdf'
    : '/CV_Alejandro_Villa_EN.pdf'

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.intro}>

          {/* ── Avatar 3D ── */}
          <div className={styles.avatarCol}>
            <Tilt
              tiltMaxAngleX={14}
              tiltMaxAngleY={14}
              perspective={900}
              transitionSpeed={1600}
              scale={1.04}
              gyroscope={true}
              className={styles.tiltCard}
            >
              <div className={styles.avatarGlow} />
              <img
                src="/avatar.webp"
                alt="Avatar de Ale"
                className={styles.avatarImg}
              />
              <div className={styles.avatarShine} />
            </Tilt>
          </div>

          {/* ── Texto + contacto ── */}
          <div className={styles.textBlock}>
            <span className={styles.label}>{t('about.label')}</span>
            <h2 className={styles.title}>{t('about.title')}</h2>
            {t('about.text1') && (
              <p className={styles.text}>
                {t('about.text1')}
              </p>
            )}
            {t('about.text2') && (
              <p className={styles.text}>
                {t('about.text2')}
              </p>
            )}

            <div className={styles.actionsRow}>
              {config.cvUrl && (
                <a href={activeCvUrl} download className={styles.cvBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {t('about.cvBtn')}
                </a>
              )}

              <a href={`mailto:${config.email}`} className={styles.contactLink}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                {config.email}
              </a>
              <a href={config.github} target="_blank" rel="noreferrer" className={styles.contactLink}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                GitHub
              </a>
              <a href={config.linkedin} target="_blank" rel="noreferrer" className={styles.contactLink}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        <motion.div
          className={styles.skillsWrap}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skills.map((cat, ci) => (
            <motion.div
              key={cat.key}
              className={styles.catBlock}
              variants={catVariants}
              style={{ '--card-glow': cat.color }}
              {...(!reducedMotion && { whileHover: { scale: 1.008, y: -3 }, transition: { type: 'spring', stiffness: 260, damping: 18 } })}
            >
              <span className={styles.catLabel} style={{ color: cat.color }}>{t(`about.skills.${cat.key}`)}</span>
              <div className={styles.tools}>
                {cat.tools.map((t, ti) => (
                  <motion.div
                    key={t.name}
                    className={styles.tool}
                    style={{ animationDelay: `${(ci * 4 + ti) * 55}ms` }}
                    {...(!reducedMotion && { whileHover: { scale: 1.12 }, transition: { type: 'spring', stiffness: 350, damping: 12 } })}
                  >
                    <img src={t.logo} alt={t.name} data-name={t.name} className={styles.toolIcon} />
                    <span className={styles.toolName}>{t.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

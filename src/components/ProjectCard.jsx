import { useState } from 'react'
import { Link } from 'react-router-dom'
import { colorMap } from '../data/colorMap'
import { useLanguage } from '../context/LanguageContext'
import Sparkline from './ProjectMocks/Sparkline'
import DemoWarningModal from './DemoWarningModal'
import styles from './ProjectCard.module.css'


const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)


export default function ProjectCard({ project, index, isActive = true, onHoverChange }) {
  const c = colorMap[project.color] || colorMap.cyan
  const { language, t } = useLanguage()
  const [showWarning, setShowWarning] = useState(null)

  return (
    <>
      {showWarning && (
        <DemoWarningModal
          demoUrl={showWarning}
          projectColor={project.color}
          onClose={() => setShowWarning(null)}
        />
      )}
    <article
      className={`${styles.card} ${isActive ? '' : styles.cardInactive}`}
      onMouseEnter={() => onHoverChange?.(index, true)}
      onMouseLeave={() => onHoverChange?.(index, false)}
      style={{
        animationDelay: `${index * 0.1}s`,
        // Block all pointer events on the back-facing card
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <Link 
        to={`/proyecto/${project.slug}`} 
        className={styles.preview} 
        style={{ 
          background: c.bg, 
          borderColor: c.border, 
          display: (project.slug === 'vesta-retail-erp' || project.slug === 'repositorio-academico' || project.slug === 'phishshield' || project.slug === 'dashboard-estadisticas') ? 'block' : undefined, 
          padding: (project.slug === 'vesta-retail-erp' || project.slug === 'repositorio-academico' || project.slug === 'phishshield' || project.slug === 'dashboard-estadisticas') ? 0 : undefined 
        }}
      >
        {project.slug === 'vesta-retail-erp' ? (
          <img
            src="/covers/portada_tienda.webp"
            alt="Vesta Retail ERP"
            className={styles.previewScreenshot}
            style={{ objectPosition: 'center 50%' }}
          />
        ) : project.slug === 'repositorio-academico' ? (
          <img
            src="/covers/portada_repositorio.webp"
            alt="Repositorio Académico"
            className={styles.previewScreenshot}
            style={{ objectPosition: 'center 50%' }}
          />
        ) : project.slug === 'phishshield' ? (
          <img
            src="/covers/portada_phishing.webp"
            alt="PhishShield AI"
            className={styles.previewScreenshot}
            style={{ objectPosition: 'left 40%' }}
          />
        ) : project.slug === 'dashboard-estadisticas' ? (
          <img
            src="/covers/portada_dashboard.webp"
            alt="Dashboard Estadísticas"
            className={styles.previewScreenshot}
            style={{ objectPosition: 'left 18%' }}
          />
        ) : (
          <div className={styles.mockBrowser}>
            <div className={styles.mockBar}>
              <span className={styles.d1}></span>
              <span className={styles.d2}></span>
              <span className={styles.d3}></span>
            </div>
            <div className={styles.mockContent}>
              {project.slug === 'dashboard-estadisticas' && (
                <Sparkline accent={c.accent} isActive={isActive} />
              )}
            </div>
          </div>
        )}
        {project.status === 'in-progress' && (
          <span className={styles.statusBadge}>
            {language === 'es' ? 'En progreso' : 'In Progress'}
          </span>
        )}
        {project.status === 'live' && project.demoUrl && (
          <span className={styles.liveBadge} style={{ color: c.text, background: c.bg, borderColor: c.border }}>
            <span className={styles.liveDot} style={{ background: c.accent }}></span>
            Live
          </span>
        )}
      </Link>

      <div className={styles.body}>
        <div className={styles.tags}>
          {project.tags.map(t => (
            <span
              key={t}
              className={styles.tag}
              style={{
                color: c.text,
                background: c.bg,
                borderColor: c.border
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <Link to={`/proyecto/${project.slug}`} style={{ textDecoration: 'none' }}>
          <h3 className={styles.title}>{project.title}</h3>
        </Link>
        <p className={styles.desc}>{project.description[language]}</p>
        <div className={styles.actions}>
          {project.slug === 'dashboard-estadisticas' ? (
            <Link to="/dashboard" className={styles.btnDemo}
              style={{ color: c.text, borderColor: c.border, background: c.bg }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              {t('projectDetail.viewDemo')}
            </Link>
          ) : project.demoUrl && project.demoUrl.startsWith('/') ? (
            <Link to={project.demoUrl} className={styles.btnDemo}
              style={{ color: c.text, borderColor: c.border, background: c.bg }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              {t('projectDetail.viewDemo')}
            </Link>
          ) : project.demoUrl ? (
            <button
              className={styles.btnDemo}
              style={{ color: c.text, borderColor: c.border, background: c.bg, cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation()
                setShowWarning(project.demoUrl)
              }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              {t('projectDetail.viewDemo')}
            </button>
          ) : null}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.btnGithub}>
              <GitHubIcon /> {language === 'es' ? 'Código' : 'Code'}
            </a>
          )}
        </div>
      </div>
    </article>
    </>
  )
}

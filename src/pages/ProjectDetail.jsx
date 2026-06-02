import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { getProjectBySlug } from '../data/projects'
import { colorMap } from '../data/colorMap'
import { config } from '../data/portfolioConfig'
import { useLanguage } from '../context/LanguageContext'
import useReducedMotion from '../hooks/useReducedMotion'
import Reveal from '../components/Reveal'
import styles from './ProjectDetail.module.css'


function ScreenshotImage({ src, alt, className }) {
  const [hasError, setHasError] = useState(false)
  const { t } = useLanguage()

  if (hasError) {
    return (
      <div className={styles.screenshotFallback}>
        <div className={styles.fallbackIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <p className={styles.fallbackText}>{t('projectDetail.fallbackText')}</p>
        <span className={styles.fallbackSubtext}>{t('projectDetail.fallbackSubtext')}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}

function CopyButton({ value, copyKey, copiedKey, onCopy, className }) {
  const copied = copiedKey === copyKey
  return (
    <button
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          onCopy(copyKey)
        } catch {
          // clipboard not available (HTTP / Safari without permission)
        }
      }}
      title={copied ? '¡Copiado!' : 'Copiar'}
    >
      {copied ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const [copiedKey, setCopiedKey] = useState(null)
  const { language, t } = useLanguage()
  const reducedMotion = useReducedMotion()

  const handleCopy = (key) => {
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }
  const project = getProjectBySlug(slug)
  const c = project ? colorMap[project.color] || colorMap.cyan : null

  if (!project) {
    return (
      <div className={styles.notFound}>
        <Helmet><title>{t('projectDetail.notFound')} · Ale</title></Helmet>
        <h2>{t('projectDetail.notFound')}</h2>
        <Link to="/">← {t('notFound.backBtn')}</Link>
      </div>
    )
  }

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    'name': project.title,
    'description': project.description[language],
    'codeRepository': project.githubUrl || undefined,
    'programmingLanguage': project.techDetails || undefined,
    'author': {
      '@type': 'Person',
      'name': `${config.name} Villa`
    }
  }

  return (
    <>
      <Helmet>
        <title>{project.title} · Ale</title>
        <meta name="description" content={project.description[language]} />
        <meta property="og:title" content={`${project.title} · Ale`} />
        <meta property="og:description" content={project.description[language]} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={project.screenshots?.[0] ? `${config.domain}${project.screenshots[0]}` : `${config.domain}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} · Ale`} />
        <meta name="twitter:description" content={project.description[language]} />
        <meta name="twitter:image" content={project.screenshots?.[0] ? `${config.domain}${project.screenshots[0]}` : `${config.domain}/og-image.jpg`} />
        <script type="application/ld+json">
          {JSON.stringify(projectSchema)}
        </script>
      </Helmet>

      <article className={`${styles.article} page-enter`}>
        <Reveal>
          <Link to="/" state={{ scrollTo: 'projects' }} className={styles.back}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t('projectDetail.backBtn')}
          </Link>
        </Reveal>

        <Reveal>
          <div className={styles.tags}>
            {project.tags.map(t => (
              <span
                key={t}
                className={styles.tag}
                style={{ background: c.bg, color: c.text, borderColor: c.border }}
              >
                {t}
              </span>
            ))}
            {project.status === 'in-progress' && (
              <span className={styles.tagProgress}>
                {language === 'es' ? 'En progreso' : 'In Progress'}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal>
          <h1 className={styles.title}>{project.title}</h1>
        </Reveal>

        <Reveal>
          <div className={styles.actions}>
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.btnDemo}
                style={{ background: c.accent }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {t('projectDetail.liveDemo')}
              </a>
            ) : (
              project.demoCredentials && (
                <button
                  className={styles.btnDemo}
                  style={{ background: c.accent, border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  onClick={() => {
                    document.getElementById('demo-credentials')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  {t('projectDetail.viewDemo')}
                </button>
              )
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.btnGithub}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                {t('projectDetail.sourceCode')}
              </a>
            )}
          </div>
        </Reveal>

        <Reveal>
          <p className={styles.longDesc}>{project.longDescription[language]}</p>
        </Reveal>



        {project.demoVideoUrl && (
          <Reveal>
            <h3 className={styles.sectionTitle}>{language === 'es' ? 'Demo en video' : 'Video Demo'}</h3>
            <div className={styles.videoWrap}>
              <video
                src={project.demoVideoUrl}
                poster={project.screenshots?.[0]}
                autoPlay
                loop
                muted
                playsInline
                className={styles.videoPlayer}
              />
            </div>
          </Reveal>
        )}

        {project.screenshots && project.screenshots.length > 0 && (
          <Reveal>
            <h3 className={styles.sectionTitle}>{t('projectDetail.screenshots')}</h3>
            <div className={styles.screenshots}>
              {project.screenshots.map((src, i) => (
                <ScreenshotImage
                  key={i}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className={styles.screenshot}
                />
              ))}
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>{t('projectDetail.techUsed')}</h3>
            <div className={styles.techList}>
              {project.techDetails.map(tech => (
                <span
                  key={tech}
                  className={styles.techChip}
                  style={{ background: c.bg, color: c.text, borderColor: c.border }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>{t('projectDetail.whatILearned')}</h3>
            <p className={styles.learnings}>{project.learnings[language]}</p>
          </div>
        </Reveal>

        {project.demoCredentials && (
          <Reveal>
            <div id="demo-credentials" className={styles.terminalCard} style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
              {/* Terminal title bar */}
              <div className={styles.terminalBar}>
                <div className={styles.terminalDots}>
                  <span className={styles.terminalDot} style={{ background: '#FF2079' }} />
                  <span className={styles.terminalDot} style={{ background: '#FFEA00' }} />
                  <span className={styles.terminalDot} style={{ background: '#00FF88' }} />
                </div>
                <div className={styles.terminalTabs}>
                  <span className={styles.terminalTabActive}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    credentials.sh
                  </span>
                  <span className={styles.terminalTab}>
                    config.json
                  </span>
                </div>
                <div className={styles.terminalLive}>
                  <span className={styles.terminalLiveDot} />
                  LIVE
                </div>
              </div>

              {/* Terminal body */}
              <div className={styles.terminalBody}>
                <div className={styles.terminalPromptLine}>
                  <span className={styles.terminalPrompt}>$</span>
                  <span className={styles.terminalCommand}>cat ./credenciales --verbose</span>
                </div>

                <div className={styles.terminalDivider}>
                  <span>{'>>'}</span> {project.demoCredentials.title[language]}
                </div>

                <p className={styles.terminalNote}>{project.demoCredentials.subtitle[language]}</p>

                <div className={styles.terminalOutput}>
                  {project.demoCredentials.profiles.map((profile, idx) => {
                    const ProfileTag = reducedMotion ? 'div' : motion.div
                    const profileProps = reducedMotion ? {} : { initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: idx * 0.15, duration: 0.35 } }
                    return (
                    <ProfileTag
                      key={idx}
                      className={styles.terminalProfile}
                      {...profileProps}
                    >
                      <div className={styles.terminalProfileHeader}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span style={{ color: c.text }}>{profile.role[language]}</span>
                      </div>

                      <div className={styles.terminalField}>
                        <span className={styles.terminalFieldLabel}>
                          {profile.emailLabel ? (typeof profile.emailLabel === 'object' ? profile.emailLabel[language] : profile.emailLabel) : 'email:'}
                        </span>
                        <code
                          className={styles.terminalCode}
                          style={{ color: c.accent, background: c.bg, borderColor: c.border }}
                        >
                          {profile.email}
                        </code>
                        <CopyButton
                          value={profile.email}
                          copyKey={`${idx}-email`}
                          copiedKey={copiedKey}
                          onCopy={handleCopy}
                          className={styles.terminalCopyBtn}
                        />
                      </div>

                      {profile.password && (
                        <div className={styles.terminalField}>
                          <span className={styles.terminalFieldLabel}>
                            {profile.passwordLabel ? (typeof profile.passwordLabel === 'object' ? profile.passwordLabel[language] : profile.passwordLabel) : 'password:'}
                          </span>
                          <code
                            className={styles.terminalCode}
                            style={{ color: 'var(--green)', background: c.bg, borderColor: c.border }}
                          >
                            {profile.password}
                          </code>
                          <CopyButton
                            value={profile.password}
                            copyKey={`${idx}-password`}
                            copiedKey={copiedKey}
                            onCopy={handleCopy}
                            className={styles.terminalCopyBtn}
                          />
                        </div>
                      )}

                      <div className={styles.terminalPerms}>
                        <span className={styles.terminalPermsLabel}>{t('projectDetail.permissionsLabel')}</span>
                        <p className={styles.terminalPermsDesc}>{profile.permissions[language]}</p>
                      </div>
                    </ProfileTag>
                    )
                  })}
                </div>

                {/* Cold start warning */}
                <div className={styles.renderNotice}>
                  <div className={styles.renderNoticeIcon}>⚠️</div>
                  <div className={styles.renderNoticeContent}>
                    <strong>
                      {language === 'es' 
                        ? 'Servidor en suspensión (Render/Plan Gratuito):' 
                        : 'Server Sleep Warning (Render/Free Tier):'}
                    </strong>{' '}
                    {language === 'es'
                      ? 'Dado que el demo en vivo está alojado en un plan gratuito, el servidor se "duerme" por inactividad. Al iniciar la demostración, por favor espera unos 50 segundos a que el servidor se encienda. ¡Gracias por tu paciencia!'
                      : 'Since the live demo is hosted on a free plan, the server spins down during periods of inactivity. When starting the demo, please allow about 50 seconds for the server to wake up. Thank you for your patience!'}
                  </div>
                </div>

                <div className={styles.terminalFooter}>
                  <span className={styles.terminalFooterLed} style={{ background: c.accent }} />
                  <span className={styles.terminalFooterText}>
                    {language === 'es' ? 'CONNECTION_ACTIVE — credenciales listas para usar' : 'CONNECTION_ACTIVE — credentials ready to use'}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </article>
    </>
  )
}

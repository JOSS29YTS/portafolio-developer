import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { config } from '../data/portfolioConfig'
import { parseFrontmatter } from '../utils/parseFrontmatter'
import { useLanguage } from '../context/LanguageContext'
import Reveal from '../components/Reveal'
import styles from './Blog.module.css'

const rawPosts = import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw', import: 'default' })

const blogPosts = Object.entries(rawPosts).map(([path, raw]) => {
  const { frontmatter } = parseFrontmatter(raw)
  const slug = path.split('/').pop().replace('.md', '')
  return { ...frontmatter, slug, date: frontmatter.date || '' }
}).sort((a, b) => new Date(b.date) - new Date(a.date))

export default function Blog() {
  const { language, t } = useLanguage()

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const isEnglish = post.slug.endsWith('_en')
      return language === 'en' ? isEnglish : !isEnglish
    })
  }, [language])

  return (
    <>
      <Helmet>
        <title>Blog — {config.name}</title>
        <meta name="description" content={t('blog.sub')} />
        <meta property="og:title" content={`Blog — ${config.name}`} />
        <meta property="og:description" content={t('blog.sub')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${config.domain}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Blog — ${config.name}`} />
        <meta name="twitter:description" content={t('blog.sub')} />
        <meta name="twitter:image" content={`${config.domain}/og-image.jpg`} />
      </Helmet>

      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <span className={styles.label}>{t('nav.blog')}</span>
            <h1 className={styles.title}>{t('blog.title')}</h1>
            <p className={styles.sub}>
              {t('blog.sub2')}
            </p>
          </Reveal>

          <div className={styles.grid}>
            {filteredPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link to={`/blog/${post.slug}`} className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardDate}>{post.date}</span>
                      <div className={styles.cardTags}>
                        {(Array.isArray(post.tags) ? post.tags : []).slice(0, 3).map(t => (
                          <span key={t} className={styles.cardTag}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  </div>
                  <div className={styles.cardArrow}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className={styles.empty}>{t('blog.emptyMsg')}</p>
          )}
        </div>
      </section>
    </>
  )
}

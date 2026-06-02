import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { config } from '../data/portfolioConfig'
import { parseFrontmatter } from '../utils/parseFrontmatter'
import { useLanguage } from '../context/LanguageContext'
import useReducedMotion from '../hooks/useReducedMotion'
import styles from './BlogPost.module.css'

const rawPosts = import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw', import: 'default' })

const blogPosts = Object.entries(rawPosts).map(([path, raw]) => {
  const { frontmatter, content } = parseFrontmatter(raw)
  const slug = path.split('/').pop().replace('.md', '')
  return { ...frontmatter, slug, content }
})

export default function BlogPost() {
  const { slug } = useParams()
  const { language, t } = useLanguage()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!slug) return

    if (language === 'en' && !slug.endsWith('_en')) {
      const targetSlug = `${slug}_en`
      if (blogPosts.some(p => p.slug === targetSlug)) {
        navigate(`/blog/${targetSlug}`, { replace: true })
      }
    } else if (language === 'es' && slug.endsWith('_en')) {
      const targetSlug = slug.replace(/_en$/, '')
      if (blogPosts.some(p => p.slug === targetSlug)) {
        navigate(`/blog/${targetSlug}`, { replace: true })
      }
    }
  }, [language, slug, navigate])

  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1>{t('blog.notFoundTitle')}</h1>
            <p>{t('blog.notFoundDesc')}</p>
            <Link to="/blog" className={styles.backLink}>{t('blog.backBtn')}</Link>
          </div>
        </div>
      </section>
    )
  }

  const SectionTag = reducedMotion ? 'section' : motion.section
  const sectionProps = reducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }

  return (
    <>
      <Helmet>
        <title>{post.title} — {config.name}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} — ${config.name}`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${config.domain}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — ${config.name}`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`${config.domain}/og-image.jpg`} />
      </Helmet>

      <SectionTag className={styles.section} {...sectionProps}>
        <div className={styles.container}>
          <Link to="/blog" className={styles.backLink}>{t('blog.backBtn')}</Link>

          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.date}>{post.date}</span>
              <div className={styles.tags}>
                {(Array.isArray(post.tags) ? post.tags : []).map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
          </header>

          <div className={styles.content}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </SectionTag>
    </>
  )
}

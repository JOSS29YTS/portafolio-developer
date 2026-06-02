import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { config } from '../data/portfolioConfig'
import { useLanguage } from '../context/LanguageContext'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Projects from '../components/Projects'
import Timeline from '../components/Timeline'
import Courses from '../components/Courses'
import About from '../components/About'
import Avatar3D from '../components/Avatar3D'
import Contact from '../components/Contact'
import Reveal from '../components/Reveal'
import ErrorBoundary from '../components/ErrorBoundary'

export default function Home() {
  const location = useLocation()
  const { language } = useLanguage()

  useEffect(() => {
    if (location.state?.scrollTo === 'projects') {
      const el = document.getElementById('projects')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.state])

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': `${config.name} Villa`,
    'email': config.email,
    'url': config.domain,
    'jobTitle': 'Systems Engineering Student & Full-Stack Developer',
    'alumniOf': {
      '@type': 'EducationalOrganization',
      'name': 'Universidad Santa María (USM)',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Caracas',
        'addressCountry': 'VE'
      }
    },
    'sameAs': [
      config.github,
      config.linkedin
    ].filter(Boolean),
    'knowsAbout': [
      'React', 'Vite', 'Node.js', 'Express', 'Python', 'Flask', 'Django',
      'MySQL', 'PostgreSQL', 'SQLite', 'OpenCV', 'Deep Learning', 'Computer Vision'
    ]
  }

  return (
    <>
      <Helmet>
        <title>{language === 'es' ? `${config.name} Villa · Portafolio Cyberpunk` : `${config.name} Villa · Cyberpunk Portfolio`}</title>
        <meta name="description" content={language === 'es' ? "Portafolio profesional de Alejandro Villa, estudiante de Ingeniería de Sistemas en la USM. Especializado en desarrollo React Full-Stack, IA y visión computacional." : "Professional portfolio of Alejandro Villa, Systems Engineering student at USM. Specialized in React Full-Stack development, AI, and computer vision."} />
        <meta property="og:title" content={language === 'es' ? `${config.name} Villa · Portafolio Cyberpunk` : `${config.name} Villa · Cyberpunk Portfolio`} />
        <meta property="og:description" content={language === 'es' ? "Portafolio profesional de Alejandro Villa, estudiante de Ingeniería de Sistemas en la USM. Especializado en desarrollo React Full-Stack, IA y visión computacional." : "Professional portfolio of Alejandro Villa, Systems Engineering student at USM. Specialized in React Full-Stack development, AI, and computer vision."} />
        <meta property="og:type" content="website" />
        
        {/* SEO Canonical y Hreflang */}
        <link rel="canonical" href={config.domain} />
        <link rel="alternate" hreflang="es" href={config.domain} />
        <link rel="alternate" hreflang="en" href={config.domain} />
        <link rel="alternate" hreflang="x-default" href={config.domain} />
        
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      <Hero />

      <Reveal delay={0}>
        <About />
      </Reveal>

      <Reveal delay={0.05}>
        <Timeline />
      </Reveal>

      <Reveal delay={0.05}>
        <Courses />
      </Reveal>

      <Reveal delay={0.05}>
        <Stats />
      </Reveal>

      <Reveal delay={0.05}>
        <ErrorBoundary>
          <Avatar3D />
        </ErrorBoundary>
      </Reveal>

      <Reveal delay={0.05}>
        <ErrorBoundary>
          <Projects />
        </ErrorBoundary>
      </Reveal>

      <Reveal delay={0.05}>
        <Contact />
      </Reveal>
    </>
  )
}

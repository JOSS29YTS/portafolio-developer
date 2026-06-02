import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import CyberpunkLoader from './components/CyberpunkLoader'
import './index.css'

// Lazy loaded secondary routes for chunk split optimization
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AppContent() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<CyberpunkLoader />}>
          <PageTransition>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/proyecto/:slug" element={<ProjectDetail />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-accent')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const root = document.documentElement
        if (parsed.key) {
          root.setAttribute('data-accent', parsed.key.toLowerCase())
        } else if (parsed.value) {
          // Compatibility with older saved hex values
          const oldHexMap = {
            '#00D4FF': 'cyan',
            '#FF2079': 'magenta',
            '#D97706': 'amber',
            '#00FF88': 'green'
          }
          const keyName = oldHexMap[parsed.value]
          if (keyName) {
            root.setAttribute('data-accent', keyName)
          }
        }
      } catch {
        // Ignore parse errors
      }
    }
  }, [])

  return (
    <LanguageProvider>
      <HelmetProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </HelmetProvider>
    </LanguageProvider>
  )
}

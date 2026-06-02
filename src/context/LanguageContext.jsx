import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-language')
      if (saved === 'es' || saved === 'en') return saved
    } catch {
      // LocalStorage blocked or error
    }
    // Fallback: detect OS/Browser primary language
    return navigator.language.startsWith('en') ? 'en' : 'es'
  })

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-language', language)
    } catch {
      // LocalStorage blocked
    }
    // Update html lang attribute
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = () => setLanguage(l => l === 'es' ? 'en' : 'es')

  const t = (key) => {
    const keys = key.split('.')
    let current = translations[language]
    
    for (const k of keys) {
      if (current === undefined || current[k] === undefined) {
        // Fallback to ES dictionary if key not found in target language
        let fallback = translations['es']
        for (const fk of keys) {
          if (fallback === undefined || fallback[fk] === undefined) return key
          fallback = fallback[fk]
        }
        return fallback
      }
      current = current[k]
    }
    
    return current
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

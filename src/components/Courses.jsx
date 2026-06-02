import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import styles from './Courses.module.css'

const courses = [
  {
    title: {
      es: 'Diplomado de Programación — Python (Flask/Django) · JavaScript · IA para Programadores · MySQL · PostgreSQL',
      en: 'Programming Diploma — Python (Flask/Django) · JavaScript · AI for Programmers · MySQL · PostgreSQL',
    },
    institution: { es: 'UNEWEB, 2025', en: 'UNEWEB, 2025' },
  },
  {
    title: {
      es: 'Programación con C++ — Niveles 1 y 2',
      en: 'C++ Programming — Levels 1 & 2',
    },
    institution: { es: 'UCV, 2023', en: 'UCV, 2023' },
  },
  {
    title: {
      es: 'Inglés Básico',
      en: 'Basic English',
    },
    institution: { es: 'CEBA UCV, 2025', en: 'CEBA UCV, 2025' },
  },
  {
    title: {
      es: 'Photoshop CC Nivel 1 — Diseño gráfico',
      en: 'Photoshop CC Level 1 — Graphic Design',
    },
    institution: { es: 'Benllisoft, 2021', en: 'Benllisoft, 2021' },
  },
]

export default function Courses() {
  const { language } = useLanguage()

  return (
    <section id="courses" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <span className={styles.label}>{language === 'es' ? 'certificaciones' : 'certifications'}</span>
          <h2 className={styles.title}>
            {language === 'es' ? 'Cursos y Certificaciones' : 'Courses & Certifications'}
          </h2>
        </Reveal>

        <div className={styles.timeline}>
          <div className={styles.line} />

          {courses.map((item, i) => {
            const isLeft = i % 2 === 0
            const card = (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title[language]}</h3>
                <span className={styles.institution}>{item.institution[language]}</span>
              </div>
            )

            return (
              <Reveal key={i}>
                <div className={`${styles.row} ${isLeft ? styles.left : styles.right}`}>
                  {isLeft ? card : <div />}
                  <div className={styles.dot} />
                  {isLeft ? <div /> : card}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

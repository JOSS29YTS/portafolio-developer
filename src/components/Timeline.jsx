import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import styles from './Timeline.module.css'

const items = [
  {
    year: {
      es: 'Jun — Jul 2026',
      en: 'Jun — Jul 2026'
    },
    title: {
      es: 'Desarrollador Backend / Creador',
      en: 'Backend Developer / Creator'
    },
    subtitle: {
      es: 'EduFlow · Proyecto de Aprendizaje e Investigación',
      en: 'EduFlow · Learning & Research Project'
    },
    description: {
      es: 'Diseño e implementación de un sistema de gestión académica empresarial con Django y PostgreSQL. Optimicé procesos asíncronos mediante Celery y Redis para generación automatizada de facturas PDF, y estructuré la aplicación usando Docker para garantizar la portabilidad.',
      en: 'Design and implementation of an enterprise academic management system with Django and PostgreSQL. Optimized asynchronous processes using Celery and Redis for automated PDF invoicing, and structured the application using Docker to guarantee portability.'
    },
  },
  {
    year: {
      es: 'Abr — Jun 2026',
      en: 'Abr — Jun 2026'
    },
    title: {
      es: 'Desarrollador de Software',
      en: 'Software Developer'
    },
    subtitle: {
      es: 'Colegio Ntra. Sra. de Fátima · Servicio comunitario',
      en: 'Nuestra Señora de Fátima School · Community Service'
    },
    description: {
      es: 'Diseño e implementación de un sistema web Full-Stack en red local (LAN) para la gestión documental de investigaciones. Automatiza procesos académicos con autenticación segura (JWT) y un sistema de respaldos diarios sincronizados automáticamente en Google Drive.',
      en: 'Design and implementation of a local network (LAN) Full-Stack web system for research document management. Automates academic processes with secure authentication (JWT) and a daily backup system automatically synced with Google Drive.'
    },
  },
  {
    year: {
      es: 'Dic 2025 — Abr 2026',
      en: 'Dec 2025 — Apr 2026'
    },
    title: {
      es: 'Desarrollador Full-Stack Freelance',
      en: 'Freelance Full-Stack Developer'
    },
    subtitle: {
      es: 'Vesta Retail ERP · Proyecto independiente',
      en: 'Vesta Retail ERP · Independent Project'
    },
    description: {
      es: 'Diseño y desarrollo desde cero de una plataforma ERP/POS de nivel empresarial para la gestión multitienda. Optimiza el control de inventarios, ventas y facturación en tiempo real mediante la integración de WebSockets (Socket.io) entre sucursales.',
      en: 'Design and development from scratch of an enterprise-level multi-store ERP/POS platform. Optimizes inventory control, sales, and invoicing in real-time by integrating WebSockets (Socket.io) between branches.'
    },
  },
  {
    year: {
      es: 'Oct — Nov 2025',
      en: 'Oct — Nov 2025'
    },
    title: {
      es: 'Proyecto de Ingeniería de Software',
      en: 'Software Engineering Project'
    },
    subtitle: {
      es: 'PhishShield AI · Ciberseguridad (USM)',
      en: 'PhishShield AI · Cybersecurity (USM)'
    },
    description: {
      es: 'Diseño y desarrollo de un analizador inteligente de URLs contra phishing como proyecto destacado para la materia Ingeniería de Software, enfocado en ciberseguridad defensiva, lógica heurística y detección de enlaces maliciosos en tiempo real.',
      en: 'Design and development of an intelligent URL phishing analyzer as a featured project for the Software Engineering course, focused on defensive cybersecurity, heuristic logic, and real-time malicious link detection.'
    },
  },
  {
    year: {
      es: '2022 — presente',
      en: '2022 — present'
    },
    title: {
      es: 'Ingeniería de Sistemas',
      en: 'Systems Engineering'
    },
    subtitle: {
      es: 'Universidad Santa María (USM) · Caracas',
      en: 'Santa Maria University (USM) · Caracas'
    },
    description: {
      es: 'Estudiante de 9no semestre, USM Caracas. Desarrollo aplicaciones web Full-Stack robustas —del backend al frontend— utilizando React, Node.js, MySQL y Python. Me enfoco en escribir código limpio, escalable y en diseñar experiencias de usuario intuitivas y de alto rendimiento.',
      en: '9th-semester student, USM Caracas. Developing robust Full-Stack web applications—from backend to frontend—using React, Node.js, MySQL, and Python. Focus on writing clean, scalable code and designing intuitive, high-performance user experiences.'
    },
  },
]

export default function Timeline() {
  const { language } = useLanguage()

  return (
    <section id="timeline" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <span className={styles.label}>{language === 'es' ? 'trayectoria' : 'journey'}</span>
          <h2 className={styles.title}>{language === 'es' ? 'Experiencia & educación' : 'Experience & Education'}</h2>
        </Reveal>

        <div className={styles.list}>
          <div className={styles.line} />

          {items.map((item, i) => (
            <Reveal key={i}>
              <div className={styles.item}>
                <div className={styles.dot} />
                <span className={styles.year}>{item.year[language]}</span>
                <h3 className={styles.itemTitle}>{item.title[language]}</h3>
                <span className={styles.subtitle}>{item.subtitle[language]}</span>
                <p className={styles.desc}>{item.description[language]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export const projects = [
  {
    id: 3,
    slug: 'vesta-retail-erp',
    title: 'Vesta Retail ERP',
    description: {
      es: 'Plataforma ERP/POS multitienda de alto rendimiento con sincronización bidireccional en tiempo real y arquitectura de base de datos optimizada.',
      en: 'High-performance multi-store ERP/POS platform with real-time bidirectional synchronization and optimized database architecture.'
    },
    longDescription: {
      es: 'Ecosistema empresarial ERP y Punto de Venta (POS) robusto, diseñado a medida para mitigar la complejidad operativa de la administración multitienda. Mediante una arquitectura distribuida impulsada por WebSockets de ultra-baja latencia, el sistema unifica la gestión de stock global, automatiza la facturación concurrente y consolida ventas físicas de múltiples terminales, garantizando la integridad de los datos en entornos de alta concurrencia.',
      en: 'Robust ERP and Point of Sale (POS) business ecosystem, custom-built to mitigate the operational complexity of multi-store management. Through a distributed architecture powered by ultra-low latency WebSockets, the system unifies global stock management, automates concurrent invoicing, and consolidates physical sales from multiple terminals, guaranteeing data integrity in high-concurrency environments.'
    },
    tags: ['React', 'Node.js', 'WebSockets', 'MySQL', 'Tailwind CSS'],
    techDetails: ['React 19', 'Node.js', 'Express', 'Socket.io', 'MySQL', 'Sequelize', 'Tailwind CSS', 'CSS Modules'],
    screenshots: [
      '/projects/portfolio-screenshots/2_dashboard.webp',
      '/projects/portfolio-screenshots/5_sales.webp',
      '/projects/portfolio-screenshots/4_inventory.webp',
      '/projects/portfolio-screenshots/9_profit_loss.webp',
    ],
    color: 'green',
    demoScreenshots: [
      '/projects/portfolio-screenshots/2_dashboard.webp',
      '/projects/portfolio-screenshots/5_sales.webp',
      '/projects/portfolio-screenshots/4_inventory.webp',
      '/projects/portfolio-screenshots/9_profit_loss.webp',
    ],
    demoVideoUrl: '/projects/videos/vesta_demo.mp4',
    demoUrl: 'https://tienda-vv.vercel.app/',
    githubUrl: 'https://github.com/JOSS29YTS/tienda-vv',
    status: 'live',
    demoCredentials: {
      title: {
        es: 'Credenciales de Demostración',
        en: 'Demo Credentials'
      },
      subtitle: {
        es: 'Para probar la plataforma en el despliegue de demostración o entorno local, puedes utilizar el siguiente usuario autogenerado:',
        en: 'To test the platform in the live demo or local environment, you can use the following auto-generated user:'
      },
      profiles: [
        {
          role: {
            es: 'Administrador Global (Dueño)',
            en: 'Global Administrator (Owner)'
          },
          email: 'admin@tiendavv.com',
          permissions: {
            es: 'Acceso completo a todas las sucursales, balances financieros globales, comisiones de todas las tiendas, gestión de inventario global y configuración de tasa cambiaria.',
            en: 'Full access to all branches, global financial statements, sales commissions from all stores, global inventory management, and exchange rate configuration.'
          }
        }
      ]
    },
    learnings: {
      es: 'Dominé el modelado avanzado de bases de datos relacionales en MySQL con Sequelize, la optimización de consultas complejas y la implementación de canales bidireccionales tolerantes a fallos usando Socket.io. Asimismo, perfeccioné la modularización en React 19 para mantener un frontend ágil, rápido y de bajo acoplamiento.',
      en: 'Mastered advanced relational database modeling in MySQL with Sequelize, optimized complex queries, and implemented fault-tolerant bidirectional channels using Socket.io. Additionally, perfected modularization in React 19 to maintain a fast, agile, and loosely coupled frontend.'
    },
  },
  {
    id: 2,
    slug: 'repositorio-academico',
    title: 'Repositorio Académico',
    description: {
      es: 'Sistema digital premium de gestión académica, preservación de proyectos de investigación y automatización con IA.',
      en: 'Premium digital system for academic management, research document preservation, and AI automation.'
    },
    longDescription: {
      es: 'Sistema digital e interactivo premium desarrollado para el Colegio Nuestra Señora de Fátima. Automatiza la preservación y el análisis inteligente de proyectos de investigación científica de 5to año de bachillerato. Cuenta con una arquitectura SPA moderna, autenticación segura por roles (RBAC) para Directores y Docentes, un módulo de auditoría de sistema inmutable, sincronización automática con Google Drive para disaster recovery, visualizador de PDF interactivo en tiempo real y un dashboard analítico con gráficos SVG reactivos nativos.',
      en: 'Premium interactive digital system developed for Nuestra Señora de Fátima School. It automates the preservation and intelligent analysis of scientific research projects for high school seniors. Features a modern SPA architecture, secure Role-Based Access Control (RBAC) for Directors and Teachers, an immutable system audit log module, automatic synchronization with Google Drive for disaster recovery, an interactive real-time PDF viewer, and an analytical dashboard with native reactive SVG charts.'
    },
    tags: ['React', 'Node.js', 'MySQL', 'Gemini AI', 'CSS'],
    techDetails: ['React 19', 'Node.js', 'Express', 'MySQL', 'Google Gemini 2.0 Flash SDK', 'SVG Charts', 'JWT Auth', 'RBAC', 'Drive API', 'CSS Modules'],
    screenshots: [
      '/projects/servicio-screenshots/01_landing_page.webp',
      '/projects/servicio-screenshots/06_dashboard.webp',
      '/projects/servicio-screenshots/07_proyectos.webp',
      '/projects/servicio-screenshots/08_nuevo_proyecto.webp',
      '/projects/servicio-screenshots/09_buscar.webp',
      '/projects/servicio-screenshots/11_usuarios.webp',
      '/projects/servicio-screenshots/12_configuracion.webp',
    ],
    color: 'magenta',
    demoVideoUrl: '/projects/videos/repositorio_demo.mp4',
    demoUrl: 'https://servicio-comunitario-portafolio.vercel.app',
    githubUrl: 'https://github.com/JOSS29YTS/servicio_comunitario_portafolio',
    status: 'live',
    demoCredentials: {
      title: {
        es: 'Usuario Administrador Demo',
        en: 'Demo Administrator User'
      },
      subtitle: {
        es: 'Para probar la plataforma en el despliegue de demostración en vivo, puedes utilizar la siguiente cuenta de acceso por defecto con privilegios de Director:',
        en: 'To test the platform in the live demo deployment, you can use the following default access account with Director privileges:'
      },
      profiles: [
        {
          role: {
            es: 'Director',
            en: 'Director'
          },
          email: 'demo@admin.com',
          emailLabel: 'Usuario:',
          permissions: {
            es: 'Acceso completo a la gestión documental de investigaciones, carga automatizada de PDFs y auditoría inmutable de logs en el sistema.',
            en: 'Full access to research document management, automated PDF uploads, and immutable system audit logs.'
          }
        }
      ]
    },
    learnings: {
      es: 'Profundicé en la integración del SDK de Google Gemini 2.0 Flash para parsing y estructuración automática de documentos complejos (PDFs), optimizando las consultas mediante una base de datos relacional MySQL como caché inteligente. Diseñé un sistema inmutable de logs de auditoría para seguridad escolar, implementé controles de acceso basados en roles (RBAC) rígidos, y creé visualizaciones analíticas con gráficos SVG puros para asegurar una experiencia premium y fluida sin conflictos de dependencias en React 19.',
      en: 'Deepened expertise in integrating the Google Gemini 2.0 Flash SDK for automated parsing and structuring of complex PDF documents, optimizing queries using a MySQL database as an intelligent cache. Designed an immutable audit log system for school security, implemented strict Role-Based Access Control (RBAC), and created analytical visualizations with pure SVG charts to ensure a premium and fluid experience with React 19.'
    },
  },
  {
    id: 4,
    slug: 'phishshield',
    title: 'PhishShield AI',
    description: {
      es: 'Analizador inteligente de URLs contra phishing impulsado por lógica heurística avanzada, concurrencia y múltiples APIs de reputación global.',
      en: 'Intelligent URL phishing analyzer powered by advanced heuristics, concurrency, and multiple global reputation APIs.'
    },
    longDescription: {
      es: 'Desarrollado como proyecto destacado para la materia Ingeniería de Software (Octubre — Noviembre 2025) bajo la temática de ciberseguridad defensiva y detección inteligente de amenazas. PhishShield AI es una plataforma avanzada que combina un backend robusto en Flask, almacenamiento persistente mediante base de datos SQLite normalizada en 4NF para historial completo de análisis, extracción avanzada de características léxicas e integridad SSL, y un motor de clasificación heurístico propio dotado de IA Explicable. Adicionalmente, integra consultas de reputación global de amenazas con VirusTotal y PhishTank, y un scraper multihilo paralelo de alto rendimiento para procesamiento de datasets.',
      en: 'Developed as a flagship project for Software Engineering (October — November 2025) under the theme of defensive cybersecurity and intelligent threat detection. PhishShield AI is an advanced platform combining a robust Flask backend, persistent storage via a SQLite database normalized in 4NF for analysis history, advanced lexical feature extraction and SSL integrity checks, and a custom heuristic classification engine equipped with Explainable AI (XAI). Additionally, it integrates global threat reputation checks with VirusTotal and PhishTank, and a high-performance concurrent multi-threaded scraper for dataset processing.'
    },
    tags: ['Python/Flask', 'SQLite3', 'CSS', 'Tailwind CSS', 'Ciberseguridad'],
    techDetails: ['Python 3.10+', 'Flask', 'SQLite3 (4NF)', 'HTML5 & CSS', 'Tailwind CSS', 'JavaScript', 'VirusTotal API', 'PhishTank API', 'BeautifulSoup4', 'ThreadPoolExecutor', 'AOS (Animations)'],
    screenshots: [
      '/projects/screenshots-phishing/02_home_analyzed_secure.webp',
      '/projects/screenshots-phishing/03_home_analyzed_phishing.webp',
      '/projects/screenshots-phishing/04_stats.webp',
      '/projects/screenshots-phishing/06_api_rest.webp',
    ],
    color: 'yellow',
    demoVideoUrl: '/projects/videos/phishshield_demo.mp4',
    demoUrl: 'https://phishshield-kq6x.onrender.com',
    githubUrl: 'https://github.com/JOSS29YTS/Detector-de-Phishing-en-URL',
    status: 'live',
    demoCredentials: {
      title: {
        es: 'Instrucciones de Uso Local / API',
        en: 'Local Usage / API Instructions'
      },
      subtitle: {
        es: 'Para probar el motor de PhishShield de forma local, puedes clonar el repositorio e interactuar con su API REST integrada. El endpoint principal es:',
        en: 'To test the PhishShield engine locally, you can clone the repository and interact with its integrated REST API. The main endpoint is:'
      },
      profiles: [
        {
          role: {
            es: 'Endpoint de Análisis (POST)',
            en: 'Analysis Endpoint (POST)'
          },
          email: '/analyze',
          emailLabel: {
            es: 'Ruta local:',
            en: 'Local route:'
          },
          password: '{ "url": "https://url-a-analizar.com" }',
          passwordLabel: {
            es: 'Cuerpo (JSON):',
            en: 'Body (JSON):'
          },
          permissions: {
            es: 'Retorna un objeto JSON con las detecciones de VirusTotal y PhishTank, el desglose detallado de las características heurísticas analizadas y una explicación semántica de los factores de riesgo (IA Explicable).',
            en: 'Returns a JSON object with VirusTotal and PhishTank detections, a detailed breakdown of the analyzed heuristic features, and a semantic explanation of risk factors (Explainable AI).'
          }
        }
      ]
    },
    learnings: {
      es: 'Profundicé en la automatización del análisis de amenazas y lógica heurística multi-variable para clasificación de URLs. Diseñé e implementé una base de datos SQLite normalizada en la Cuarta Forma Normal (4NF) para mantener un historial completo de análisis evitando redundancias y mejorando el rendimiento. Desarrollé scrapers concurrentes y bulk analyzers multihilo con ThreadPoolExecutor optimizados para procesamiento paralelo de alto volumen. Asimismo, perfeccioné la modularización y la gestión segura de credenciales (SecOps) aislando llaves API sensibles mediante variables de entorno en producción.',
      en: 'Focused on threat analysis automation and multi-variable heuristic logic for URL classification. Designed and implemented a SQLite database normalized in the Fourth Normal Form (4NF) to maintain analysis history, avoiding redundancy and improving performance. Developed concurrent scrapers and multi-threaded bulk analyzers with ThreadPoolExecutor optimized for high-volume parallel processing. Additionally, polished modularization and secure credential management (SecOps) by isolating sensitive API keys using environment variables in production.'
    },
  },
  {
    id: 1,
    slug: 'dashboard-estadisticas',
    title: 'Dashboard de estadísticas',
    description: {
      es: 'Panel con tarjetas de métricas, modo oscuro/claro y paleta semántica adaptable. Diseñado para visualización de datos en tiempo real.',
      en: 'Panel with metric cards, dark/light theme toggle, and adaptive semantic palette. Designed for real-time data visualization.'
    },
    longDescription: {
      es: 'Este dashboard fue construido con el objetivo de ofrecer una interfaz limpia y funcional para la visualización de datos en tiempo real. Incluye múltiples tarjetas de métricas, gráficos adaptables y un sistema de temas (oscuro/claro) que se ajusta automáticamente según la preferencia del usuario. La paleta de colores semántica permite identificar rápidamente estados positivos, negativos y neutros en los datos.',
      en: 'This dashboard was built with the goal of offering a clean and functional interface for real-time data visualization. Includes multiple metric cards, adaptable charts, and a theme system (dark/light) that automatically adjusts based on user preference. The semantic color palette allows quick identification of positive, negative, and neutral states in the data.'
    },
    tags: ['React', 'CSS'],
    techDetails: ['React 19', 'CSS Modules', 'Recharts', 'Context API'],
    screenshots: [],
    color: 'cyan',
    demoUrl: '/dashboard',
    githubUrl: null,
    status: 'live',
    learnings: {
      es: 'Reforcé conceptos de visualización de datos, manejo de estado global con Context API y diseño de sistemas de temas dinámicos. Aprendí a optimizar renders con React 19.',
      en: 'Reinforced data visualization concepts, global state management with Context API, and dynamic theme system design. Learned to optimize renders using React 19.'
    },
  },
  {
    id: 5,
    slug: 'eduflow',
    title: 'EduFlow',
    description: {
      es: 'Sistema de gestión académica y plataforma web completa para la administración de diplomados y cursos.',
      en: 'Academic management system and comprehensive web platform for diplomas and courses administration.'
    },
    longDescription: {
      es: 'EduFlow es una plataforma web completa de nivel empresarial diseñada para la administración y control total de diplomados, cursos y procesos académicos. Automatiza la gestión de inscripciones, control de asistencia en tiempo real por clases, cronogramas interactivos, pagos, facturación automática en PDF enviada por correo electrónico mediante Celery en segundo plano. Cuenta con un sistema seguro de control de acceso basado en roles (RBAC) para Administradores, Coordinadores, Profesores y Estudiantes.',
      en: 'EduFlow is an enterprise-level comprehensive web platform designed for the complete administration and control of diplomas, courses, and academic processes. It automates enrollment management, real-time class attendance control, interactive schedules, payments, and automatic PDF invoicing sent via email using Celery background tasks. Features a secure Role-Based Access Control (RBAC) system for Administrators, Coordinators, Professors, and Students.'
    },
    tags: ['Python/Django', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    techDetails: ['Python 3.12', 'Django 5.0', 'PostgreSQL 16', 'Tailwind CSS 3.4', 'Celery', 'Redis', 'Docker'],
    screenshots: [],
    color: 'yellow',
    demoUrl: null,
    githubUrl: null,
    status: 'in-progress',
    learnings: {
      es: 'Este proyecto me permitirá profundizar en el desarrollo backend de nivel empresarial utilizando Django y Django REST Framework, así como en la orquestación de tareas en segundo plano a gran escala con Celery y Redis. También me servirá para dominar la generación dinámica de facturas en PDF con WeasyPrint y el empaquetado del entorno completo mediante contenedores Docker.',
      en: 'This project will allow me to deepen my understanding of enterprise-grade backend development using Django and Django REST Framework, as well as background task orchestration at scale with Celery and Redis. It will also serve to master dynamic PDF invoice generation with WeasyPrint and environment containerization using Docker.'
    },
  }
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null
}

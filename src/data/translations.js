export const translations = {
  es: {
    nav: {
      home: 'inicio',
      about: 'sobre mí',
      timeline: 'experiencia',
      '3d': '3D',
      projects: 'proyectos',
      contact: 'contacto',
      blog: 'blog',
      dashboard: 'dashboard'
    },
    hero: {
      greeting: 'Hola, soy',
      roles: ['Full-Stack Developer', 'Estudiante de Ingeniería', 'Creador de Soluciones'],
      cvBtn: 'Descargar CV',
      projectsBtn: 'Ver Proyectos',
      contactBtn: 'Contáctame'
    },
    about: {
      label: 'sobre mí',
      title: 'Construyendo cosas que importan',
      text1: 'Estudiante de 9no semestre de Ingeniería de Sistemas en la USM Caracas. Construyo productos web completos —desde el backend hasta el frontend— con React, Node.js, MySQL y Python. Actualmente desarrollo un sistema de gestión documental escolar como proyecto de servicio comunitario.',
      text2: '',
      cvBtn: 'Descargar CV',
      skills: {
        frontend: 'Frontend',
        backend: 'Backend',
        ai: 'IA / Visión computacional',
        others: 'Otros'
      }
    },
    projects: {
      label: 'trabajo',
      title: 'Proyectos destacados',
      sub: 'Una selección de lo que he construido. Haz clic en cada proyecto para ver más detalles.',
      filterAll: 'Todos',
      emptyMsg: 'Ningún proyecto coincide con ese filtro.'
    },
    stats: {
      projects: 'Proyectos construidos',
      years: 'Años de carrera',
      tech: 'Tecnologías dominadas',
      lang: 'Lenguajes de programación',
      prod: 'Proyectos en producción'
    },
    timeline: {
      label: 'línea del tiempo',
      title: 'Trayectoria académica y proyectos',
      usm: 'Ingeniería de Sistemas',
      usmSub: 'Universidad Santa María (USM) · Estudiante · Caracas',
      usmDesc: 'Cursando el 9° semestre con enfoque en desarrollo de software, ciberseguridad, bases de datos avanzadas y visión artificial.',
      fatima: 'Servicio Comunitario Académico',
      fatimaSub: 'Colegio Nuestra Señora de Fátima · Desarrollador',
      fatimaDesc: 'Desarrollo y despliegue del Repositorio Académico con IA Gemini y almacenamiento MySQL en red local (LAN) para directores y docentes.',
      software: 'Proyecto Ingeniería de Software',
      softwareSub: 'PhishShield AI · Ciberseguridad Defensiva',
      softwareDesc: 'Diseño e implementación de un clasificador heurístico de phishing, SQLite en Cuarta Forma Normal (4NF) y scraper concurrente multihilo.'
    },
    contact: {
      label: 'contacto',
      title: 'Hablemos de tu próximo proyecto',
      text: '¿Tienes una idea en mente, buscas un desarrollador junior para tu equipo o quieres colaborar en algo interesante? Escríbeme y responderé lo antes posible.',
      name: 'Nombre',
      email: 'Correo electrónico',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.',
      error: 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.'
    },
    projectDetail: {
      backBtn: 'Volver a proyectos',
      liveDemo: 'Ver demo en vivo',
      viewDemo: 'Ver demo',
      sourceCode: 'Código fuente',
      videoDemo: 'Demo en video',
      screenshots: 'Capturas',
      techUsed: 'Tecnologías utilizadas',
      whatILearned: 'Lo que aprendí',
      credentialsTitle: 'Credenciales de Demostración',
      activeConnection: 'CONEXIÓN_ACTIVA — credenciales listas para usar',
      copyTitle: 'Copiar',
      copiedTitle: '¡Copiado!',
      notFound: 'Proyecto no encontrado',
      roleLabel: 'Rol:',
      permissionsLabel: 'Permisos:',
      fallbackText: 'Captura no disponible en modo local / offline',
      fallbackSubtext: 'El demo en vivo o el repositorio siguen estando activos'
    },
    notFound: {
      title: 'Página no encontrada',
      sub: 'El recurso que buscas ha sido encriptado o no existe en esta dimensión.',
      sub2: 'Esta ruta no existe. Puede que hayas seguido un enlace roto o escrito mal la URL.',
      backBtn: '← Volver al inicio'
    },
    blog: {
      label: 'artículos',
      title: 'Bitácora de desarrollo',
      sub: 'Pensamientos, tutoriales y aprendizajes sobre ingeniería de software y ciberseguridad.',
      sub2: 'Notas, aprendizajes y detalles técnicos de los proyectos que he construido.',
      readMore: 'Leer más',
      backBtn: '← Volver al blog',
      notFoundTitle: 'Artículo no encontrado',
      notFoundDesc: 'El artículo que buscas no existe o ha sido eliminado.',
      emptyMsg: 'No hay artículos publicados aún.'
    },
    dashboard: {
      title: 'Dashboard interactivo',
      desc: 'Demo interactiva del Dashboard de estadísticas — playground con métricas en vivo y personalización de tema.',
      eyebrow: 'Playground Interactivo',
      headerTitle: 'Dashboard de estadísticas',
      headerSub: 'Manipula los sliders para simular carga del sistema. Los datos se actualizan en tiempo real. Cambia el color del portafolio desde el panel inferior.',
      sandboxTitle: 'Dashboard de métricas',
      sandboxSub: 'Los valores se actualizan en tiempo real. Mueve los sliders para simular carga.',
      activeUsers: 'Usuarios activos',
      networkLatency: 'Latencia de red',
      cpu: 'CPU',
      usersLabel: 'Usuarios',
      latencyLabel: 'Latencia (ms)',
      cpuLabel: 'CPU (%)',
      portfolioColor: 'Color del portafolio',
      themeHint: 'cambia todo el sitio →',
      accentCyan: 'Cian',
      accentMagenta: 'Magenta',
      accentAmber: 'Ámbar',
      accentGreen: 'Verde'
    },
    demoWarning: {
      title: 'Servidor en suspension',
      message: 'El servidor de demostracion gratuita se duerme por inactividad. Cuando se abra la pagina, espera unos 50 segundos mientras se reactiva.',
      redirecting: 'Redirigiendo en {s}s...',
      cancel: 'Cancelar',
      gotIt: 'Entendido'
    },
    avatar3d: {
      label: 'experiencia 3D',
      title: 'Renderizado interactivo',
      subtitle: 'CSS 3D puro vs WebGL real — dos tecnologías, el mismo espacio.',
      cssCardLabel: 'CSS 3D · Holograma',
      cssHint: 'sin WebGL · animación pura',
      webglCardLabel: 'WebGL · Three.js interactivo',
      webglHint: 'Three.js · Aceleración GPU',
      dragToRotate: 'arrastra para rotar'
    }
  },
  en: {
    nav: {
      home: 'home',
      about: 'about me',
      timeline: 'experience',
      '3d': '3D',
      projects: 'projects',
      contact: 'contact',
      blog: 'blog',
      dashboard: 'dashboard'
    },
    hero: {
      greeting: "Hi, I'm",
      roles: ['Full-Stack Developer', 'Systems Engineering Student', 'Solutions Builder'],
      cvBtn: 'Download CV',
      projectsBtn: 'View Projects',
      contactBtn: 'Contact Me'
    },
    about: {
      label: 'about me',
      title: 'Building things that matter',
      text1: 'Systems Engineering student in their 9th semester at USM Caracas. I build complete web products—from backend to frontend—using React, Node.js, MySQL, and Python. Currently developing a school document management system as a community service project.',
      text2: '',
      cvBtn: 'Download CV',
      skills: {
        frontend: 'Frontend',
        backend: 'Backend',
        ai: 'AI / Computer Vision',
        others: 'Others'
      }
    },
    projects: {
      label: 'work',
      title: 'Featured Projects',
      sub: "A selection of what I've built. Click on each project to see more details.",
      filterAll: 'All',
      emptyMsg: 'No projects match this filter.'
    },
    stats: {
      projects: 'Projects built',
      years: 'Years of career',
      tech: 'Mastered technologies',
      lang: 'Programming languages',
      prod: 'Projects in production'
    },
    timeline: {
      label: 'timeline',
      title: 'Academic Journey & Projects',
      usm: 'Systems Engineering',
      usmSub: 'Santa Maria University (USM) · Student · Caracas',
      usmDesc: 'Currently in 9th semester, with focus on software development, cybersecurity, advanced databases, and computer vision.',
      fatima: 'Academic Community Service',
      fatimaSub: 'Nuestra Señora de Fátima School · Developer',
      fatimaDesc: 'Development and deployment of the Academic Repository with Gemini AI and MySQL storage on a local network (LAN) for directors and teachers.',
      software: 'Software Engineering Project',
      softwareSub: 'PhishShield AI · Defensive Cybersecurity',
      softwareDesc: 'Design and implementation of a custom heuristic phishing classifier, SQLite database in Fourth Normal Form (4NF), and multi-threaded concurrent scraper.'
    },
    contact: {
      label: 'contact',
      title: "Let's talk about your next project",
      text: 'Have an idea in mind, looking for a junior developer for your team, or want to collaborate on something interesting? Write to me and I will respond as soon as possible.',
      name: 'Name',
      email: 'Email Address',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully! I will get in touch with you soon.',
      error: 'There was a problem sending your message. Please try again.'
    },
    projectDetail: {
      backBtn: 'Back to projects',
      liveDemo: 'Live Demo',
      viewDemo: 'View Demo',
      sourceCode: 'Source code',
      videoDemo: 'Video Demo',
      screenshots: 'Screenshots',
      techUsed: 'Technologies Used',
      whatILearned: 'What I learned',
      credentialsTitle: 'Demo Credentials',
      activeConnection: 'CONNECTION_ACTIVE — credentials ready to use',
      copyTitle: 'Copy',
      copiedTitle: 'Copied!',
      notFound: 'Project not found',
      roleLabel: 'Role:',
      permissionsLabel: 'Permissions:',
      fallbackText: 'Screenshot not available in local / offline mode',
      fallbackSubtext: 'The live demo or repository remains active'
    },
    notFound: {
      title: 'Page not found',
      sub: 'The resource you are looking for has been encrypted or does not exist in this dimension.',
      sub2: 'This route does not exist. You may have followed a broken link or mistyped the URL.',
      backBtn: '← Go back home'
    },
    blog: {
      label: 'articles',
      title: 'Development Log',
      sub: 'Thoughts, tutorials, and learnings on software engineering and cybersecurity.',
      sub2: 'Notes, learnings, and technical details of the projects I have built.',
      readMore: 'Read more',
      backBtn: '← Back to blog',
      notFoundTitle: 'Article not found',
      notFoundDesc: 'The article you are looking for does not exist or has been deleted.',
      emptyMsg: 'No articles published yet.'
    },
    dashboard: {
      title: 'Interactive Dashboard',
      desc: 'Interactive demo of the statistics dashboard — playground with live metrics and theme customization.',
      eyebrow: 'Interactive Playground',
      headerTitle: 'Statistics Dashboard',
      headerSub: 'Manipulate the sliders to simulate system load. Data updates in real time. Change the portfolio accent color from the bottom panel.',
      sandboxTitle: 'Metrics Dashboard',
      sandboxSub: 'Values update in real time. Move the sliders to simulate load.',
      activeUsers: 'Active users',
      networkLatency: 'Network latency',
      cpu: 'CPU',
      usersLabel: 'Users',
      latencyLabel: 'Latency (ms)',
      cpuLabel: 'CPU (%)',
      portfolioColor: 'Portfolio accent color',
      themeHint: 'changes the entire site →',
      accentCyan: 'Cyan',
      accentMagenta: 'Magenta',
      accentAmber: 'Amber',
      accentGreen: 'Green'
    },
    demoWarning: {
      title: 'Server is Sleeping',
      message: 'The free-tier demo server spins down when idle. When the page opens, please allow up to 50 seconds for it to wake up.',
      redirecting: 'Redirecting in {s}s...',
      cancel: 'Cancel',
      gotIt: 'Got it'
    },
    avatar3d: {
      label: '3D experience',
      title: 'Interactive Rendering',
      subtitle: 'Pure CSS 3D vs real WebGL — two technologies, same space.',
      cssCardLabel: 'CSS 3D · Hologram',
      cssHint: 'no WebGL · pure animation',
      webglCardLabel: 'WebGL · Interactive Three.js',
      webglHint: 'Three.js · GPU Acceleration',
      dragToRotate: 'drag to rotate'
    }
  }
}

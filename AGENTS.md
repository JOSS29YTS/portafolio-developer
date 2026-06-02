# Portfolio — Contexto

## Sesión anterior (20 May 2026)

### Fase 1 — Base
- Limpieza de tesis/monitoreo de cultivos de todos los componentes
- `portfolioConfig.js` centralizado (email, github, linkedin, formspreeId, cvUrl)
- DashboardSandbox con sliders interactivos + customizador de color `--accent`
- Botón CV en Hero y About
- Migración de ProjectDetail a CSS Modules
- Eliminación de CustomCursor y ProjectModal

### Fase 2 — Pulido (completada)
- Página 404 con efecto glitch
- Mockups dinámicos en ProjectCard: sparkline SVG para Dashboard, árbol de archivos para Repositorio
- Carrusel 3D cilíndrico en Projects (reemplazó grid y carrusel anterior)
- Transición `body { transition: background 0.3s, color 0.3s }`

### Rediseño Completo — Cyberpunk (completado)
- **Paleta nueva:** `--accent: #00D4FF` (cian), `--accent-2: #FF2079` (magenta), `--green: #00FF88`, `--bg-base: #070711`
- **Hero nuevo** (Hero.jsx): fullscreen 100vh, dot grid background, scan lines sutiles, glow radial, typewriter role, nombre Ale con glitch en hover, CTA buttons con glow hover, scroll indicator animado
- **Layout:** scroll vertical limpio (Hero → About → Timeline → Stats → Projects → Contact), split-screen eliminado
- **DashboardSandbox** → página `/dashboard` propia con header y contexto
- **Sidebar.jsx** eliminado (reemplazado por Hero)
- **Navbar** con link a `/dashboard`
- **Colores de proyectos:** Dashboard → `cyan`, Repositorio → `magenta`
- **Tipografía:** JetBrains Mono agregada para labels/mono
- **Archivos eliminados:** Sidebar.jsx, Sidebar.module.css, Hero.jsx (viejo), Hero.module.css (viejo), HeroParticles.jsx, Home.module.css
- **Keyframes globales:** `borderGlow`, `textGlitch`, `pageFadeIn`

### Sesión actual (28 May 2026)
- **Asociación del Proyecto de Phishing:** Se vinculó el proyecto **PhishShield AI** como un proyecto académico destacado de la materia **Ingeniería de Software** (enfocado en ciberseguridad defensiva) de la Universidad Santa María (USM), correspondiente al periodo `Oct — Nov 2025`. Esto se integró de forma cronológica en `Timeline.jsx` y se actualizó en las descripciones de `projects.js`.
- **Persistencia de Color de Acento (`--accent`):** Implementada mediante sincronización automática con `localStorage`. Ahora la preferencia de color del customizador interactivo en `/dashboard` se aplica de forma global al iniciar `App.jsx` y persiste de forma limpia en todo el sitio tras recargas y navegaciones.
- **Code Splitting & Optimización de Bundle:** Se configuró carga diferida con `React.lazy()` y `Suspense` para las rutas secundarias (`ProjectDetail`, `DashboardPage` y `NotFound`), reduciendo el tamaño del paquete principal y aislando por completo librerías pesadas como Three.js en su propio chunk.
- **Pantalla de Carga Cyberpunk (`CyberpunkLoader`):** Diseñada como fallback de Suspense con estética de terminal hacker retro. Simula la carga de paquetes con una barra interactiva, líneas de escaneo neon animadas y registros secuenciales.
- **Verificación de Compilación exitosa:** Certificada mediante `pnpm build` comprobando la división perfecta de chunks.

### Sesión actual (30 May 2026)
- **Framer Motion instalado** (`v12.40.0`) con `AnimatePresence` para transiciones glitch entre páginas (`PageTransition.jsx`).
- **Skills Grid con spring physics** en `About.jsx`: categorías con `whileHover` spring, iconos con micro-escala al hover, bordes con gradiente conic neon animado en hover (`::before` + `conic-gradient`).
- **ProjectCardSkeleton** (`ProjectCardSkeleton.jsx`): skeleton neon pulsante con Framer Motion como placeholder inicial del carrusel 3D.
- **Credenciales tipo terminal hacker** en `ProjectDetail.jsx`: UI de editor de código con pestañas simuladas (`credenciales.sh`, `config.json`), botón "Copiar al portapapeles" con `navigator.clipboard`, LEDs de estado, prompts `$`, divider `>>`, sin emojis.
- **`.env` para Formspree ID** (`VITE_FORMSPREE_ID`) con fallback a `'xredlowl'` en `portfolioConfig.js`. `*.env` ya estaba en `.gitignore`.
- **Modo Claro/Oscuro Solarpunk** con `useTheme.js` hook, toggle en `Navbar.jsx` (icono sol/luna), paleta Solarpunk en `[data-theme='light']` (fondo cálido `#F5F0E8`, texto `#1a1a2e`, neones vibrantes contrastados). Persiste en `localStorage`.
- **Optimización Integral de Modo Claro (Solarpunk):** Reemplazamos todos los neones ultra-brillantes y opacidades blancas hardcodeadas en preview, mockups, sliders y skeletons por variables CSS dinámicas y adaptables. Los iconos de tecnología (About y Hero) ahora conservan su aspecto oscuro original en modo claro para evitar que queden invisibles, y el terminal de credenciales se dibuja de forma impecable en ambos temas.
- **Reestructuración Cromática Dinámica:** Modificamos el customizador de acentos de `/dashboard` y la carga inicial (`App.jsx`) para que utilicen el atributo `data-accent` en el elemento raíz en lugar de inyectar propiedades inline directamente. Esto elimina cualquier conflicto de especificidad y permite que el CSS asigne el color óptimo (neones vibrantes en Cyberpunk y tonos ricos legibles en Solarpunk) para cada acento seleccionado. Añadimos compatibilidad retroactiva robusta para parsear valores de acento antiguos.
- **Simplificado demo button** en `ProjectCard.jsx` (de 6 ramas → 1 ternario).
- **Stats expandido** a 5 items (4+ proyectos, 6+ lenguajes, 3+ en producción).
- **Lint errors corregidos** (6 → 0).
- **Build exitoso** en 4.38s con chunks correctamente divididos para producción.

### Sesión actual (31 May 2026)
- **Consolidación y Simplificación de Filtros de Proyectos:**
  - Unificamos las etiquetas y filtros de `HTML5 y CSS3` a simplemente `CSS`.
  - Fusionamos las etiquetas individuales `Python` y `Flask` en una única categoría combinada: `Python/Flask`.
  - Ajustamos la lista global de filtros `ALL_TAGS` en `Projects.jsx` para mostrar exactamente: **Todos, React, Node.js, MySQL, Python/Django, Python/Flask, PostgreSQL, SQLite3, CSS, Tailwind CSS, Gemini AI, WebSockets y Ciberseguridad**.
  - Sincronizamos las etiquetas en `projects.js` para los proyectos `PhishShield AI` (utilizando ahora `Python/Flask` y `CSS`), `Dashboard de estadísticas` y `EduFlow` (sincronizando `Python/Django` y `PostgreSQL` para permitir filtrado de tecnología reactivo).
- **Aviso de Tiempo de Carga de Servidor (Render):** Implementamos una caja de advertencia con estética cyberpunk dentro de la terminal de credenciales (`ProjectDetail.jsx`) para advertir que las instancias gratuitas en Render se duermen por inactividad y toman hasta 50 segundos en reaccionar (cold start). Adicionalmente, agregamos un botón de fácil acceso "Iniciar Demostración en Vivo" directamente dentro del terminal de credenciales para mejorar sustancialmente la experiencia del usuario.
- **Corrección y Optimización de Desplazamiento (Scroll Offset):**
  - Incrementamos la propiedad CSS `scroll-margin-top` a `160px` en `.terminalCard` para garantizar que la terminal de credenciales quede perfectamente encuadrada bajo la barra de navegación fija tras desplazarse de forma fluida y nativa al presionar "Ver demo" en los detalles de un proyecto.
- **Sustitución Completa del Carrusel 3D por un Slider Plano Premium:**
  - Eliminamos la compleja y conflictiva física 3D cilíndrica (que causaba que el proyecto entrante se solapara de forma antiestética encima del saliente debido a limitaciones de profundidad en el Z-buffer con 5 proyectos a $72^\circ$).
  - Implementamos un slider lineal plano premium impulsado por Framer Motion, donde se muestra únicamente una tarjeta activa a la vez de forma perfectamente enfocada e impecable.
  - Desarrollamos animaciones laterales fluidas mediante `AnimatePresence`: avance con deslizamiento hacia la izquierda, retroceso hacia la derecha, y desvanecimiento central suave al alternar entre etiquetas/filtros de tecnología.
  - **Optimización y Aceleración de Desplazamiento (Ultra Snappy):** Redujimos a la mitad la duración y el desplazamiento de las animaciones en `slideVariants` (desplazamiento `x` de `160px` a `80px`, salida en `0.1s` y entrada en `0.15s` para un total de **`0.25s`**), y acortamos el bloqueo de animación a **`300ms`** para hacer el desplazamiento instantáneo y altamente reactivo.
  - Preservamos todas las características de alta gama: el resplandor ambiental adaptativo (`.ambientGlow`), gestos táctiles de swipe nativo, compatibilidad con movimiento reducido (`reducedMotion`), y la animación de flotación bobinante continua.
- **Verificación de Compilación Exitosa:** Compilación exitosa de producción certificada en 2.84s con `pnpm build`, 0 advertencias de ESLint, y chunks asíncronos distribuidos a la perfección.

### Sesión actual (1 Jun 2026)
- **Corrección de URL en vivo en el README:** Actualizamos el enlace principal de demostración en vivo (`Ver en vivo`) y el ejemplo de `VITE_SITE_URL` en `README.md` para que apunten de forma correcta al dominio real del portafolio: `https://portafolio-developer-ten.vercel.app/`.
- **Verificación de Compilación:** Ejecutamos `pnpm build` para asegurar la integridad de la compilación e inyección del dominio.

### Pendiente de tu parte
- **[Opcional]** Reemplazar `VITE_SITE_URL` en `.env` (o en la interfaz de Vercel) con un dominio personalizado propio cuando decidas comprar uno.

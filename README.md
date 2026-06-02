# Alejandro Villa — Portafolio

Portafolio personal con estética cyberpunk. Construido con React 19, Vite y Three.js.

**[→ Ver en vivo](https://tudominio.com)**

---

## Proyectos destacados

| Proyecto | Stack | Estado |
|---|---|---|
| [Vesta Retail ERP](https://tienda-vv.vercel.app) | React, Node.js, Socket.io, MySQL | 🟢 Live |
| [Repositorio Académico](https://servicio-comunitario-portafolio.vercel.app) | React, Node.js, Gemini AI, MySQL | 🟢 Live |
| [PhishShield AI](https://phishshield-kq6x.onrender.com) | Python, Flask, SQLite, VirusTotal API | 🟢 Live |
| Dashboard de Estadísticas | React, CSS Modules, Context API | 🔵 Demo |

## Stack del portafolio

- **Framework:** React 19 + Vite 8
- **Animaciones:** Framer Motion 12, Three.js (carrusel 3D)
- **Estilos:** CSS Modules + Variables CSS (tema Cyberpunk / Solarpunk)
- **Routing:** React Router v7 con code splitting (`React.lazy`)
- **Formulario:** Formspree
- **SEO:** react-helmet-async + Schema.org JSON-LD + sitemap.xml
- **Markdown:** import.meta.glob + react-markdown + remark-gfm

## Setup local

```bash
# Clonar el repositorio
git clone https://github.com/JOSS29YTS/portfolio

# Instalar dependencias (requiere pnpm)
pnpm install

# Crear archivo de entorno
cp .env.example .env
# Editar .env con tu VITE_FORMSPREE_ID

# Iniciar servidor de desarrollo
pnpm dev

# Build de producción
pnpm build
```

## Variables de entorno

```env
VITE_FORMSPREE_ID=tu_id_de_formspree
VITE_SITE_URL=https://tudominio.com
```

## Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables (Navbar, Hero, About, etc.)
│   └── ProjectMocks/   # Mocks SVG para las tarjetas de proyectos
├── data/           # Datos centralizados (projects.js, portfolioConfig.js, colorMap.js)
├── hooks/          # Custom hooks (useTheme, useTypewriter, useCountUp, useInView)
├── pages/          # Rutas (Home, ProjectDetail, Blog, BlogPost, Dashboard, NotFound)
└── utils/          # Utilidades (parseFrontmatter.js)

content/
└── blog/           # Artículos en Markdown con frontmatter YAML

public/
├── projects/       # Screenshots y videos de los proyectos
├── favicon.svg     # Favicon vectorial
├── og-image.jpg    # Open Graph image (1200×630)
├── sitemap.xml
└── robots.txt
```

## Características

- 🌙 **Modo oscuro/claro** — Paleta Cyberpunk (dark) y Solarpunk (light), persiste en localStorage
- ⚡ **Code splitting** — Three.js aislado en su propio chunk, rutas cargadas con React.lazy
- 🛡️ **ErrorBoundary** — Los componentes Three.js tienen fallback ante fallos de WebGL
- 🎨 **Customizador de acento** — Color global configurable desde /dashboard, persiste en localStorage
- 📱 **Responsive** — Mobile-first, menú hamburguesa, carrusel adaptable
- ♿ **Accesibilidad** — Skip link, focus-visible, aria-labels, prefers-reduced-motion

---

© 2026 Alejandro Villa

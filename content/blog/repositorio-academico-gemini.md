---
title: 'Repositorio Académico: Gestión Documental con Gemini AI'
date: '2025-06-10'
tags: ['React', 'Node.js', 'MySQL', 'Gemini AI']
excerpt: 'Cómo integré Google Gemini 2.0 Flash SDK para automatizar el parsing de documentos PDF académicos y construir un sistema de gestión documental con auditoría inmutable.'
---

## Repositorio Académico: Gestión Documental con Gemini AI

Desarrollé un sistema digital premium de gestión académica para el **Colegio Nuestra Señora de Fátima**, automatizando la preservación y el análisis inteligente de proyectos de investigación científica de 5to año de bachillerato.

### Arquitectura

Una SPA moderna con autenticación segura por roles (RBAC) para Directores y Docentes, módulo de auditoría de sistema inmutable, sincronización automática con Google Drive para disaster recovery, y un visualizador de PDF interactivo en tiempo real.

### Integración con Gemini AI

El componente más interesante fue la integración del **SDK de Google Gemini 2.0 Flash** para:

- **Parsing automático** de documentos PDF complejos.
- **Estructuración inteligente** de metadatos académicos.
- **Caching optimizado** mediante MySQL como capa de almacenamiento.

### Módulos del sistema

| Módulo | Descripción |
|--------|-------------|
| Dashboard | Métricas académicas con gráficos SVG reactivos |
| Proyectos | Carga, revisión y aprobación de investigaciones |
| Búsqueda | Búsqueda full-text con filtros avanzados |
| Usuarios | Gestión de roles y permisos RBAC |
| Auditoría | Logs inmutables de todas las operaciones |
| Configuración | Personalización del sistema por institución |

### Seguridad

Implementé controles de acceso basados en roles (RBAC) rígidos, un sistema inmutable de logs de auditoría para seguridad escolar, y creé visualizaciones analíticas con gráficos SVG puros para asegurar una experiencia premium y fluida sin conflictos de dependencias en React 19.

El despliegue en vivo está disponible en [Vercel](https://servicio-comunitario-portafolio.vercel.app/) y el código es open source en [GitHub](https://github.com/JOSS29YTS/servicio_comunitario_portafolio).

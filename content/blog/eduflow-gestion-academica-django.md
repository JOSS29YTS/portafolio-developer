---
title: 'EduFlow: Gestión Académica Empresarial con Django y Celery'
date: '2026-07-04'
tags: ['Django', 'Python', 'PostgreSQL', 'Docker', 'Celery']
excerpt: 'Cómo diseñé y desarrollé un sistema de gestión académica a nivel empresarial utilizando Django, optimizando la facturación y correos con Celery/Redis, y dockerizando todo el ecosistema.'
---

## EduFlow: Gestión Académica Empresarial con Django y Celery

Durante el período **Junio — Julio 2026**, desarrollé **EduFlow** como un proyecto de aprendizaje profundo e investigación para consolidar mis habilidades en el desarrollo de arquitecturas backend robustas y sistemas distribuidos de nivel empresarial.

### El Desafío Académico

La administración de diplomados, cursos y control escolar suele verse ralentizada por tareas repetitivas de alta carga computacional, como la generación de reportes y facturas en formato PDF, y la notificación masiva a estudiantes y profesores. Ejecutar estos procesos de forma síncrona en el hilo principal del servidor degrada drásticamente la experiencia del usuario.

### La Solución y Arquitectura

Diseñé un ecosistema web completo donde el servidor principal delega las tareas pesadas a trabajadores (workers) en segundo plano, garantizando respuestas instantáneas en la interfaz de usuario.

- **Servidor Web Principal:** Desarrollado en **Django 5.0**, aprovechando su robusto ORM y panel de administración nativo.
- **Cola de Mensajes y Tareas:** **Celery** coordinado con **Redis** como broker para manejar la cola de ejecución.
- **Base de Datos:** **PostgreSQL 16** para garantizar la consistencia, integridad referencial y soporte de transacciones complejas.
- **Generación Documental:** Uso de **WeasyPrint** para renderizar facturas académicas impecables en PDF directamente a partir de plantillas HTML y CSS.
- **Contenedorización:** Todo el entorno (Django, Redis, Celery workers y PostgreSQL) está orquestado con **Docker** y **Docker Compose**, lo que asegura un despliegue idéntico en desarrollo y producción.

### Módulos Implementados

1. **Control de Acceso basado en Roles (RBAC):** Permisos específicos para Administradores, Coordinadores, Profesores y Estudiantes.
2. **Control de Asistencia:** Módulo interactivo en tiempo real para que los profesores registren asistencias por clase.
3. **Cronogramas y Calendario:** Calendarios dinámicos para organizar cursos y periodos académicos.
4. **Pagos y Facturación:** Emisión automática de facturas en PDF tras registrar pagos, enviadas al correo del estudiante de forma asíncrona.

### Lecciones Aprendidas

Este proyecto me permitió dominar la orquestación de tareas en segundo plano con Celery, depurar problemas de concurrencia y bloqueos de bases de datos relacionales en PostgreSQL, y estructurar arquitecturas multi-contenedor limpias con Docker. Asimismo, experimenté con **HTMX** y **Alpine.js** en el frontend para lograr una interactividad fluida de tipo Single Page Application (SPA) sin sobrecargar el navegador del usuario con frameworks pesados de JavaScript.

El proyecto está desplegado en producción en [Render](https://eduflow-81tz.onrender.com) y su código fuente es público en [GitHub](https://github.com/JOSS29YTS/eduflow-academic-management).

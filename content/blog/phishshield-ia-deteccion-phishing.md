---
title: 'PhishShield AI: Detección de Phishing con Machine Learning'
date: '2025-10-15'
tags: ['Python', 'IA', 'Ciberseguridad']
excerpt: 'Cómo construí un sistema de detección de phishing usando Machine Learning con Flask y SQLite, capaz de analizar URLs y correos sospechosos en tiempo real.'
---

## PhishShield AI: Detección de Phishing con Machine Learning

Durante el período **Octubre — Noviembre 2025**, como parte de la materia **Ingeniería de Software** en la Universidad Santa María (USM), desarrollé **PhishShield AI**, un sistema de ciberseguridad defensiva enfocado en la detección de ataques de phishing mediante inteligencia artificial.

### Justificación

En la actualidad, los ataques de ingeniería social, especialmente el phishing, representan más del 90% de los incidentes de ciberseguridad a nivel global. La velocidad con la que se despliegan estos portales maliciosos supera la capacidad de respuesta de las listas negras tradicionales basadas en firmas estáticas.

Por este motivo, se justificó el desarrollo de una solución proactiva que combina lógica heurística léxica, integridad de certificados SSL y análisis de reputación en tiempo real. Esto permite clasificar amenazas de manera dinámica y ofrecer una explicación comprensible (IA Explicable) sobre los factores de riesgo detectados, mitigando de forma oportuna la exfiltración de credenciales corporativas o personales.

### Arquitectura del sistema

El proyecto está compuesto por dos módulos principales:

1. **Módulo de Análisis Web** — Escanea URLs y páginas web en busca de patrones de phishing.
2. **API REST** — Endpoints para integración con otras herramientas.

### Stack tecnológico

- **Python** con **Flask** para el backend.
- **SQLite** normalizado en 4FN para persistencia limpia de historial.
- Modelo de Machine Learning y lógica heurística avanzada para clasificación de amenazas.

### Datasets utilizados

- **Phishing Dataset de Kaggle** — Para el entrenamiento del modelo clasificador.
- **URL Dataset** — Para la detección de patrones léxicos maliciosos.
- **Muestra propia de correos** — Recopilación manual de ejemplos reales.

### Principales funcionalidades

- Análisis de URLs en tiempo real.
- Scoring de riesgo con pesos ajustables.
- Historial de escaneos con tendencias.
- Dashboard estadístico con gráficos SVG interactivos.

### Métricas de rendimiento

El modelo alcanzó una precisión del **94.5%** en la clasificación de phishing vs. sitios legítimos durante las pruebas de validación cruzada.

### Código fuente

El proyecto es open source y está disponible en [GitHub](https://github.com/JOSS29YTS/Detector-de-Phishing-en-URL).

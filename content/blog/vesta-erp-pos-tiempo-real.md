---
title: 'Vesta Retail ERP: Sistema POS Multitienda en Tiempo Real'
date: '2025-08-20'
tags: ['React', 'Node.js', 'MySQL', 'WebSockets']
excerpt: 'Arquitectura y desarrollo de un sistema ERP/POS multitienda con sincronización bidireccional en tiempo real usando Socket.io y MySQL.'
---

## Vesta Retail ERP: Sistema POS Multitienda en Tiempo Real

**Vesta Retail ERP** es un ecosistema empresarial de Punto de Venta (POS) robusto, diseñado para mitigar la complejidad operativa de la administración multitienda.

### El problema

Las tiendas con múltiples sucursales enfrentan problemas de consistencia de datos: el inventario se desincroniza, las ventas de diferentes terminales chocan, y los reportes financieros nunca están al día.

### La solución

Una arquitectura distribuida impulsada por **WebSockets de ultra-baja latencia** que unifica la gestión de stock global, automatiza la facturación concurrente y consolida ventas físicas de múltiples terminales.

### Stack

- **Frontend:** React 19 + CSS Modules
- **Backend:** Node.js + Express
- **Base de datos:** MySQL con Sequelize ORM
- **Tiempo real:** Socket.io

### Módulos del sistema

1. **Dashboard Global** — Métricas consolidadas de todas las sucursales
2. **POS (Punto de Venta)** — Interfaz de facturación rápida
3. **Inventario** — Gestión de stock con alertas de bajo inventario
4. **Compras** — Órdenes de compra y recepción de mercancía
5. **Clientes** — CRM integrado con historial de compras
6. **Finanzas** — Balance general, profit & loss, comisiones

### Lecciones aprendidas

Dominé el modelado avanzado de bases de datos relacionales en MySQL con Sequelize, la optimización de consultas complejas y la implementación de canales bidireccionales tolerantes a fallos usando Socket.io.

El proyecto está desplegado en [Vercel](https://tienda-vv.vercel.app/) y el código es open source en [GitHub](https://github.com/JOSS29YTS/tienda-vv).

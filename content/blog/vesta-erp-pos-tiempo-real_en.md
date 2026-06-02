---
title: 'Vesta Retail ERP: Real-Time Multi-Store POS System'
date: '2025-08-20'
tags: ['React', 'Node.js', 'MySQL', 'WebSockets']
excerpt: 'Architecture and development of a multi-store ERP/POS platform with real-time bidirectional synchronization using Socket.io and MySQL.'
---

## Vesta Retail ERP: Real-Time Multi-Store POS System

**Vesta Retail ERP** is a robust Point of Sale (POS) business ecosystem, custom-built to mitigate the operational complexity of multi-store management.

### The Problem

Stores with multiple branches often face data consistency issues: inventory gets out of sync, sales from different terminals conflict, and financial reports are rarely up to date.

### The Solution

A distributed architecture powered by **ultra-low latency WebSockets** that unifies global stock management, automates concurrent invoicing, and consolidates physical sales from multiple terminals.

### Stack

- **Frontend:** React 19 + CSS Modules
- **Backend:** Node.js + Express
- **Database:** MySQL with Sequelize ORM
- **Real-Time:** Socket.io

### System Modules

1. **Global Dashboard** — Consolidated metrics from all branches
2. **POS (Point of Sale)** — High-speed billing and invoicing interface
3. **Inventory** — Stock management with low-stock alerts
4. **Purchasing** — Purchase orders and goods receipt management
5. **Customers** — Integrated CRM with purchase histories
6. **Finances** & commissions — General balance sheets, profit & loss, sales commissions

### Lessons Learned

Mastered advanced relational database modeling in MySQL with Sequelize, optimized complex queries, and implemented fault-tolerant bidirectional channels using Socket.io.

The project is deployed on [Vercel](https://tienda-vv.vercel.app/) and the code is open source on [GitHub](https://github.com/JOSS29YTS/tienda-vv).

---
title: 'EduFlow: Enterprise Academic Management with Django and Celery'
date: '2026-07-04'
tags: ['Django', 'Python', 'PostgreSQL', 'Docker', 'Celery']
excerpt: 'How I designed and developed an enterprise-grade academic management system using Django, optimizing invoicing and emails with Celery/Redis, and containerizing the entire ecosystem.'
---

## EduFlow: Enterprise Academic Management with Django and Celery

During the **June — July 2026** period, I developed **EduFlow** as a deep learning and research project to consolidate my skills in developing robust backend architectures and enterprise-grade distributed systems.

### The Academic Challenge

Managing diplomas, courses, and school records is often slowed down by repetitive, computationally expensive tasks, such as generating reports and invoices in PDF format, and sending bulk email notifications to students and professors. Executing these processes synchronously on the server's main thread dramatically degrades the user experience.

### The Solution and Architecture

I designed a comprehensive web ecosystem where the main server delegates heavy tasks to background workers, ensuring instant responses in the user interface.

- **Main Web Server:** Developed in **Django 5.0**, leveraging its robust ORM and native administration panel.
- **Message Queue & Task Coordinator:** **Celery** coordinated with **Redis** as a broker to handle the execution queue.
- **Database:** **PostgreSQL 16** to guarantee consistency, referential integrity, and support for complex transactions.
- **Document Generation:** Used **WeasyPrint** to render flawless academic invoices in PDF format directly from HTML and CSS templates.
- **Containerization:** The entire environment (Django, Redis, Celery workers, and PostgreSQL) is orchestrated with **Docker** and **Docker Compose**, ensuring an identical setup in both development and production.

### Modules Implemented

1. **Role-Based Access Control (RBAC):** Specific permissions for Administrators, Coordinators, Professors, and Students.
2. **Attendance Control:** Real-time interactive module for professors to record attendance per class.
3. **Schedules & Calendars:** Dynamic calendars to organize courses and academic periods.
4. **Payments & Invoicing:** Automatic emission of PDF invoices after registering payments, sent asynchronously to the student's email.

### Lessons Learned

This project allowed me to master background task orchestration with Celery, debug concurrency and locking issues in PostgreSQL relational databases, and structure clean multi-container architectures with Docker. Additionally, I experimented with **HTMX** and **Alpine.js** on the frontend to achieve smooth Single Page Application (SPA) interactivity without overloading the user's browser with heavy JavaScript frameworks.

The project is deployed in production on [Render](https://eduflow-81tz.onrender.com) and its source code is public on [GitHub](https://github.com/JOSS29YTS/eduflow-academic-management).

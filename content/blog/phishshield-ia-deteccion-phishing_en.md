---
title: 'PhishShield AI: Phishing Detection with Machine Learning'
date: '2025-10-15'
tags: ['Python', 'AI', 'Cybersecurity']
excerpt: 'How I built a phishing detection system using Machine Learning with Flask and SQLite, capable of analyzing URLs and suspicious emails in real time.'
---

## PhishShield AI: Phishing Detection with Machine Learning

During the **October — November 2025** period, as part of the **Software Engineering** course at Santa Maria University (USM), I developed **PhishShield AI**, a defensive cybersecurity system focused on detecting phishing attacks using artificial intelligence.

### Justification

Today, social engineering attacks, particularly phishing, represent more than 90% of global cybersecurity incidents. The speed at which these malicious portals are deployed far outpaces the reaction time of traditional, static signature-based blacklists.

For this reason, I built a proactive solution combining lexical heuristic logic, SSL certificate integrity checks, and real-time reputation analysis. This dynamic approach classifies threats in real time and offers a clear, understandable breakdown (Explainable AI) of the detected risk factors, mitigating the exfiltration of corporate or personal credentials in a timely manner.

### System Architecture

The project consists of two main modules:

1. **Web Analysis Module** — Scans URLs and web pages looking for phishing patterns.
2. **REST API** — Endpoints for integration with external tools and services.

### Technical Stack

- **Python** with **Flask** for the backend.
- **SQLite** normalized in 4NF for clean, persistent history storage.
- A Machine Learning model paired with advanced heuristic logic for threat classification.

### Datasets Used

- **Phishing Dataset from Kaggle** — For training the threat classifier model.
- **URL Dataset** — For detecting malicious lexical patterns.
- **Custom email samples** — A hand-collected set of real-world phishing examples.

### Key Features

- Real-time URL analysis and scanning.
- Dynamic risk scoring with adjustable weights.
- Scan history with metric trends.
- Statistical dashboard with interactive SVG charts.

### Performance Metrics

The model achieved an outstanding **94.5%** accuracy rate in classifying phishing vs. legitimate sites during cross-validation testing.

### Source Code

The project is open source and available on [GitHub](https://github.com/JOSS29YTS/Detector-de-Phishing-en-URL).

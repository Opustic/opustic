---
title: Velio
description: Plateforme SaaS de veille concurrentielle automatisée
summary: Une infrastructure distribuée surveillant les modifications de sites cibles avec détection de changements par IA et alertes asynchrones orchestrées via n8n.
stack: [Nuxt, FastAPI, PostgreSQL, Redis, n8n, Scrapy, Playwright]
year: '2026'
status: in-progress
repo: https://github.com/ton-repo/velio
---

## Le Projet

**Velio** est un prototype de solution SaaS (Software as a Service) conçu pour automatiser la surveillance de sites web concurrents. L'objectif est de permettre aux équipes marketing ou stratégiques de suivre en temps réel les évolutions de leur marché (variations de prix, nouvelles offres, modifications textuelles) sans aucune action manuelle. 

L'accent a été mis sur la robustesse du backend asynchrone et l'intelligence des flux de traitement : de la capture brute de la donnée à la génération de résumés par IA jusqu'à la notification finale.

---

## Architecture Distribuée & Robustesse

Pour supporter des tâches lourdes et répétitives de scraping sans impacter la fluidité de l'interface utilisateur, la plateforme repose sur un découpage strict des services et une file d'attente asynchrone performante.

* **Frontend Réactif :** Interface moderne, chirurgicale et géométrique construite avec Nuxt et Tailwind CSS.
* **API Haute Performance :** Un cœur de services géré par FastAPI (Python), SQLModel et PostgreSQL.
* **Gestion Asynchrone :** Redis et RQ (Redis Queue) isolent et distribuent les tâches de fond (workers dédié au scraping et calcul de diffs).

::SaasDashboard
---
title: "Console de Surveillance active"
subtitle: "Aperçu de la latence des tâches et de la fréquence de capture."
---
::

---

## Le Workflow de Scraping Hybride

Le pipeline d'extraction de données a été pensé pour s'adapter à la complexité des technologies web modernes en combinant rapidité et résilience.

1. **Scrapy (Statique) :** En première intention pour des performances de lecture maximales.
2. **Playwright (Dynamique) :** Solution de repli asynchrone automatique si le site cible requiert une exécution JavaScript lourde.
3. **Analyse Diff & IA (Groq API) :** Un service interne calcule les écarts textuels avec le snapshot précédent. Si une modification est validée, l'API Groq génère un résumé synthétique ciblé pour un décideur.

::ScrapingLogs
---
target: "https://concurrent-cible.com"
---
::

---

## Orchestration & Alertes en Temps Réel

Plutôt que de surcharger le backend d'API avec des logiques d'envoi de mails ou de webhooks complexes, l'orchestration des scénarios de notification est entièrement déléguée à un serveur **n8n** autonome.

* **Webhook Interne :** En fin de cycle, le worker notifie n8n en lui transmettant la sévérité et le résumé IA du changement.
* **Flux n8n :** Scénario visuel qui traite le payload, met en forme les modèles et délivre instantanément l'alerte par email ou messagerie tierce.

::AlertSimulator
---
triggerLabel: "Simuler une modification de prix concurrent"
---
::

---

## Déploiement Micro-services

L'ensemble de l'écosystème Velio est conteneurisé de manière isolée pour garantir une portabilité totale du développement jusqu'à la production.


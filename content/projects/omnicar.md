---
title: Omnicar
description: Application d'entreprise de gestion de flotte automobile et suivi financier complet
summary: Une solution ERP sur mesure centralisant la gestion opérationnelle d'un parc auto (recettes, pannes, personnel interne) et offrant un tableau de bord analytique axé sur la rentabilité nette.
stack: [Vue.js, PrimeVue, Laravel, PostgreSQL, Docker, Traefik]
year: '2025'
status: completed
repo: https://github.com/ton-repo/omnicar
---

## Le Projet

**Omnicar** est une application de gestion de flotte automobile (ERP) hautement personnalisée, conçue pour un opérateur possédant son propre parc de véhicules et ses équipes techniques internes. L'objectif principal était de lever l'opacité sur la rentabilité réelle du business en offrant au propriétaire une visibilité chirurgicale sur ses flux financiers : comprendre précisément où l'argent entre et, surtout, où et pourquoi il est perdu.

L'application consolide toutes les dimensions opérationnelles — des recettes quotidiennes au suivi des pannes lourdes — au sein d'une interface d'administration centralisée.

---

## Centralisation Opérationnelle & Flux RH

Pour refléter la réalité du terrain, Omnicar modélise l'ensemble de l'écosystème humain et matériel qui gravite autour du parc auto :

* **Suivi des Recettes :** Un flux de travail sécurisé où les chauffeurs et contrôleurs effectuent leurs versements physiques auprès de l'administration, qui consigne instantanément les entrées via une interface dédiée.
* **Gestion du Personnel Interne :** Suivi complet des profils, rôles et salaires des chauffeurs, contrôleurs, mais aussi des équipes techniques dédiées (mécaniciens, électriciens).

::PersonnelGrid
---
roles: ['Chauffeurs', 'Contrôleurs', 'Mécaniciens', '...']
---
::

---

## Maîtrise des Pertes : Pannes & Dépenses

La rentabilité d'une flotte dépend de sa capacité à minimiser le taux d'immobilisation des véhicules. Omnicar intègre un module de traçabilité avancée des pannes et des coûts associés.

* **Diagnostic & Maintenance :** Enregistrement de chaque panne avec affectation aux techniciens internes et suivi de la résolution.
* **Comptabilité des Pièces :** Suivi rigoureux des dépenses liées aux pièces de rechange et au carburant pour identifier les véhicules les plus coûteux de la flotte.

::MaintenanceTimeline
---
status: "En cours de réparation"
cost: "145,000 XAF"
---
::

---

## Le Dashboard Financier : L'Intention Business

Conçu spécifiquement pour le profil *Superadmin* du propriétaire, le tableau de bord élague le bruit technique pour se concentrer sur les indicateurs de performance clés (KPI) indispensables à la prise de décision.

* **Vue macro des Finances :** Affichage instantané du gain brut, des pertes opérationnelles et de la rentabilité nette globale du parc.
* **Analyse Causale :** Graphiques analytiques mettant en relief les facteurs responsables des pertes (fréquence des pannes sur un modèle spécifique, dépenses anormales en pièces, baisse de versement sur une ligne).

::FinancialDashboard
---
revenue: "+4.2M XAF"
expenses: "-1.8M XAF"
netProfit: "+2.4M XAF"
---
::

---

## Infrastructure & Déploiement

Pour garantir une haute disponibilité, une isolation stricte des services et une sécurité maximale des données financières, l'application est entièrement conteneurisée et déployée sur un **VPS**. L'orchestration des flux réseaux est confiée à **Traefik**, agissant comme reverse proxy et gestionnaire automatisé des certificats SSL (Let's Encrypt).

* **Architecture Multi-Conteneurs :** Séparation étanche entre le serveur web du frontend Vue.js, l'API Laravel (PHP-FPM) et la base de données PostgreSQL.
* **Routage Dynamique :** Traefik intercepte les requêtes HTTP/HTTPS, gère le chiffrement TLS et distribue les flux vers les conteneurs respectifs sans interruption de service.

```yaml
# Extrait de la configuration de routage sous Traefik
services:
  omnicar-api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.omnicar-api.rule=Host(`api.omnicar.local`)"
      - "traefik.http.routers.omnicar-api.entrypoints=websecure"
      - "traefik.http.routers.omnicar-api.tls.certresolver=myresolver"

  omnicar-front:
    build: ./frontend
    restart: always
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.omnicar-front.rule=Host(`app.omnicar.local`)"
      - "traefik.http.routers.omnicar-front.entrypoints=websecure"
      - "traefik.http.routers.omnicar-front.tls.certresolver=myresolver"
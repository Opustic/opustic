---
title: Mindly
description: Application de quizz interactif et d'évaluation en temps réel pour l'éducation
summary: Une plateforme synchrone permettant aux enseignants de lancer des questionnaires minutés et de suivre les performances des étudiants en direct via une architecture Streamlit et Redis.
stack: [Streamlit, Python, Redis]
year: '2026'
status: completed
repo: https://github.com/ton-repo/mindly-app
---

## Le Projet

**Mindly** est une application web conçue pour dynamiser l'apprentissage et l'évaluation en milieu académique. Pensée spécifiquement pour la relation professeurs-étudiants, la plateforme permet de créer des sessions de questionnaires interactifs à forte valeur d'engagement, sans friction technique d'accès.

Grâce à une synchronisation en mémoire vive, l'enseignant garde le contrôle absolu sur le déroulement de sa session pendant que les étudiants s'affrontent amicalement sur un tableau des scores mis à jour à la milliseconde.

---

## Le Flux de Session Synchrone

La mécanique de l'application repose sur un cycle de vie de session éphémère et hautement sécurisé :

1. **Génération de Session :** Le professeur configure son questionnaire, associe un temps maximal à chaque question et ouvre la session. Un code d'accès unique à 6 caractères est instantanément généré.
2. **Rejoindre en un Clic :** Sans création de compte obligatoire, l'étudiant entre le code d'accès à 6 caractères, saisit son pseudonyme et rejoint instantanément la file d'attente.
3. **Clôture et Archivage :** Dès que le professeur ferme la session, les accès sont révoqués. Un rapport analytique complet et automatisé est alors mis à disposition de l'enseignant.

::SessionFlow
---
steps:
  - title: "Ouverture & Code"
    desc: "Création du code unique à 6 caractères via Redis."
  - title: "Connexion Élève"
    desc: "Authentification par pseudonyme et injection dans la session active."
  - title: "Analyse Post-Session"
    desc: "Clôture des accès et compilation du rapport final automatisé."
---
::

---

## Temps Réel & Performances avec Redis

Pour supporter la charge de dizaines d'étudiants répondant simultanément avec des contraintes de temps strictes, la stack a été choisie pour sa rapidité d'exécution.

* **Streamlit :** Utilisation du framework Python pour générer une interface utilisateur réactive et épurée, centrée sur la donnée.
* **Redis Data Structures :** Les connexions, les états des minuteurs par question et les réponses des utilisateurs sont stockés dans Redis pour garantir des lectures/écritures immédiates.
* **Tableau de Bord Live :** Côté professeur, la vue administrateur agrège les données en temps réel pour afficher le classement dynamique et des statistiques avancées (la question la mieux réussie, les points de blocage collectivement rencontrés).

::LiveLeaderboard
---
theme: "minimal-orange"
---
::

---

## Rapports Analytiques Automatisés

Une fois le quizz terminé, la donnée volatile de Redis est consolidée par le backend Python pour générer une vue analytique macro et micro : taux de réussite par question, vitesse moyenne de réponse et distribution des notes de la classe.

::AnalyticsPanel
---
metrics:
  - label: "Question Clé (Top Réussite)"
    value: "Architecture Réseau"
  - label: "Temps Moyen de Réponse"
    value: "4.2 secondes"
---
::
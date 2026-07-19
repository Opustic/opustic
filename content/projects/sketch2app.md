---
title: sketch2app
description: Générateur d'interfaces Nuxt UI à partir de croquis sur Canvas
summary: Une application expérimentale qui transforme des croquis dessinés à la main dans un espace de dessin interactif en code source Tailwind CSS et composants Nuxt UI grâce à des modèles d'IA de vision.
stack: [Nuxt, HTML5 Canvas, Tailwind CSS, Nuxt UI, Vision LLM, FastAPI]
year: '2026'
status: completed
repo: https://github.com/ton-repo/sketch2app
---

## Le Projet

**sketch2app** est né d'une idée simple mais radicale : éliminer la friction entre la phase de gribouillage sur papier et l'écriture du code d'interface initial. Conçue comme un outil de prototypage instantané, l'application offre un espace de dessin (Canvas) où l'utilisateur jette ses idées de mise en page. 

En un clic, la machinerie analyse le dessin et génère un composant Nuxt fonctionnel, prêt à être copié-collé dans un projet réel.

---

## Du Tracé au Code : La Mécanique Technique

Derrière la simplicité de l'interface utilisateur se cache un pipeline de traitement de données qui articule manipulation du DOM et intelligence artificielle de vision.

* **Capture Haute Fidélité :** Un composant de dessin basé sur l'API Canvas d'HTML5 capture les tracés de l'utilisateur en temps réel, gérant l'épaisseur et la complétion des formes.
* **Analyse Spatiale par Vision :** Le canvas est converti et transmis à un modèle de vision (Vision LLM) entraîné à reconnaître les structures d'interfaces (Wireframes). L'IA identifie la position, le type d'élément (bouton, champ de texte, carte) et les intentions de mise en page.
* **Génération Sémantique :** L'application compile ces données pour générer un balisage HTML propre, stylisé avec **Tailwind CSS** et exploitant les composants natifs de **Nuxt UI**.

::CanvasSimulator
---
title: "Espace Laboratoire : Expérimentez le tracé"
subtitle: "Dessinez une forme ou simulez une boîte de dialogue pour voir le code naître."
---
::

---

## Pipeline de Transformation

L'architecture isole strictement la capture de l'analyse pour garantir une latence minimale et des transitions d'interface fluides.

::TransformationFlow
---
steps:
  - stage: "01. Input"
    label: "Dessin utilisateur sur Canvas (Événements de pointeur souris/tactile)"
  - stage: "02. Ingestion"
    label: "Normalisation du canevas et envoi au backend FastAPI"
  - stage: "03. Vision IA"
    label: "Reconnaissance des boîtes englobantes (Bounding Boxes) et des types d'UI"
  - stage: "04. Output"
    label: "Rendu de l'interface générée + Bloc de code source synchronisé"
---
::

---

## Aperçu & Mode Miroir

Pour accentuer l'esthétique technique, l'application intègre une vue double permettant de juxtaposer le croquis original et le composant d'interface final, pixel pour pixel.

* **Fidélité des Proportions :** Respect des alignements et des tailles dessinées par l'utilisateur.
* **Composants Prêts pour la Production :** Le code généré utilise des structures flexibles (`flex`, `grid`) pour un rendu immédiatement adaptatif.

::OutputPreview
---
mockType: "login-form"
---
::
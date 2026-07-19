---
title: ArchivX IA
description: Microservice d'archivage intelligent et recherche sémantique 100% local
summary: Une API d'archivage hautement sécurisée isolée sous Docker, orchestrant l'extraction OCR via Stirling-PDF, la vectorisation par Ollama et l'indexation sémantique dans ChromaDB.
stack: [Docker, FastAPI, Ollama, ChromaDB, Stirling-PDF, Python]
year: '2026'
status: completed
repo: https://github.com/ton-repo/archivx-ia
---

## Le Projet

**ArchivX IA** est un microservice critique développé pour répondre à un besoin métier strict : doter une application d'archivage principale de capacités d'intelligence artificielle avancées, sans qu'aucune donnée ne quitte le serveur local du client. 

Conçue selon une architecture de microservices isolés, l'API prend en charge la réception de documents complexes, leur numérisation, leur compréhension contextuelle et leur indexation sémantique automatique.

---

## L'Architecture On-Premise (100% Local)

Le défi majeur résidait dans l'optimisation des ressources pour faire tourner des modèles de langage et d'extraction lourds sur une infrastructure locale. Tout le pipeline a été conteneurisé sous Docker pour garantir une portabilité et une isolation absolues.

* **Extraction OCR Dédiée :** Intégration de **Stirling-PDF** en conteneur pour numériser, nettoyer et extraire le texte des documents PDF (scannés ou textuels) et des images brutes.
* **Modèle de Langage Souverain :** Utilisation d'**Ollama** comme serveur LLM local pour générer les plongements lexicaux (*embeddings*) sans dépendance à des API tierces.
* **Stockage Vectoriel :** Indexation des données textuelles dans **ChromaDB**, permettant des requêtes à ultra-faible latence sur la base de la proximité conceptuelle.

::MicroserviceFlow
---
title: "Flux d'ingestion et d'analyse"
subtitle: "De l'appel API principal jusqu'à la persistance vectorielle locale."
---
::

---

## Recherche Sémantique vs Recherche Textuelle

Contrairement à une recherche par mots-clés classique, ArchivX comprend l'intention derrière la requête de l'utilisateur. Si un utilisateur cherche *"Rapport financier du premier trimestre"*, le système est capable de remonter un document contenant *"Bilan des résultats Q1"* grâce au calcul de distance vectorielle.

* **Indexation par Blocs :** Le texte extrait par l'OCR est découpé intelligemment (*chunking*) pour conserver le contexte local de chaque paragraphe.
* **Calcul de Similarité :** ChromaDB compare instantanément le vecteur de la requête avec les milliers de documents archivés.

::SemanticSearchSim
---
theme: "terminal"
placeholder: "Entrez une requête conceptuelle..."
---
::

---

## Pipeline DevOps & Performance

L'isolation en microservice permet à l'application principale de déléguer les tâches asynchrones lourdes (comme l'OCR ou le calcul d'embeddings) sans bloquer l'expérience utilisateur globale.

::LocalStackStatus
---
services:
  - name: "ArchivX Core API"
    tech: "FastAPI / Python"
    status: "active"
  - name: "OCR Engine"
    tech: "Stirling-PDF"
    status: "active"
  - name: "LLM Server"
    tech: "Ollama (Local)"
    status: "active"
  - name: "Vector Database"
    tech: "ChromaDB"
    status: "active"
---
::
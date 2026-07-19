---
title: Le Panier Sain
description: Site vitrine & Boutique e-commerce agro-pastorale avec Dashboard temps réel
summary: Une plateforme e-commerce combinant une vitrine épurée dédiée à l'agriculture durable, un tunnel d'achat instantané et un dashboard d'administration propulsé par les WebSockets.
stack: [Nuxt, Tailwind CSS, Nuxt UI, WebSockets, Docker, Traefik]
year: '2025'
status: completed
image: /images/projects/le-panier-sain.jpg
url: https://lepaniersain.cg
repo: https://github.com/ton-repo/le-panier-sain
---

::ProjectGallery
---
images:
  - src: /images/projets/lps/hero.png
    alt: "Hero section du site Le Panier Sain."
    caption: "Hero section du site Le Panier Sain."
  - src: /images/projets/lps/boutique.png
    alt: "Page de la boutique"
    caption: "Interface de navigation et de vente"
  - src: /images/projets/lps/connexion.png
    alt: "Page de connexion admin"
    caption: "Interface de connexion simplifiée"
  - src: /images/projets/lps/commandes.png
    alt: "Page de gestion des commandes"
    caption: "Interface d'administration des commandes"
---
::

## Le Projet

Commandé directement par le gérant de l'entreprise, ce projet pour **Le Panier Sain** avait un double défi : structurer une vitrine haut de gamme mettant en valeur le secteur agro-pastoral et l'agriculture durable, tout en intégrant une infrastructure e-commerce capable de convertir et de vendre très rapidement.

L'interface réussit le pari d'allier la thématique de la terre avec une rigueur géométrique absolue : aucun arrondi, des contrastes chirurgicaux et une fluidité de navigation maximale.

::ProjectLink
---
url: "https://lepaniersain.cg"
label: "Visiter la plateforme vivante"
---
::

---

## De la Terre à l'Écran : L'Expérience Client

Le parcours d'achat a été réduit au strict minimum pour maximiser la vitesse de chargement et de conversion. Les produits agro-pastoraux sont présentés comme des pièces de précision, magnifiés par des grilles carrées et des transitions dynamiques.

* **Tunnel d'achat instantané :** Ajout au panier et validation de commande fluides, sans frictions.
* **Logistique transparente :** Suivi clair des étapes de préparation des produits frais.

::InteractiveCart
---
title: "Simulateur de Panier Instantané"
subtitle: "Cliquez pour tester la réactivité et la mise à jour des totaux."
---
::

---

## Le Cœur Réactif : Dashboard Admin & WebSockets

L'envers du décor cache un tableau de bord complet dédié au gérant et à ses équipes. Pour piloter l'activité de l'entreprise agro-pastorale, l'interface affiche une vue globale et instantanée sur la santé du business.

* **Flux Temps Réel :** Intégration de WebSockets pour notifier instantanément l'administrateur lors d'une nouvelle commande ou d'un paiement validé.
* **Gestion des Stocks :** Suivi millimétré des flux de produits pour éviter toute rupture sur les denrées périssables.

::FeatureToggle
---
labelLeft: "Expérience Client (Boutique)"
labelRight: "Console Admin (Temps Réel)"
---
::

---

## Flux Logistique Connecté

Le cycle de vie d'un produit du Panier Sain respecte un flux strict, retranscrit de manière interactive dans le portfolio pour illustrer la chaîne de valeur.

::StepFlow
---
steps:
  - title: "01. Récolte & Tri"
    desc: "Sélection rigoureuse dans le secteur agro-pastoral."
  - title: "02. Commande Synchronisée"
    desc: "Notification instantanée sur le Dashboard Admin."
  - title: "03. Conditionnement"
    desc: "Préparation carrée et expédition immédiate."
---
::

---

## Infrastructure & Déploiement

Pour soutenir le trafic de la boutique et la persistance des connexions WebSockets de l'administration, la plateforme repose sur une architecture DevOps isolée et résiliente.

* **Docker & Isolation :** L'application Nuxt (Front + Back) est isolée dans son conteneur de production.
* **Traefik :** Orchestration du routage, gestion dynamique du SSL et maintien des tunnels de communication WebSockets.
* **VPS :** Déploiement autonome garantissant une indépendance totale et des performances optimales.
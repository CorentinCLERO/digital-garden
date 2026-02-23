---
title: DDD Strategic Design
tags:
  - Software Architecture
  - Domain-Driven Design
  - Strategic Design
  - Bounded Context
  - Ubiquitous Language
---

## Qu’est-ce que le Design Stratégique en DDD ?

Le **Domain-Driven Design (DDD)**, introduit par Eric Evans en 2003, propose de s’attaquer à la complexité logicielle en plaçant le **domaine métier** au centre de la conception.

Le **design stratégique** est la partie du DDD qui s’intéresse au **découpage global du système** :

- Comment définir le **domaine** et ses **sous-domaines**.
- Comment identifier des **bounded contexts** cohérents.
- Comment établir un **langage ubiquitaire** partagé entre métier et technique.
- Comment organiser la collaboration entre équipes autour de ces frontières.

Il ne s’agit pas encore de classes, d’entités ou d’agrégats, mais de **cartographier le problème** et **structurer le système** à grande échelle.

---

## Le Langage Ubiquitaire (Ubiquitous Language)

Le **langage ubiquitaire** est un vocabulaire commun :

- Utilisé par les **experts métier**, les **analystes**, les **développeurs**.
- Employé **à la fois** dans :
  - Les discussions,
  - La documentation,
  - Le **code** (noms de classes, méthodes, modules).

Objectif :

- Réduire la **traduction** permanente entre langage métier et langage technique.
- Limiter les **malentendus** et pertes d’information.
- Faire du code la **source de vérité vivante** du système.

### Comment le construire ?

1. **Ateliers de modélisation**  
   - Workshops avec experts métier et développeurs (Event Storming, story mapping, etc.).
   - On discute de cas concrets, d’événements, d’objets, de règles.

2. **Glossaire partagé**  
   - Document (ou page de knowledge base) contenant les termes, définitions, exemples.
   - Accessible et mis à jour régulièrement.

3. **Alignement avec le code**  
   - Les noms de classes reflètent les termes du glossaire : `PoliceAssurance`, `Sinistre`, `Avenant`, etc.
   - On évite de nommer les entités selon les tables (`Tbl_Policies`, `CustomerEntity`, etc.).

4. **Refactoring continu**  
   - Si le langage évolue (métiers, règles, concepts), on refactore le code pour rester aligné.

Un langage ubiquitaire cohérent dans le code est un **indicateur** de la qualité du modèle.

---

## Domaine et Sous‑Domaines

### Domaine

Le **domaine** est l’ensemble de l’activité métier couverte par le système :

- Règles de gestion,
- Processus,
- Entités métier,
- Contraintes réglementaires, etc.

C’est le **“quoi”** (problèmes à résoudre), par opposition au **“comment”** (technologies, frameworks).

### Sous-domaines

Le domaine global est souvent trop vaste pour être traité comme un bloc unique. On le découpe en **sous-domaines**, chacun avec :

- Ses objectifs propres,
- Son vocabulaire,
- Ses acteurs métier.

Eric Evans distingue 3 types de sous-domaines :

1. **Core Domain (domaine cœur)**  
   - Ce qui différencie réellement l’entreprise.
   - Source d’avantage concurrentiel.
   - Là où investir le plus en :
     - Design,
     - Qualité du modèle,
     - Talents.

2. **Supporting Subdomain**  
   - Spécifique au métier, important pour le fonctionnement,
   - Mais pas directement différenciant.
   - Doit être solide, mais sans sur‑investissement.

3. **Generic Subdomain**  
   - Composants génériques communs à de nombreuses entreprises.
   - Souvent externalisables ou couverts par des produits du marché.
   - Exemple : authentification, paiement, envoi d’e-mails.

Ce découpage sert à **orienter les investissements** :

- Core Domain : développement sur mesure, forte exigence de qualité.
- Supporting : solution propre mais pragmatique.
- Generic : produits du marché, bibliothèques, services SaaS.

---

## Bounded Contexts (Contextes Délimités)

Un **bounded context** est une frontière explicite dans laquelle :

- Un **modèle métier** est cohérent.
- Le **langage ubiquitaire** a un sens précis et non ambigu.
- Les termes ont **une signification unique** dans ce contexte.

Pourquoi en a‑t‑on besoin ?

- Dans un domaine complexe, un même mot peut avoir plusieurs sens suivant le contexte.
- Forcer un seul modèle global conduit à des compromis bancals, des objets “gros sacs”, des contradictions.

### Exemple : Assurance automobile

Domaine global : **Assurance automobile**

- Objet métier : **Véhicule**

  - Dans le **contexte “Souscription”** :
    - Véhicule = caractéristiques de risque (âge du véhicule, puissance, modèle, valeur).
    - Le langage parle de “profil de risque”.

  - Dans le **contexte “Gestion de sinistres”** :
    - Véhicule = objet physique endommagé.
    - On parle de “chocs”, “pièces de rechange”, “montant des réparations”.

Essayer d’avoir une seule classe `Vehicule` pour tous les contextes conduit à :

- Un modèle gonflé,
- Des attributs inutiles dans certains flux,
- Des règles incohérentes.

### Caractéristiques d’un Bounded Context

- **Un modèle métier propre** :
  - Entités, Value Objects, Agrégats, Services de domaine spécifiques.
- **Une équipe (ou sous‑équipe)** généralement responsable.
- **Un codebase dédié** possible (dépôt Git, module, microservice).
- **Relations explicites** avec les autres contextes :
  - APIs,
  - Messages d’événements,
  - Contrats versionnés.

Le Bounded Context est l’**unité de modularisation** de référence pour :

- Un monolithe modulaire,
- Un système de microservices,
- Ou un ensemble d’applications coopérantes.

---

## Context Mapping Patterns

Cette section documente les principaux **patterns de relation** entre Bounded Contexts.  
Elle sert de référence pour les questions sur :

- **Conformist**
- **Customer–Supplier**
- **Anti-Corruption Layer**
- **Separate Ways**

### Customer–Supplier

Dans une relation **Customer–Supplier** :

- Le contexte **Upstream** expose un modèle ou une API dont dépendent d’autres contextes.
- Le contexte **Downstream** est “client” de ce modèle.
- Contrairement à **Conformist**, il existe ici une **collaboration** :
  - Le fournisseur tient compte des besoins du client,
  - Le client peut négocier des changements,
  - La roadmap de l’Upstream prend en compte les priorités Downstream.

Implications :

- Réunions régulières entre équipes,
- Contrats de service (SLA, versions d’API),
- Coordination pour les évolutions de modèle.

Ce pattern est pertinent quand :

- Le fournisseur est central dans le système,
- Plusieurs clients dépendent de lui,
- Mais il y a une volonté de **co-conception** plutôt qu’une simple acceptation passive.

### Conformist

Dans une relation **Conformist** :

- L’équipe **Downstream** consomme le modèle de l’Upstream **tel quel**.
- Elle n’introduit **pas** de couche d’adaptation ni de traduction conceptuelle.
- Le Downstream “subit” en grande partie les choix du fournisseur.

Conséquences :

- Peu d’effort d’intégration côté client,
- Fort couplage fonctionnel au modèle de l’Upstream,
- Difficile de faire évoluer le Downstream si le modèle Upstream ne convient plus.

On utilise ce pattern quand :

- Le pouvoir de négociation du Downstream est faible,
- Le coût d’introduire un modèle propre n’est pas justifié,
- Le modèle Upstream est déjà largement accepté dans l’organisation.

---

## Anti-Corruption Layer

Le pattern **Anti-Corruption Layer (ACL)** sert à protéger un Bounded Context :

- face à un **système externe** (souvent legacy),
- ou face à un **autre contexte** dont le modèle est mal adapté ou trop “sale”.

Principe :

- Le contexte interne définit **son propre modèle propre** et son propre langage ubiquitaire.
- L’ACL joue le rôle de **traducteur** :
  - Mapping d’objets externes vers des objets internes,
  - Conversion de types, de structures, de codes métier.
- Le code du contexte interne ne voit **jamais** directement les types externes.

Bénéfices :

- Isolation de la dette technique,
- Possibilité de faire évoluer le modèle interne sans dépendre du legacy,
- Limitation des fuites conceptuelles (pas de “pollution” du modèle propre).

Coût :

- Implémentation significative (mappers, adaptateurs, façades),
- Nouvelle couche à maintenir.

On l’emploie quand :

- On intègre un ERP / CRM ancien,
- Le modèle externe est très éloigné de notre langage métier,
- Le domaine interne est **Core** ou très important.

---

## Subdomains

Cette section couvre les types de sous-domaines utilisés dans le design stratégique.

### Core Domain

Comme décrit plus haut, le **Core Domain** est la partie :

- La plus critique pour le métier,
- Qui porte l’**avantage concurrentiel**,
- Où la qualité du modèle a le plus d’impact.

### Supporting Subdomain

Un **Supporting Subdomain** :

- Est **spécifique** au métier,
- Est **nécessaire** pour faire fonctionner le système,
- Mais ne constitue **pas** l’élément de différenciation principal.

Exemple :

- Dans un e‑commerce :
  - Core Domain : moteur de recommandation, tarification dynamique.
  - Supporting Subdomain : gestion des factures, gestion des livraisons.

Stratégie :

- Design soigné mais pragmatique,
- On évite d’y investir autant que dans le Core,
- Possibilité d’y faire plus de compromis techniques.

### Generic Subdomain

Un **Generic Subdomain** :

- Correspond à une fonctionnalité **générique** et transverse,
- N’apporte **aucune valeur métier spécifique**,
- Est souvent disponible sous forme de :
  - bibliothèques,
  - frameworks,
  - services SaaS.

Exemples :

- Authentification,
- Envoi d’e-mails,
- Logging et monitoring,
- Paiement standardisé.

Stratégie :

- Éviter de réinventer la roue,
- Acheter ou réutiliser autant que possible,
- Ne pas y investir du design sophistiqué DDD.

---

## Exemple complet : Assurance automobile

### Langage Ubiquitaire

Quelques termes possibles :

- **Sinistre** : événement accidentel déclaré par l’assuré.
- **Police** : contrat d’assurance entre l’assuré et la compagnie.
- **Avenant** : modification apportée au contrat existant.
- **Assuré**, **Bénéficiaire**, **Prime**, **Franchise**, etc.

Ces mots deviennent :

- Des classes (`Sinistre`, `Police`, `Avenant`),
- Des méthodes (`declarerSinistre`, `ajouterAvenant`, `calculerPrime`),
- Des événements (`SinistreDeclare`, `AvenantAjoute`, etc.).

### Sous-domaines

- **Core Domain** : Gestion des sinistres et calcul d’indemnisation.  
- **Supporting Subdomain** : Gestion des contrats (souscription, avenants).  
- **Generic Subdomain** : Paiement, facturation (peut être délégué à un fournisseur externe).

### Bounded Contexts possibles

- **Contexte “Contrats”**  
  - Gère la création, la modification, la résiliation de police.  
  - Langage : `Police`, `Avenant`, `PriseD’effet`, `Résiliation`.

- **Contexte “Sinistres”**  
  - Gère la déclaration, l’expertise, l’indemnisation.  
  - Langage : `Sinistre`, `Expertise`, `DevisReparation`, `Indemnisation`.

- **Contexte “Paiement”** (générique ou externalisé)  
  - Gère l’encaissement des primes, le paiement des indemnités.  
  - Langage : `Transaction`, `MoyenDePaiement`, `RéférencePaiement`.

Chacun possède :

- Son modèle,
- Ses services,
- Sa base de données éventuelle,
- Ses propres invariants.

Les échanges entre contextes peuvent être matérialisés par :

- Des appels API (`Contrats` exposant un endpoint pour récupérer les garanties actives pour un sinistre),
- Des événements (`SinistreIndemnise` consommé par `Paiement`).

---

## Apports du Design Stratégique

Le Design Stratégique en DDD permet :

- De **découper le problème** en zones cohérentes alignées sur le métier.
- De **prioriser** où investir (Core vs Supporting vs Generic).
- De **réduire les couplages** entre parties du système.
- De **clarifier la communication** entre équipes grâce au langage ubiquitaire et aux bounded contexts.
- De préparer un **socle d’architecture** pour :
  - Un monolithe modulaire propre,
  - Une migration progressive vers des microservices,
  - Ou la coexistence de plusieurs applications autour du même domaine.

Il ne produit pas encore le code, mais il **structure l’espace de solution** et réduit la confusion initiale dans les grands systèmes métier.

---
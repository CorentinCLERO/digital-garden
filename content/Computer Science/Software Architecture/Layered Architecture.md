---
title: Layered Architecture
tags:
  - Software Architecture
  - Layered Architecture
  - Three Tier
  - Clean Architecture
  - Computer Science
---

## Qu’est-ce qu’une architecture en couches ?

Une **architecture en couches** (layered architecture) est une manière d’organiser le code d’une application en niveaux logiques distincts, chacun avec un rôle bien défini. Chaque couche ne connaît que la couche située juste en dessous, ce qui permet une certaine séparation des responsabilités.

Dans la pratique, ce modèle est souvent associé à l’architecture **3‑tiers** (client, serveur, base de données), mais il est important de bien distinguer :

- **Layers (couches)** : organisation **logique** du code (présentation, métier, données).
- **Tiers (n‑tiers)** : organisation **physique** du déploiement (machine cliente, serveur d’application, serveur de base de données, etc.).

Comprendre cette distinction est essentiel pour analyser les limites de ce modèle et les motivations vers DDD et l’architecture hexagonale.

---

## Layers vs Tiers

### Layers (couches logiques)

Les **couches** sont un découpage conceptuel dans le code source :

- **Couche de présentation** (UI / Presentation Layer)  
  Gère l’interface utilisateur et la transformation des interactions utilisateur en appels métier.

- **Couche métier** (Business / Application Layer)  
  Porte la logique fonctionnelle, les règles de gestion, les cas d’usage.

- **Couche d’accès aux données** (Data Access Layer)  
  S’occupe de lire/écrire dans la base de données ou d’autres systèmes de persistance.

Ce découpage existe au niveau du **code**, indépendamment de la manière dont l’application est déployée.

### Tiers (tiers physiques)

Les **tiers** sont un découpage **infrastructurel** :

1. **Client Tier**  
   - Navigateur web, application mobile, poste client.  
   - Exécute par exemple du JavaScript (React), une app native, etc.

2. **Application Server Tier**  
   - Serveur(s) hébergeant l’API REST, les services métier, les pages générées côté serveur, etc.

3. **Database Tier**  
   - Serveur(s) de base de données (SQL ou NoSQL), éventuellement répliqués.

On peut avoir plusieurs couches dans un même tier (par exemple couche présentation serveur + couche métier + couche données dans le même processus backend).

---

## Architecture 3‑tiers classique

Prenons une application métier web classique :

- Frontend : React
- Backend : API REST (Node.js, Java Spring, …)
- Base de données : PostgreSQL ou MongoDB

### Tiers

- **Tier 1 – Client**  
  - Exécution du code React dans le navigateur.  
  - La présentation côté client (UI) vit ici.

- **Tier 2 – Serveur d’application**  
  - Fichiers statiques React servis par un serveur web.  
  - API REST (Node, Spring, etc.) qui implémente la logique métier.  
  - Couche d’accès aux données (repositories, ORM).

- **Tier 3 – Base de données**  
  - Serveur PostgreSQL / MongoDB qui stocke les données persistantes.

### Couches

1. **Couche de présentation**

   - Côté client : composants React qui gèrent l’affichage et les interactions (clics, formulaires).  
   - Côté serveur : parfois des templates (par ex. SSR) ou des contrôleurs qui gèrent la traduction HTTP → appels métier.

2. **Couche métier**

   - Services applicatifs (Java, Node.js, etc.).  
   - Implémentation des cas d’usage : créer une commande, calculer un crédit, valider une transaction, etc.

3. **Couche d’accès aux données**

   - Repositories, DAOs, mappings ORM (JPA/Hibernate, Mongoose, etc.).  
   - Traduction entre objets mémoire et tables/collections.

La communication suit généralement un flux **descendant** :

- UI → Métier → Données  
Puis la réponse remonte (Données → Métier → UI).

---

## Avantages de l’architecture en couches

### Séparation des responsabilités

Chaque couche a un rôle clair :

- Présentation : interaction utilisateur.  
- Métier : règles de gestion.  
- Données : persistance.

Cela facilite la compréhension et l’organisation de l’application.

### Scalabilité et déploiement

- On peut **scaler le serveur d’application** indépendamment de la base de données.  
- On peut déployer plusieurs instances backend derrière un load balancer.  
- Le tier base de données peut être géré séparément (réplication, sharding, etc.).

### Sécurité

- Le client n’accède **jamais** directement à la base de données.  
- Toute interaction passe par la couche métier (serveur), qui applique les règles et les contrôles d’accès.

### Maintenance de base

- On peut modifier l’UI sans forcément changer la base de données, tant que les contrats de l’API restent stables.  
- On peut optimiser une requête SQL sans modifier l’UI.

---

## Limites des architectures en couches “classiques”

Ces limites apparaissent surtout quand :

- Le **domaine métier** est complexe.
- L’application vit plusieurs années, avec beaucoup d’évolutions.
- Les intégrations avec d’autres systèmes se multiplient.

### Couplage fort aux schémas de données

Dans beaucoup de projets, les modèles côté code sont directement dérivés des tables de la base :

- Une table = une entité de persistance.
- Les DTO d’entrée/sortie ressemblent fortement à ces entités.
- La couche métier manipule ces mêmes structures.

Conséquence :

- Modifier un **champ** en base de données (renommer une colonne, changer un type, introduire une table intermédiaire) oblige souvent à :
  - Modifier l’entité de persistance.
  - Adapter le repository.
  - Adapter les services métier.
  - Adapter les DTO de l’API.
  - Adapter la vue (React, etc.).

Le schéma de données devient la **source de vérité** centrale, au détriment du modèle métier conceptuel.

### Modèles anémiques et services obèses

Dans une architecture en couches mal maîtrisée :

- Les entités ne contiennent que des **données** (attributs, getters, setters).
- Toute la logique se trouve dans :
  - Des *services* massifs,
  - Des contrôleurs,
  - Des scripts SQL, triggers, procédures stockées.

On obtient des :

- **Modèles anémiques** : classes métier sans comportement significatif.  
- **Services obèses** : méthodes très longues, difficiles à tester, remplies de règles métier éparpillées.

Cela nuit :

- À la compréhension (difficile de savoir “où” vit une règle).
- À la maintenabilité (chaque changement implique de fouiller plusieurs couches).

### Testabilité limitée

Souvent, la couche métier :

- Utilise directement des entités de persistance liées à l’ORM.
- Dépend de transactions, de connexions à la base, de l’API HTTP, etc.

Conséquences :

- Les **tests unitaires de la logique métier isolée** sont rares ou difficiles.  
- Les équipes se reposent sur :
  - Des **tests d’intégration** lourds (base de données, serveur, etc.).
  - Des tests lents, fragiles, coûteux à maintenir.

Cela ralentit :

- Le feedback pour les développeurs.
- La capacité à faire du TDD.
- La fréquence des mises en production.

### Difficulté à intégrer plusieurs canaux et systèmes

Le modèle en couches a souvent été pensé pour :

- Un seul type de client (UI web ou desktop).
- Une seule forme de persistance.

Or les SI modernes nécessitent :

- UI web, mobile, API publiques, API internes, batchs, événements asynchrones (Kafka, etc.).
- Intégrations multiples avec d’autres systèmes.

Si la logique métier est mélangée :

- Aux contrôleurs HTTP,
- Aux scripts base de données,

alors :

- Ajouter un nouveau canal (par ex. un bus d’événements) devient difficile.
- Garantir une **cohérence métier** partagée entre plusieurs interfaces devient très complexe.

---

## Quand l’architecture en couches devient un frein

Dans des applications avec :

- Une **complexité métier élevée**,
- Une **forte pression de changement** (réglementaire, concurrentielle),
- De nombreuses **intégrations** (APIs, events, etc.),

l’organisation du code **autour des couches techniques et du schéma de données** devient :

- Une source de dette technique.
- Un frein à l’évolution.
- Un obstacle à une bonne communication métier‑technique.

Ce constat motive la recherche de modèles qui :

- Recentrent la conception sur le **domaine métier** (DDD).
- Inversent la dépendance pour isoler la logique métier de l’infrastructure (Hexagonal, Onion, Clean Architecture).

Ces approches ne remplacent pas totalement la notion de couches, mais la **restructurent** autour d’un principe :  
**Le domaine au centre, la technique à la périphérie.**

---
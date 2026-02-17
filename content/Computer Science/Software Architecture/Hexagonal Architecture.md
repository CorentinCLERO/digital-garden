---
title: Hexagonal Architecture
tags:
  - Software Architecture
  - Hexagonal Architecture
  - Ports and Adapters
  - Domain-Driven Design
  - Testability
---

## Qu’est-ce que l’Architecture Hexagonale ?

L’**architecture hexagonale**, ou **Ports & Adapters**, est un style d’architecture proposé par Alistair Cockburn en 2005. Son objectif est de :

- **Isoler la logique métier** (domaine) des détails techniques,
- Permettre de **tester** cette logique sans dépendre d’une base de données ou d’une UI,
- Faciliter le **remplacement** d’outils (base de données, protocoles, UI) sans modifier le cœur de l’application.

Principe fondamental :

> L’application est au centre et communique avec le monde extérieur via des **ports** abstraits, implémentés par des **adaptateurs** techniques.  
> Le domaine ne dépend jamais des technologies, ce sont les technologies qui dépendent du domaine.

[Article original d’Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture)  
[Description synthétique – Wikipédia](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))

---

## Inside vs Outside : Domaine et Infrastructure

L’architecture hexagonale distingue :

- **Inside (cœur de l’application)**  
  - Le **domaine** au sens DDD : entités, agrégats, Value Objects, services de domaine.  
  - Les **services applicatifs** (use cases) qui orchestrent le domaine.  
  - Zéro dépendance directe à une technologie (framework web, ORM, système de messages…).

- **Outside (monde extérieur)**  
  - Interfaces utilisateur (Web, mobile, CLI).
  - Bases de données (SQL, NoSQL).
  - APIs externes.
  - Bus de messages, files, systèmes de logs.
  - Tests automatisés (harness, scripts).

L’hexagone est une métaphore graphique :  
il symbolise plusieurs **faces de communication** possibles avec l’extérieur, sans imposer un nombre fixe de ports [source](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)).

---

## Ports : les Interfaces du Cœur

Les **ports** sont des **interfaces** (au sens conceptuel et souvent au sens du langage) exposées par le cœur de l’application ou attendues par lui.

On distingue deux grandes catégories :

### 1. Ports d’entrée (Driving Ports)

Ils définissent **ce que l’application propose** au monde extérieur :

- Cas d’usage,
- Commandes métier,
- Requêtes de lecture.

Exemples :

```java
public interface ServiceCommandePort {

    CommandeId passerCommande(PasserCommandeCommande commande);

    Optional<CommandeDto> consulterCommande(CommandeId id);
}
```

Remarques :

- Le port ne sait **pas** si l’appel vient d’un contrôleur REST, d’un batch, ou d’un test automatisé.
- Il exprime uniquement la **vue métier** du cas d’usage.

### 2. Ports de sortie (Driven Ports)

Ils décrivent **ce dont le domaine a besoin** pour fonctionner :

- Persister ou retrouver des agrégats,
- Publier des événements,
- Appeler des services tiers.

Exemple :

```java
public interface CommandeRepositoryPort {

    Optional<Commande> byId(CommandeId id);

    void save(Commande commande);
}
```

Ce port ne dit pas :

- S’il s’agit de PostgreSQL, MongoDB, un service externe ou un mock en mémoire.  
- Il définit seulement un **contrat métier**.

---

## Adaptateurs : la Technique au Service du Domaine

Les **adaptateurs** sont des implémentations concrètes des ports, situées **à l’extérieur de l’hexagone**.

Ils se chargent de :

- Traduire des **protocole techniques** (HTTP, SQL, Kafka, etc.) vers des **appels métier** (ports),
- Mapper des **DTO** vers des objets du domaine et inversement.

On distingue là aussi deux catégories :

### 1. Adaptateurs d’entrée (Driving Adapters)

Ils **pilotent** l’application :

- Contrôleurs HTTP/REST ou GraphQL.
- Handlers gRPC.
- Interfaces CLI.
- Schedulers (tâches planifiées).
- Tests automatisés de haut niveau.

Exemple (pseudo‑code REST) :

```java
@RestController
public class CommandeController {

    private final ServiceCommandePort serviceCommande;

    public CommandeController(ServiceCommandePort serviceCommande) {
        this.serviceCommande = serviceCommande;
    }

    @PostMapping("/commandes")
    public ResponseEntity<?> passerCommande(@RequestBody PasserCommandeRequest request) {
        PasserCommandeCommande commande = mapper.toCommande(request);
        CommandeId id = serviceCommande.passerCommande(commande);
        return ResponseEntity.created(URI.create("/commandes/" + id.value())).build();
    }
}
```

Ici :

- Le contrôleur REST est un adaptateur d’entrée.  
- Il convertit une requête HTTP en appel au **port d’entrée** `ServiceCommandePort`.

### 2. Adaptateurs de sortie (Driven Adapters)

Ils sont **pilotés** par le domaine via les ports de sortie :

- Repositories SQL/NoSQL,
- Clients HTTP vers des services tiers,
- Producteurs sur un bus de messages.

Exemple (pseudo‑code repository SQL) :

```java
@Repository
public class SqlCommandeRepositoryAdapter implements CommandeRepositoryPort {

    private final JpaCommandeRepository jpaRepository;
    private final CommandeMapper mapper;

    public SqlCommandeRepositoryAdapter(JpaCommandeRepository jpaRepository, CommandeMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public Optional<Commande> byId(CommandeId id) {
        return jpaRepository.findById(id.value())
                            .map(mapper::toDomaine);
    }

    @Override
    public void save(Commande commande) {
        CommandeEntity entity = mapper.toEntity(commande);
        jpaRepository.save(entity);
    }
}
```

Cet adaptateur :

- Est dans le **monde extérieur** (infrastructure).
- Dépend de JPA, des entités de persistance, etc.
- Implémente le **port de sortie** défini par le domaine.

---

## Inversion de Dépendance

Le principe clé est l’**inversion de dépendance** (Dependency Inversion Principle, DIP), formulé par Robert C. Martin :

1. Les modules de haut niveau ne doivent pas dépendre de modules de bas niveau. Tous deux doivent dépendre d’abstractions.  
2. Les abstractions ne doivent pas dépendre des détails. Ce sont les détails qui doivent dépendre des abstractions.

Appliqué à l’architecture hexagonale :

- Le **domaine (inside)** définit les **abstractions** (ports).  
- Les **adaptateurs (outside)** fournissent les **détails** (implémentations).

Conséquences :

- Le domaine ne dépend pas de Spring, JPA, Kafka, HTTP, etc.
- Modifier ou remplacer un adaptateur n’affecte pas le domaine :
  - Changer de base de données (PostgreSQL → MongoDB),
  - Ajouter un nouveau canal (REST → + GraphQL),
  - Remplacer un fournisseur externe.

[Voir aussi AWS Prescriptive Guidance sur l’architecture hexagonale](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/hexagonal-architecture.html)

---

## Testabilité

Un des bénéfices principaux de l’architecture hexagonale est la **testabilité accrue** :

- Les **ports de sortie** sont des interfaces faciles à remplacer par des **mocks** ou **stubs**.
- Les **services de domaine** et **use cases** peuvent être testés :
  - Sans base de données,
  - Sans serveur HTTP,
  - Sans système externe.

### Exemple : test de cas d’usage

Pseudo‑code :

```java
class ServiceCommandeTest {

    @Test
    void passer_commande_valide_cree_une_commande() {
        // given
        CommandeRepositoryPort repositoryMock = new InMemoryCommandeRepository();
        ServiceCommandePort service = new ServiceCommande(repositoryMock, ...autresPorts);

        PasserCommandeCommande commande = new PasserCommandeCommande(...);

        // when
        CommandeId id = service.passerCommande(commande);

        // then
        Optional<Commande> commandeCreee = repositoryMock.byId(id);
        assertTrue(commandeCreee.isPresent());
        // assertions sur le contenu de l'agrégat
    }
}
```

Avantages :

- Tests **rapides**, **stables**, sans environnement complexe.
- Possibilité de faire du **TDD** centré sur le métier.
- Mesure de **couverture** ciblée sur le domaine.

---

## Évolutivité et flexibilité

L’architecture hexagonale favorise l’**évolutivité** :

- **Évolution métier** :
  - Les règles métier évoluent principalement dans le domaine (inside), à l’abri des détails techniques.
  - Les impacts sont localisés, les tests rapides donnent un feedback immédiat.

- **Évolution technique** :
  - Changer de base de données → implémenter un nouvel adaptateur de sortie.
  - Ajouter un nouveau canal d’entrée (par ex. messages Kafka) → ajouter un adaptateur d’entrée.
  - Moderniser l’UI (React → autre framework) sans toucher au domaine.

Cette approche limite le **verrouillage technologique** (“technology lock‑in”) [source AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/hexagonal-architecture.html).

---

## Complémentarité avec le Domain-Driven Design

L’architecture hexagonale et le DDD sont **hautement complémentaires** :

- **DDD (tactique)** :
  - Fournit les **modèles métier** : entités, agrégats, Value Objects, services de domaine.
  - Décrit *quoi* le système fait (cœur métier).

- **Hexagonal Architecture** :
  - Fournit la **structure technique** : ports, adaptateurs, inside/outside.
  - Décrit *où* placer les éléments et comment les faire interagir.

Correspondances naturelles :

- Un **Repository DDD** = **Port de sortie** + Adaptateur de persistance.  
- Un **Use Case** (Service applicatif) = implémentation d’un **Port d’entrée**.  
- Les **Services de domaine** = logique métier pure au cœur de l’hexagone.

Sans architecture hexagonale :

- Le modèle DDD risque d’être **pollué** par des annotations techniques, des dépendances à des frameworks, des appels HTTP dans les services de domaine.

Sans DDD :

- L’architecture hexagonale risque de n’être qu’un **squelette vide**, avec un domaine anémique et une logique dispersée.

Ensemble, ils créent :

- Un cœur métier **modélisé** (DDD),
- **Protégé** des détails techniques (Hexagonale),
- **Testable**, **modulaire** et **évolutif**.

---

## Coût et limites

Comme toute architecture avancée, l’architecture hexagonale a un **coût** :

- **Complexité initiale** :
  - Plus de classes (ports, adaptateurs, DTO, mappers).
  - Besoin d’une discipline forte sur les dépendances.

- **Sur‑ingénierie possible** :
  - Inutile pour une simple application CRUD avec très peu de règles métier.
  - Demande un certain **niveau de maturité** des équipes.

Elle est particulièrement adaptée :

- Aux **systèmes métiers complexes**,
- Aux applications **longue durée de vie**,
- Aux contextes où la **testabilité** et la **capacité à changer de technologies** sont critiques.

---

## Résumé

- L’architecture hexagonale place le **domaine au centre** et la technique à la périphérie.
- Les **ports** sont les contrats métiers ; les **adaptateurs** sont les implémentations techniques.
- L’**inversion de dépendance** garantit que le métier ne dépend pas des frameworks.
- Elle améliore :
  - La **modularité**,
  - La **testabilité**,
  - L’**évolutivité** technique.
- Combinée au DDD, elle permet de structurer des applications métiers robustes dans un contexte industriel exigeant.

---
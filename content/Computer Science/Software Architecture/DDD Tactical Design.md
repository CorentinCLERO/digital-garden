---
title: DDD Tactical Design
tags:
  - Software Architecture
  - Domain-Driven Design
  - Tactical Design
  - Entities
  - Aggregates
---

## Qu’est-ce que le Design Tactique en DDD ?

Le **design tactique** en Domain-Driven Design concerne la **modélisation détaillée** du domaine **à l’intérieur d’un bounded context**.

Il répond à la question : **comment représenter les concepts métier dans le code ?**

Les principaux patterns tactiques sont :

- **Entités (Entities)**
- **Value Objects**
- **Agrégats (Aggregates)**
- **Services de domaine (Domain Services)**
- **Repositories** (abstractions de persistance, souvent traités avec l’architecture hexagonale)

Ces éléments permettent de construire un modèle métier **expressif**, **cohérent**, et **testable**.

---

## Entités (Entities)

### Définition

Une **entité** est un objet métier :

- Défini principalement par son **identité** (ID unique),  
- Dont l’**état évolue** dans le temps,
- Qui possède des **invariants** et de la **logique métier**.

Deux entités sont différentes même si tous leurs attributs sont identiques, si leurs identités diffèrent.

Exemples typiques :

- `CompteBancaire`
- `Client`
- `Commande`
- `ContratAssurance`

### Caractéristiques

- **Identité stable**  
  - ID technique (UUID, identifiant base) ou ID métier (numéro de contrat).
- **Cycle de vie**  
  - Création, modification, archivage, suppression logique, etc.
- **Logique métier** à l’intérieur  
  - Méthodes qui assurent le respect des invariants.

### Exemple (pseudo‑code orienté objet)

```java
public class CompteBancaire {

    private final String numeroCompte;
    private BigDecimal solde;

    public CompteBancaire(String numeroCompte, BigDecimal soldeInitial) {
        if (soldeInitial.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Solde initial négatif interdit");
        }
        this.numeroCompte = numeroCompte;
        this.solde = soldeInitial;
    }

    public void crediter(BigDecimal montant) {
        if (montant.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Montant à créditer doit être positif");
        }
        this.solde = this.solde.add(montant);
    }

    public void debiter(BigDecimal montant) {
        if (montant.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Montant à débiter doit être positif");
        }
        if (this.solde.compareTo(montant) < 0) {
            throw new IllegalStateException("Solde insuffisant");
        }
        this.solde = this.solde.subtract(montant);
    }

    public BigDecimal getSolde() {
        return solde;
    }

    public String getNumeroCompte() {
        return numeroCompte;
    }
}
```

Ici, les **règles métier** (pas de solde négatif, montants positifs) sont **dans l’entité elle‑même**, pas dans un service externe.

---

## Value Objects

### Définition

Un **Value Object** est un objet sans identité propre :

- Défini uniquement par ses **valeurs internes**.
- Naturellement **immutable** (on crée un nouvel objet pour tout changement).
- Interchangeable : deux Value Objects avec les mêmes attributs sont équivalents.

Exemples :

- `Adresse` (rue, code postal, ville, pays)
- `Email`
- `Montant` (valeur + devise)
- `Période` (date début, date fin)

### Avantages

- Remplace l’usage de **types primitifs** peu expressifs (`String`, `BigDecimal`, etc.) par des types métier (`Email`, `Montant`).
- Centralise les **règles de validation** et d’invariants.
- Rend le code plus **lisible** et **sûr**.

### Exemple : Email

```java
public class Email {

    private final String valeur;

    public Email(String valeur) {
        if (valeur == null || !valeur.matches("^[^@]+@[^@]+\\.[^@]+$")) {
            throw new IllegalArgumentException("Email invalide : " + valeur);
        }
        this.valeur = valeur;
    }

    public String getValeur() {
        return valeur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Email)) return false;
        Email email = (Email) o;
        return valeur.equalsIgnoreCase(email.valeur);
    }

    @Override
    public int hashCode() {
        return valeur.toLowerCase().hashCode();
    }

    @Override
    public String toString() {
        return valeur;
    }
}
```

Utilisation :

```java
Email emailClient = new Email("client@example.com");
```

On ne manipule plus un simple `String` mais un concept métier robuste.

---

## Agrégats (Aggregates)

### Définition

Un **agrégat** est un ensemble cohérent :

- D’une ou plusieurs **entités**,
- De **Value Objects**,
- Formant une **unité de cohérence transactionnelle**.

Il possède une **racine d’agrégat (aggregate root)** :

- Seule entité accessible directement de l’extérieur,
- Responsable de garantir les **invariants métier** de l’agrégat.

### Rôle

- Garantir qu’après chaque opération, l’agrégat est dans un **état valide**.
- Définir la **granularité** des transactions :  
  une transaction ne doit pas modifier plus d’un agrégat (dans l’idéal).

### Exemple : Commande

Agrégat possible :

- Racine : `Commande`
- Entité interne : `LigneDeCommande`
- Value Objects : `ProduitId`, `Quantite`, `PrixUnitaire`, `Montant`

```java
public class Commande {

    private final CommandeId id;
    private final ClientId clientId;
    private final List<LigneDeCommande> lignes;
    private StatutCommande statut;

    public Commande(CommandeId id, ClientId clientId) {
        this.id = id;
        this.clientId = clientId;
        this.lignes = new ArrayList<>();
        this.statut = StatutCommande.BROUILLON;
    }

    public void ajouterLigne(ProduitId produitId, Quantite quantite, PrixUnitaire prix) {
        if (!statut.estModifiable()) {
            throw new IllegalStateException("Commande non modifiable");
        }
        lignes.add(new LigneDeCommande(produitId, quantite, prix));
    }

    public void valider() {
        if (lignes.isEmpty()) {
            throw new IllegalStateException("Impossible de valider une commande vide");
        }
        this.statut = StatutCommande.VALIDEE;
    }

    public Montant total() {
        return lignes.stream()
            .map(LigneDeCommande::montantLigne)
            .reduce(Montant.zero(), Montant::plus);
    }

    // getters (sans exposer la liste mutable directement)
}
```

`Commande` :

- Est la **seule** porte d’entrée pour modifier les `LigneDeCommande`.
- Garantit que la commande ne peut pas être validée si elle est vide.
- Centralise la logique liée à cet agrégat.

### Bonnes pratiques pour les agrégats

- Les garder **petits** :
  - Limiter le nombre d’entités internes.
  - Un agrégat trop gros → problèmes de performance, contention de verrous.
- Ne pas imbriquer d’autres agrégats :
  - Les références à d’autres agrégats se font par **identifiant**, pas par agrégation directe.
- Les invariants qui concernent plusieurs agrégats sont gérés par :
  - **Services de domaine**,
  - **Événements de domaine**,
  - **Transactions compensatoires**.

---

## Services de Domaine (Domain Services)

### Définition

Un **service de domaine** est une opération de **logique métier** :

- Qui ne “colle” naturellement à aucune entité ou agrégat unique,
- Qui opère souvent sur **plusieurs agrégats**,
- Qui est **sans état** (stateless).

Il :

- Utilise les entités, agrégats et Value Objects,
- Parle le **langage ubiquitaire**,
- Ne dépend pas de l’infrastructure (pas d’API HTTP, pas d’accès direct BD).

### Exemples de critères d’utilisation

On crée un service de domaine lorsque :

- Une règle **combine plusieurs agrégats** (ex : calcul d’un plafond global).
- La logique serait artificiellement forcée dans une entité donnée.
- La logique dépend de données externes non propres à un individu (ex : taux de change, barème réglementaire).

### Exemple : Calcul de taux d’endettement

```java
public class CalculateurTauxEndettement {

    public Taux calculer(Client client, Revenus revenus, Charges charges) {
        Montant chargesTotales = charges.totalMensuel();
        Montant revenusTotaux = revenus.totalMensuel();

        if (revenusTotaux.estZero()) {
            throw new IllegalArgumentException("Revenus nuls, taux non calculable");
        }

        BigDecimal ratio = chargesTotales.valeur()
            .divide(revenusTotaux.valeur(), RoundingMode.HALF_UP);

        return new Taux(ratio);
    }
}
```

Ce service :

- N’a pas besoin d’être une entité.
- Utilise plusieurs objets (Client, Revenus, Charges).
- Peut être testé **indépendamment**.

---

## Repositories (abstraction de persistance)

Bien que souvent rapprochés de l’architecture hexagonale, les **repositories** sont définis dans le DDD comme **interfaces du domaine** représentant des collections d’agrégats.

- Le domaine exprime : “j’ai besoin de stocker et retrouver des `Commande`”.
- Le **repository** définit les opérations nécessaires (`save`, `findById`, …).
- L’implémentation concrète (SQL, NoSQL, API externe) est déléguée à l’infrastructure.

Exemple d’interface :

```java
public interface CommandeRepository {

    Optional<Commande> byId(CommandeId id);

    void save(Commande commande);
}
```

Dans une architecture hexagonale, ce repository correspond naturellement à un **port de sortie**.

---

## Objectif global du Design Tactique

Le design tactique vise à :

- Construire un **modèle riche**, centré sur le domaine,
- Localiser les **règles métier** au bon endroit :
  - Entités & agrégats pour les invariants de structure,
  - Value Objects pour les règles de validation et les types métiers,
  - Services de domaine pour la logique transversale.

Résultats attendus :

- **Code expressif** : les noms, signatures et structures “racontent” le domaine.
- **Protection des invariants** : impossible de mettre l’agrégat dans un état invalide sans contourner l’API.
- **Testabilité** : les règles peuvent être testées en mémoire, sans base de données.
- **Évolutivité** : ajouter/modifier une règle métier devient localisé et plus sûr.

Ce modèle tactique trouve sa pleine puissance lorsqu’il est combiné avec une **architecture hexagonale**, qui l’isole des détails techniques (frameworks, BD, API) et le place réellement **au centre** de l’application.

---
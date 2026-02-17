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
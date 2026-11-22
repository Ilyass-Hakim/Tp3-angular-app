# Inset — Gestion de catalogue produits

![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![Java](https://img.shields.io/badge/Java-25-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.3-6DB33F?logo=springboot&logoColor=white)

Application web de **gestion de catalogue produits**. Elle se compose d'un front-end **Angular** (composants standalone) et d'une API REST **Spring Boot**.

Elle permet de consulter, d'ajouter, de rechercher et de supprimer des produits, ainsi que de basculer leur statut de sélection, le tout avec une interface responsive.

---

## Fonctionnalités

- **Catalogue** : liste des produits, avec leur prix et leur statut.
- **Ajout** : formulaire réactif, avec validation des champs.
- **Sélection** : un clic sur le badge de statut bascule le produit entre sélectionné et non sélectionné. Le changement est enregistré côté serveur.
- **Suppression** : avec demande de confirmation.
- **Recherche** : filtrage instantané par nom, pendant la saisie.

---

## Architecture

```mermaid
flowchart LR
    U(["Navigateur"]) --> NG["Front-end Angular<br/>inset-app<br/>:4200"]
    NG -->|"HTTP / JSON<br/>(CORS)"| API["API REST Spring Boot<br/>products-backend<br/>:8083"]
    API --> DB[("H2<br/>products-db")]
```

Le front-end et l'API tournent sur deux origines différentes (ports `4200` et `8083`). L'API autorise donc explicitement les requêtes inter-domaines, avec `@CrossOrigin`.

### Front-end

```mermaid
flowchart TB
    APP["AppComponent<br/>barre de navigation + router-outlet"]
    APP -->|"/home"| HOME["HomeComponent"]
    APP -->|"/products"| PROD["ProductsComponent<br/>liste, recherche, sélection, suppression"]
    APP -->|"/new-product"| NEW["NewProductComponent<br/>formulaire d'ajout"]
    PROD --> SVC["ProductService"]
    NEW --> SVC
    SVC -->|"HttpClient<br/>Observables RxJS"| API["API :8083"]
```

- **Composants standalone** : aucun `NgModule`. Chaque composant déclare lui-même ses dépendances.
- **`ProductService`** : il centralise tous les appels HTTP et il est injecté dans les composants.
- **Templates** : ils utilisent les blocs de contrôle de flux `@if`, `@for` et `@empty`.

---

## Modèle de données

```mermaid
classDiagram
    class Product {
        Long id
        String name
        double price
        boolean selected
    }
```

---

## API REST

URL de base : `http://localhost:8083`

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/products` | Liste des produits |
| `GET` | `/products/{id}` | Détail d'un produit |
| `POST` | `/products` | Création d'un produit |
| `PATCH` | `/products/{id}` | Mise à jour du statut `selected` |
| `DELETE` | `/products/{id}` | Suppression d'un produit |

Exemple de produit :

```json
{ "id": 1, "name": "Ordinateur Portable", "price": 1300.0, "selected": true }
```

**Exemple de flux : basculer le statut d'un produit**

```mermaid
sequenceDiagram
    participant UI as ProductsComponent
    participant S as ProductService
    participant API as API :8083
    participant DB as H2

    UI->>S: checkProduct(p)
    S->>API: PATCH /products/{id} { selected: !p.selected }
    API->>DB: mise à jour
    DB-->>API: produit modifié
    API-->>S: Product (JSON)
    S-->>UI: Observable
    UI->>UI: mise à jour du badge
```

---

## Stack technique

| Couche | Technologies |
|---|---|
| Front-end | Angular 22, TypeScript, RxJS, Reactive Forms, Bootstrap 5, Bootstrap Icons |
| Back-end | Java 25, Spring Boot 4, Spring Web MVC, Spring Data JPA, Lombok |
| Base de données | H2 (en mémoire) |
| Build | npm, Maven |

---

## Démarrage

### Prérequis

- Node.js 22.22.3+ ou 24.15+
- JDK 25
- Maven 3.9+ (ou un IDE comme IntelliJ IDEA)

### 1. Lancer l'API

```bash
cd products-backend
mvn spring-boot:run
```

L'API est alors disponible sur http://localhost:8083/products. Au démarrage, elle crée trois produits de démonstration.

### 2. Lancer le front-end

```bash
cd inset-app
npm install
npm start
```

L'application est alors disponible sur **http://localhost:4200**.

> La base H2 est en mémoire : les données reviennent à leur état initial à chaque redémarrage de l'API.

---

## Structure du projet

```text
.
├── inset-app/                     # Front-end Angular
│   └── src/app/
│       ├── home/                  # Page d'accueil
│       ├── products/              # Catalogue : liste, recherche, sélection, suppression
│       ├── new-product/           # Formulaire d'ajout
│       ├── services/              # ProductService (appels HTTP)
│       ├── app.routes.ts          # Routes
│       └── app.config.ts          # Configuration (router, HttpClient)
└── products-backend/              # API REST Spring Boot
    └── src/main/java/hakim/ma/productsbackend/
        ├── entities/              # Product
        ├── repository/            # ProductRepository
        └── web/                   # ProductRestController
```

---

## Auteur

**Ilyass Hakim** · [GitHub](https://github.com/Ilyass-Hakim)

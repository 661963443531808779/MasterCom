# MasterCom - Système de Gestion Complet

## 🚀 Description

MasterCom est un système de gestion complet qui permet de gérer vos clients, factures, devis, tickets de support et analytics avec une intégration Power BI avancée.

## ✨ Fonctionnalités

### 🔐 Authentification & Gestion des Utilisateurs
- Système d'authentification sécurisé avec JWT
- Gestion des rôles (Admin, Client)
- Inscription et connexion des utilisateurs
- Gestion des profils utilisateurs

### 👥 Gestion des Clients
- Création et gestion des clients
- Suivi des prospects et clients actifs
- Informations détaillées (contact, adresse, région)
- Système de notation des clients
- Filtrage et recherche avancée

### 💰 Facturation & Devis
- Création et gestion des factures
- Système de devis avec validation
- Calcul automatique de la TVA
- Suivi des paiements
- Statuts des documents (brouillon, envoyé, payé, en retard)

### 🎫 Support Client
- Système de tickets de support
- Gestion des priorités (faible, moyenne, élevée, urgente)
- Assignation des tickets
- Suivi des statuts (ouvert, en cours, résolu, fermé)
- Communication intégrée

### 📊 Analytics & Power BI
- Tableau de bord analytique complet
- Statistiques en temps réel
- Visualisations avancées (graphiques, camemberts, barres)
- Export des données pour Power BI
- Métriques de performance

### 🗄️ Base de Données
- Base de données SQLite intégrée
- Schéma optimisé pour les performances
- Sauvegarde automatique des données
- Relations entre les entités

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **React Router** pour la navigation
- **Recharts** pour les graphiques
- **Lucide React** pour les icônes
- **Supabase** pour l'authentification et la base de données

### Backend
- **Supabase** (Base de données PostgreSQL + Auth + API)
- **Node.js** avec Express.js (optionnel)
- **Row Level Security (RLS)** pour la sécurité des données
- **JWT** pour l'authentification
- **CORS** pour la gestion des requêtes cross-origin

### Base de Données
- **PostgreSQL** via Supabase
- **Schéma complet** avec 3 niveaux de rôles
- **Politiques de sécurité** intégrées
- **Vues optimisées** pour les analytics

## 🚀 Installation & Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

#### Option 1 : Avec Supabase (Recommandé)
```bash
# Cloner le projet
git clone <repository-url>
cd MasterCom

# Installer les dépendances
npm install

# Configurer Supabase
cp supabase-config.env .env
# Modifier .env avec vos clés Supabase

# Exécuter le schéma SQL dans Supabase
# Voir SUPABASE-SETUP.md pour les détails

# Démarrer le projet
npm start
```

#### Option 2 : Avec SQLite (Legacy)
```bash
# Cloner le projet
git clone <repository-url>
cd MasterCom

# Installer les dépendances
npm install

# Démarrer le projet (backend + frontend)
npm start
```

### Accès
- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3001
- **Documentation API** : http://localhost:3001/api/test

## 👤 Système de Rôles

### Compte Master
- **Email** : master@mastercom.fr
- **Mot de passe** : MasterCom2024!
- **Accès** : Toutes les fonctionnalités + Gestion des utilisateurs
- **Peut créer** : Comptes commerciaux et clients

### Compte Commercial
- **Création** : Par un compte Master
- **Accès** : Gestion des clients, factures, devis, tickets
- **Peut créer** : Clients, factures, devis, tickets

### Compte Client
- **Création** : Auto-inscription via le site
- **Accès** : Consultation de ses propres données
- **Peut créer** : Tickets de support

## 📊 Intégration Power BI

### Configuration
1. Ouvrez Power BI Desktop
2. Connectez-vous à l'API : `http://localhost:3001/api/powerbi/data`
3. Utilisez le token d'authentification
4. Suivez le guide détaillé dans `README-PowerBI.md`

### Données Disponibles
- Utilisateurs et leurs régions
- Clients et prospects
- Factures et chiffre d'affaires
- Devis et taux de conversion
- Tickets de support et résolution

## 🗂️ Structure du Projet

```
MasterCom/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── ClientManager.tsx
│   │   ├── InvoiceManager.tsx
│   │   ├── QuoteManager.tsx
│   │   ├── SupportTicketManager.tsx
│   │   └── AnalyticsDashboard.tsx
│   ├── contexts/           # Contextes React
│   │   └── AuthContext.tsx
│   ├── pages/              # Pages de l'application
│   │   ├── CRM.tsx
│   │   ├── Dashboard.tsx
│   │   └── Login.tsx
│   ├── services/           # Services API
│   │   └── api.ts
│   └── App.tsx
├── server.js               # Serveur Express
├── powerbi-config.json     # Configuration Power BI
└── README-PowerBI.md       # Guide Power BI
```

## 🔧 Scripts Disponibles

```bash
# Démarrage complet
npm start           # Backend + Frontend simultanément

# Démarrage séparé
npm run backend     # Backend uniquement (port 3001)
npm run frontend    # Frontend uniquement (port 5173)

# Production
npm run build       # Build du frontend
npm run server      # Serveur de production

# Utilitaires
npm run lint        # Linting du code
```

## 📈 Fonctionnalités Avancées

### Gestion des Régions
- Suivi des utilisateurs et clients par région
- Statistiques géographiques
- Export des données régionales

### Système de Notifications
- Notifications en temps réel
- Alertes pour les factures en retard
- Rappels pour les tickets urgents

### Export de Données
- Export JSON pour Power BI
- Export CSV des factures
- Rapports personnalisés

## 🔒 Sécurité

- Authentification JWT sécurisée
- Hachage des mots de passe avec bcrypt
- Validation des données côté serveur
- Protection CORS configurée
- Headers de sécurité avec Helmet

## 📝 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Clients
- `GET /api/clients` - Liste des clients
- `POST /api/clients` - Créer un client
- `PUT /api/clients/:id` - Modifier un client
- `DELETE /api/clients/:id` - Supprimer un client

### Factures
- `GET /api/invoices` - Liste des factures
- `POST /api/invoices` - Créer une facture
- `PUT /api/invoices/:id` - Modifier une facture
- `DELETE /api/invoices/:id` - Supprimer une facture

### Devis
- `GET /api/quotes` - Liste des devis
- `POST /api/quotes` - Créer un devis
- `PUT /api/quotes/:id` - Modifier un devis
- `DELETE /api/quotes/:id` - Supprimer un devis

### Support
- `GET /api/support-tickets` - Liste des tickets
- `POST /api/support-tickets` - Créer un ticket
- `PUT /api/support-tickets/:id` - Modifier un ticket
- `DELETE /api/support-tickets/:id` - Supprimer un ticket

### Analytics
- `GET /api/analytics` - Statistiques (Admin uniquement)
- `GET /api/powerbi/data` - Données Power BI (Admin uniquement)

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Créez une issue sur GitHub
- Contactez l'équipe de développement
- Consultez la documentation Power BI

---

**MasterCom** - Votre solution complète de gestion d'entreprise 🚀

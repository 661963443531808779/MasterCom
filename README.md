# 🚀 MasterCom - Agence de Communication Professionnelle

## 📋 Vue d'ensemble

MasterCom est une plateforme complète d'agence de communication avec CRM intégré, dashboard analytique, et système d'authentification avancé. Construit avec React, TypeScript, Supabase et Tailwind CSS.

## ✨ Fonctionnalités Principales

### 🏠 Site Vitrine
- **Page d'accueil** - Design professionnel avec animations
- **À propos** - Présentation de l'équipe et des valeurs
- **Services** - Tous les services de communication détaillés
- **Portfolio** - Galerie de réalisations avec filtres
- **Blog** - Articles avec recherche et catégories
- **Contact** - Formulaire complet avec géolocalisation

### 🔐 Authentification & Sécurité
- **Login sécurisé** avec Supabase Auth
- **Gestion des rôles** (Admin, Client, Utilisateur)
- **Sessions persistantes** et auto-refresh
- **Protection XSS/CSRF** avec hooks de sécurité
- **Routes protégées** avec contrôles d'accès

### 📊 Dashboard Analytique
- **Vue d'ensemble** avec KPIs en temps réel
- **Graphiques interactifs** (Recharts)
- **Métriques de performance** et engagement
- **Analytics avancées** avec tracking personnalisé
- **Gestion utilisateurs** et paramètres

### 👥 CRM Complet
- **Gestion Clients** - CRUD avec recherche/filtres
- **Factures** - Création, suivi, statuts
- **Devis** - Gestion des propositions commerciales
- **Support** - Tickets client avec priorité
- **Projets** - Suivi des réalisations et budgets

### 🎨 Interface Avancée
- **Thèmes dynamiques** (Clair/Sombre/Auto)
- **Schémas de couleurs** personnalisables
- **Recherche globale** (Ctrl+K)
- **Notifications en temps réel**
- **Design responsive** mobile-first

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **React Router DOM** - Navigation
- **Recharts** - Graphiques
- **Lucide React** - Icônes

### Backend & Services
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Base de données
- **Row Level Security** - Sécurité des données
- **Real-time** - Mises à jour en temps réel

### Outils & Performance
- **Vite** - Build tool rapide
- **ESLint** - Linting
- **Prettier** - Formatage
- **Performance Monitoring** - Optimisations

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Supabase

### Installation
```bash
# Cloner le repository
git clone https://github.com/votre-repo/mastercom.git
cd mastercom

# Installer les dépendances
npm install

# Configuration Supabase
cp .env.example .env.local
# Éditer .env.local avec vos clés Supabase
```

### Variables d'environnement
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_TIMEOUT=5000
VITE_RETRY_ATTEMPTS=3
VITE_CACHE_DURATION=60000
```

### Démarrage
```bash
# Développement
npm run dev

# Build de production
npm run build

# Preview
npm run preview
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── CRM.tsx         # Interface CRM principale
│   ├── Dashboard.tsx   # Dashboard analytique
│   ├── Navbar.tsx      # Navigation
│   ├── Footer.tsx      # Pied de page
│   └── ...
├── pages/              # Pages de l'application
│   ├── Home.tsx        # Page d'accueil
│   ├── About.tsx       # À propos
│   ├── Services.tsx    # Services
│   ├── Contact.tsx     # Contact
│   └── ...
├── hooks/              # Hooks personnalisés
│   ├── useApiData.ts   # Gestion des données API
│   ├── useSecureForm.ts # Formulaires sécurisés
│   ├── useNotifications.ts # Système de notifications
│   ├── useTheme.ts     # Gestion des thèmes
│   └── useSearch.ts    # Recherche globale
├── services/           # Services externes
│   └── supabase.ts     # Configuration Supabase
├── utils/              # Utilitaires
│   ├── security.ts     # Fonctions de sécurité
│   ├── analytics.ts    # Système d'analytics
│   └── performance.ts  # Optimisations
└── contexts/           # Contextes React
    └── AuthContext.tsx # Contexte d'authentification
```

## 🔧 Configuration Supabase

### Tables nécessaires
```sql
-- Profils utilisateurs
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role_id TEXT DEFAULT 'client',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  country TEXT DEFAULT 'France'
);

-- Rôles
CREATE TABLE roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '{"all": false}'
);

-- Clients
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  status TEXT DEFAULT 'prospect',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projets
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  client_id UUID REFERENCES clients(id),
  status TEXT DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  budget DECIMAL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Factures
CREATE TABLE invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  project_id UUID REFERENCES projects(id),
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Devis
CREATE TABLE quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  project_id UUID REFERENCES projects(id),
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  valid_until DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tickets de support
CREATE TABLE support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Politiques RLS
```sql
-- Activer RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Politiques pour user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Politiques pour clients
CREATE POLICY "Authenticated users can view clients" ON clients
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert clients" ON clients
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Politiques similaires pour les autres tables...
```

## 🎨 Personnalisation

### Thèmes
Le système de thèmes permet de personnaliser :
- **Mode** : Clair, Sombre, Automatique
- **Couleurs** : Bleu, Violet, Vert, Orange, Rouge
- **Taille de police** : Petit, Moyen, Grand
- **Animations** : Activées/Désactivées

### Recherche Globale
- **Raccourci** : `Ctrl+K` ou `Cmd+K`
- **Recherche** : Pages, composants, clients, projets
- **Filtres** : Par type, statut, industrie
- **Suggestions** : Auto-complétion intelligente

### Notifications
- **Types** : Succès, Erreur, Avertissement, Info
- **Persistance** : Notifications importantes
- **Actions** : Boutons d'action personnalisés
- **Système** : Notifications navigateur

## 📊 Analytics & Monitoring

### Métriques Trackées
- **Engagement** : Temps de session, pages vues
- **Performance** : Temps de chargement, erreurs
- **Business** : Connexions, actions utilisateur
- **Erreurs** : JavaScript, API, réseau

### Dashboard Analytics
- **KPIs** : Clients, projets, revenus
- **Graphiques** : Évolution, répartition
- **Temps réel** : Activité récente
- **Export** : Données en CSV/PDF

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod

# Variables d'environnement
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### Netlify
```bash
# Build
npm run build

# Déployer le dossier dist/
# Configurer les variables d'environnement
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔒 Sécurité

### Bonnes Pratiques Implémentées
- **Authentification** : JWT avec refresh automatique
- **Autorisation** : RLS sur toutes les tables
- **Validation** : Sanitisation des entrées
- **HTTPS** : Forcé en production
- **CORS** : Configuration sécurisée
- **Headers** : Sécurité renforcée

### Protection des Données
- **Chiffrement** : Données sensibles
- **Anonymisation** : Analytics respectueuses
- **RGPD** : Conformité européenne
- **Audit** : Logs de sécurité

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests d'intégration
npm run test:integration

# Coverage
npm run test:coverage

# E2E
npm run test:e2e
```

## 📈 Performance

### Optimisations Implémentées
- **Code Splitting** : Chargement à la demande
- **Lazy Loading** : Composants et images
- **Caching** : API et assets
- **Compression** : Gzip/Brotli
- **CDN** : Assets statiques
- **Service Worker** : Cache offline

### Métriques Cibles
- **LCP** : < 2.5s
- **FID** : < 100ms
- **CLS** : < 0.1
- **TTFB** : < 600ms
- **Bundle Size** : < 500KB

## 🤝 Contribution

### Workflow
1. Fork le repository
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Créer une Pull Request

### Standards
- **Code** : ESLint + Prettier
- **Commits** : Conventional Commits
- **Tests** : Coverage > 80%
- **Docs** : JSDoc pour les fonctions

## 📞 Support

### Documentation
- **Wiki** : Guide complet
- **API Docs** : Endpoints Supabase
- **Changelog** : Historique des versions
- **FAQ** : Questions fréquentes

### Contact
- **Email** : support@mastercom.fr
- **Discord** : Serveur communautaire
- **GitHub** : Issues et discussions
- **Documentation** : Wiki détaillée

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- **Supabase** - Backend-as-a-Service
- **Tailwind CSS** - Framework CSS
- **React** - Framework UI
- **Vercel** - Plateforme de déploiement
- **Communauté** - Contributions et feedback

---

**Développé avec ❤️ par l'équipe MasterCom**

*Version 2.0.0 - Janvier 2024*
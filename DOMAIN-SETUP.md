# Configuration du Domaine Commaster.fr

## 🌐 Configuration du Nom de Domaine

### 1. Configuration DNS
Pour configurer le domaine `commaster.fr`, vous devez :

1. **Acheter le domaine** sur un registraire (OVH, Gandi, Namecheap, etc.)
2. **Configurer les enregistrements DNS** :
   ```
   Type: A
   Nom: @
   Valeur: 76.76.19.61 (IP Vercel)
   TTL: 3600

   Type: CNAME
   Nom: www
   Valeur: cname.vercel-dns.com
   TTL: 3600
   ```

### 2. Configuration Vercel
1. **Connecter le domaine** dans le dashboard Vercel
2. **Ajouter les domaines** :
   - `commaster.fr`
   - `www.commaster.fr`
3. **Configurer SSL** (automatique avec Vercel)

### 3. Configuration Email
- **Compte Master** : `master@master.com`
- **Email de contact** : `contact@commaster.fr`
- **Support** : `support@commaster.fr`

## 🚀 Déploiement

### Commandes de déploiement
```bash
# Build de production
npm run build

# Déploiement sur Vercel
vercel --prod

# Ou avec alias
vercel --prod --alias commaster.fr
```

### Variables d'environnement
Créer un fichier `.env.production` :
```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
VITE_APP_URL=https://commaster.fr
VITE_MASTER_EMAIL=master@master.com
```

## 📧 Configuration Email Professionnel

### 1. Configuration MX Records
```
Type: MX
Nom: @
Valeur: mail.commaster.fr
Priorité: 10
TTL: 3600
```

### 2. Services Email Recommandés
- **Google Workspace** (recommandé)
- **Microsoft 365**
- **Zoho Mail**

## 🔒 Sécurité et SSL

### 1. Certificat SSL
- Automatique avec Vercel
- Renouvellement automatique
- HSTS activé

### 2. Headers de Sécurité
Configurés dans `vercel.json` :
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security
- Permissions-Policy

## 📊 SEO et Référencement

### 1. Sitemap
- URL : `https://commaster.fr/sitemap.xml`
- Mis à jour automatiquement
- Soumis à Google Search Console

### 2. Robots.txt
- URL : `https://commaster.fr/robots.txt`
- Configuration optimisée pour startup
- Blocage des bots indésirables

### 3. Métadonnées
- Open Graph optimisé
- Twitter Cards
- Données structurées JSON-LD
- Canonical URLs

## 🎯 Prochaines Étapes

1. **Acheter le domaine** `commaster.fr`
2. **Configurer les DNS** avec les enregistrements ci-dessus
3. **Connecter le domaine** à Vercel
4. **Configurer l'email** professionnel
5. **Tester le déploiement** sur le domaine
6. **Soumettre à Google Search Console**
7. **Configurer Google Analytics**

## 📞 Support

Pour toute question sur la configuration :
- Email : `master@master.com`
- Documentation : Voir les fichiers de configuration
- Logs : Dashboard Vercel

---
*Configuration mise à jour le 19/12/2024*

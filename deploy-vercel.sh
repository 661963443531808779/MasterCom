#!/bin/bash

echo "🚀 Déploiement MasterCom sur Vercel..."

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé. Installation..."
    npm install -g vercel
fi

# Build du projet
echo "📦 Construction du projet..."
npm run build

# Vérifier que le build a réussi
if [ $? -ne 0 ]; then
    echo "❌ Échec du build"
    exit 1
fi

echo "✅ Build réussi"

# Déploiement sur Vercel
echo "🌐 Déploiement sur Vercel..."
vercel --prod

echo "🎉 Déploiement terminé !"
echo "📝 N'oubliez pas de configurer les variables d'environnement sur Vercel :"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"

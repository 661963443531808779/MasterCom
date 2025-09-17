#!/bin/bash

# Script de build optimisé pour Netlify
echo "🚀 Début du build MasterCom sur Netlify..."

# Nettoyer le cache
echo "🧹 Nettoyage du cache..."
rm -rf node_modules/.vite
rm -rf .vite

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci --prefer-offline --no-audit

# Build optimisé
echo "🔨 Build de l'application..."
npm run build

# Vérifier que le build a réussi
if [ -d "dist" ]; then
    echo "✅ Build réussi !"
    echo "📁 Contenu du dossier dist:"
    ls -la dist/
else
    echo "❌ Échec du build !"
    exit 1
fi

echo "🎉 Build terminé avec succès !"

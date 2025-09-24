-- =====================================================
-- SCRIPT DE CONFIGURATION COMPLET - MASTERCOM DATABASE
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor
-- Ce script crée toutes les tables nécessaires avec les bonnes contraintes

-- =====================================================
-- 0. NETTOYAGE DES CONTRAINTES PROBLÉMATIQUES
-- =====================================================

-- Supprimer les contraintes de vérification problématiques si elles existent
DO $$
BEGIN
  -- Supprimer la contrainte de statut des projets si elle existe
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'projects_status_check' 
    AND table_name = 'projects'
  ) THEN
    ALTER TABLE projects DROP CONSTRAINT projects_status_check;
    RAISE NOTICE 'Contrainte projects_status_check supprimée';
  END IF;
  
  -- Supprimer la contrainte de priorité des projets si elle existe
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'projects_priority_check' 
    AND table_name = 'projects'
  ) THEN
    ALTER TABLE projects DROP CONSTRAINT projects_priority_check;
    RAISE NOTICE 'Contrainte projects_priority_check supprimée';
  END IF;
  
  -- Supprimer la contrainte de statut des factures si elle existe
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'invoices_status_check' 
    AND table_name = 'invoices'
  ) THEN
    ALTER TABLE invoices DROP CONSTRAINT invoices_status_check;
    RAISE NOTICE 'Contrainte invoices_status_check supprimée';
  END IF;
  
  -- Supprimer la contrainte de statut des devis si elle existe
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'quotes_status_check' 
    AND table_name = 'quotes'
  ) THEN
    ALTER TABLE quotes DROP CONSTRAINT quotes_status_check;
    RAISE NOTICE 'Contrainte quotes_status_check supprimée';
  END IF;
END $$;

-- =====================================================
-- 1. CRÉATION DES TABLES
-- =====================================================

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'France',
  status VARCHAR(50) DEFAULT 'actif',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des projets
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  commercial_id UUID,
  status VARCHAR(50) DEFAULT 'draft',
  priority VARCHAR(50) DEFAULT 'medium',
  start_date DATE,
  end_date DATE,
  budget DECIMAL(10,2),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des factures
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number VARCHAR(100) NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 20.00,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'brouillon',
  issue_date DATE DEFAULT CURRENT_DATE,
  due_date DATE,
  paid_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des devis
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_number VARCHAR(100) NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 20.00,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'brouillon',
  valid_until DATE,
  issue_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. AJOUT DES CONTRAINTES UNIQUES
-- =====================================================

-- Contrainte unique sur l'email des clients
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'clients_email_key' 
    AND table_name = 'clients'
  ) THEN
    ALTER TABLE clients ADD CONSTRAINT clients_email_key UNIQUE (email);
  END IF;
END $$;

-- Contrainte unique sur le numéro de facture
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'invoices_invoice_number_key' 
    AND table_name = 'invoices'
  ) THEN
    ALTER TABLE invoices ADD CONSTRAINT invoices_invoice_number_key UNIQUE (invoice_number);
  END IF;
END $$;

-- Contrainte unique sur le numéro de devis
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'quotes_quote_number_key' 
    AND table_name = 'quotes'
  ) THEN
    ALTER TABLE quotes ADD CONSTRAINT quotes_quote_number_key UNIQUE (quote_number);
  END IF;
END $$;

-- =====================================================
-- 3. CORRECTION DES TABLES EXISTANTES
-- =====================================================

-- Ajouter les colonnes manquantes aux tables existantes
DO $$
BEGIN
  -- Ajouter created_by aux clients si manquant
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE clients ADD COLUMN created_by UUID;
  END IF;
  
  -- Ajouter commercial_id aux projets si manquant
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'commercial_id'
  ) THEN
    ALTER TABLE projects ADD COLUMN commercial_id UUID;
  END IF;
  
  -- Ajouter created_by aux projets si manquant
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE projects ADD COLUMN created_by UUID;
  END IF;
  
  -- Ajouter created_by aux factures si manquant
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'invoices' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE invoices ADD COLUMN created_by UUID;
  END IF;
  
  -- Ajouter created_by aux devis si manquant
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'quotes' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE quotes ADD COLUMN created_by UUID;
  END IF;
END $$;

-- Mettre à jour les enregistrements existants avec des valeurs par défaut
UPDATE clients SET created_by = gen_random_uuid() WHERE created_by IS NULL;
UPDATE projects SET commercial_id = gen_random_uuid() WHERE commercial_id IS NULL;
UPDATE projects SET created_by = gen_random_uuid() WHERE created_by IS NULL;
UPDATE invoices SET created_by = gen_random_uuid() WHERE created_by IS NULL;
UPDATE quotes SET created_by = gen_random_uuid() WHERE created_by IS NULL;

-- =====================================================
-- 4. CONFIGURATION DE LA SÉCURITÉ (RLS)
-- =====================================================

-- Activer RLS sur toutes les tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON clients;
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON projects;
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON invoices;
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON quotes;

-- Créer des politiques permissives pour le développement
CREATE POLICY "Enable all operations for authenticated users" ON clients
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON invoices
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON quotes
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 5. INSERTION DES DONNÉES DE TEST
-- =====================================================

-- Clients de test
INSERT INTO clients (name, email, phone, city, country, created_by) 
SELECT 'Client Test 1', 'client1@test.com', '0123456789', 'Paris', 'France', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM clients WHERE email = 'client1@test.com');

INSERT INTO clients (name, email, phone, city, country, created_by) 
SELECT 'Client Test 2', 'client2@test.com', '0987654321', 'Lyon', 'France', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM clients WHERE email = 'client2@test.com');

-- Projets de test
INSERT INTO projects (name, description, client_id, commercial_id, status, priority, budget, progress) 
SELECT 'Projet Web 1', 'Développement site web', 
       (SELECT id FROM clients WHERE email = 'client1@test.com'), 
       gen_random_uuid(), 'draft', 'medium', 5000.00, 25
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE name = 'Projet Web 1');

INSERT INTO projects (name, description, client_id, commercial_id, status, priority, budget, progress) 
SELECT 'Projet Mobile 1', 'Application mobile', 
       (SELECT id FROM clients WHERE email = 'client2@test.com'), 
       gen_random_uuid(), 'draft', 'medium', 8000.00, 0
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE name = 'Projet Mobile 1');

-- Factures de test
INSERT INTO invoices (invoice_number, client_id, amount, total_amount, status, issue_date, due_date, created_by) 
SELECT 'FAC-2024-001', 
       (SELECT id FROM clients WHERE email = 'client1@test.com'), 
       1000.00, 1200.00, 'brouillon', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM invoices WHERE invoice_number = 'FAC-2024-001');

INSERT INTO invoices (invoice_number, client_id, amount, total_amount, status, issue_date, due_date, created_by) 
SELECT 'FAC-2024-002', 
       (SELECT id FROM clients WHERE email = 'client2@test.com'), 
       2000.00, 2400.00, 'brouillon', CURRENT_DATE, CURRENT_DATE + INTERVAL '45 days', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM invoices WHERE invoice_number = 'FAC-2024-002');

-- Devis de test
INSERT INTO quotes (quote_number, client_id, amount, total_amount, status, valid_until, created_by) 
SELECT 'DEV-2024-001', 
       (SELECT id FROM clients WHERE email = 'client1@test.com'), 
       5000.00, 6000.00, 'brouillon', CURRENT_DATE + INTERVAL '30 days', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM quotes WHERE quote_number = 'DEV-2024-001');

INSERT INTO quotes (quote_number, client_id, amount, total_amount, status, valid_until, created_by) 
SELECT 'DEV-2024-002', 
       (SELECT id FROM clients WHERE email = 'client2@test.com'), 
       8000.00, 9600.00, 'brouillon', CURRENT_DATE + INTERVAL '45 days', gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM quotes WHERE quote_number = 'DEV-2024-002');

-- =====================================================
-- 6. MESSAGE DE CONFIRMATION
-- =====================================================

SELECT '🎉 BASE DE DONNÉES MASTERCOM CONFIGURÉE AVEC SUCCÈS!' as message;
SELECT '✅ Tables créées: clients, projects, invoices, quotes' as details;
SELECT '✅ Contraintes ajoutées: UNIQUE sur email, invoice_number, quote_number' as constraints;
SELECT '✅ Sécurité activée: RLS avec politiques permissives' as security;
SELECT '✅ Données de test insérées: 2 clients, 2 projets, 2 factures, 2 devis' as test_data;

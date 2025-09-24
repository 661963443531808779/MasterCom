-- Script SQL pour créer les tables nécessaires dans Supabase
-- À exécuter dans Supabase Dashboard > SQL Editor

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'France',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des projets
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending',
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
  invoice_number VARCHAR(100) UNIQUE NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 20.00,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
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
  quote_number VARCHAR(100) UNIQUE NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 20.00,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  valid_until DATE,
  issue_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS (Row Level Security) sur toutes les tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Créer des politiques RLS permissives (pour le développement)
-- ATTENTION: Ces politiques permettent à tous les utilisateurs authentifiés d'accéder aux données
-- Changez-les selon vos besoins de sécurité

-- Politiques pour la table clients
CREATE POLICY "Enable all operations for authenticated users" ON clients
  FOR ALL USING (auth.role() = 'authenticated');

-- Politiques pour la table projects
CREATE POLICY "Enable all operations for authenticated users" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Politiques pour la table invoices
CREATE POLICY "Enable all operations for authenticated users" ON invoices
  FOR ALL USING (auth.role() = 'authenticated');

-- Politiques pour la table quotes
CREATE POLICY "Enable all operations for authenticated users" ON quotes
  FOR ALL USING (auth.role() = 'authenticated');

-- Insérer quelques données de test
INSERT INTO clients (name, email, phone, company, city, country) VALUES
  ('Client Test 1', 'client1@test.com', '0123456789', 'Entreprise Test 1', 'Paris', 'France'),
  ('Client Test 2', 'client2@test.com', '0987654321', 'Entreprise Test 2', 'Lyon', 'France')
ON CONFLICT (email) DO NOTHING;

-- Insérer quelques projets de test
INSERT INTO projects (name, description, client_id, status, priority, budget, progress) VALUES
  ('Projet Web 1', 'Développement site web', (SELECT id FROM clients WHERE email = 'client1@test.com'), 'active', 'high', 5000.00, 25),
  ('Projet Mobile 1', 'Application mobile', (SELECT id FROM clients WHERE email = 'client2@test.com'), 'pending', 'medium', 8000.00, 0)
ON CONFLICT DO NOTHING;

-- Insérer quelques factures de test
INSERT INTO invoices (invoice_number, client_id, project_id, amount, total_amount, status, due_date) VALUES
  ('FAC-2024-001', (SELECT id FROM clients WHERE email = 'client1@test.com'), (SELECT id FROM projects WHERE name = 'Projet Web 1'), 1000.00, 1200.00, 'sent', CURRENT_DATE + INTERVAL '30 days'),
  ('FAC-2024-002', (SELECT id FROM clients WHERE email = 'client2@test.com'), (SELECT id FROM projects WHERE name = 'Projet Mobile 1'), 2000.00, 2400.00, 'draft', CURRENT_DATE + INTERVAL '45 days')
ON CONFLICT (invoice_number) DO NOTHING;

-- Insérer quelques devis de test
INSERT INTO quotes (quote_number, client_id, project_id, amount, total_amount, status, valid_until) VALUES
  ('DEV-2024-001', (SELECT id FROM clients WHERE email = 'client1@test.com'), (SELECT id FROM projects WHERE name = 'Projet Web 1'), 5000.00, 6000.00, 'sent', CURRENT_DATE + INTERVAL '30 days'),
  ('DEV-2024-002', (SELECT id FROM clients WHERE email = 'client2@test.com'), (SELECT id FROM projects WHERE name = 'Projet Mobile 1'), 8000.00, 9600.00, 'draft', CURRENT_DATE + INTERVAL '45 days')
ON CONFLICT (quote_number) DO NOTHING;

-- Afficher un message de confirmation
SELECT 'Tables créées avec succès!' as message;

-- Schéma SQL complet pour MasterCom
-- Exécuter ce script dans Supabase SQL Editor pour créer la base de données complète

-- 1. Créer les tables principales
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    address TEXT,
    city TEXT,
    region TEXT,
    country TEXT DEFAULT 'France',
    role_id UUID REFERENCES roles(id),
    created_by UUID,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    region TEXT,
    country TEXT DEFAULT 'France',
    status TEXT DEFAULT 'prospect' CHECK (status IN ('prospect', 'active', 'inactive')),
    rating INTEGER DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    commercial_id UUID,
    created_by UUID NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT UNIQUE NOT NULL,
    client_id UUID REFERENCES clients(id),
    amount DECIMAL(10,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 20.00,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    payment_date DATE,
    notes TEXT,
    commercial_id UUID,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number TEXT UNIQUE NOT NULL,
    client_id UUID REFERENCES clients(id),
    amount DECIMAL(10,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 20.00,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
    valid_until DATE NOT NULL,
    accepted_date DATE,
    notes TEXT,
    commercial_id UUID,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    type TEXT DEFAULT 'support' CHECK (type IN ('support', 'contact', 'quote_request', 'complaint')),
    client_id UUID REFERENCES clients(id),
    assigned_to UUID,
    created_by UUID NOT NULL,
    contact_email TEXT,
    contact_phone TEXT,
    company_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Insérer les rôles par défaut
INSERT INTO roles (name, description, permissions) VALUES 
('master', 'Compte Master - Accès complet', '{"all": true, "create_commercial": true, "create_client": true, "manage_all": true}'),
('commercial', 'Compte Commercial - Gestion des clients', '{"manage_clients": true, "create_invoices": true, "create_quotes": true, "manage_tickets": true}'),
('client', 'Compte Client - Accès limité', '{"view_own_data": true, "create_tickets": true, "view_invoices": true, "view_quotes": true}')
ON CONFLICT (name) DO NOTHING;

-- 3. Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role_id ON user_profiles(role_id);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_commercial_id ON clients(commercial_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_quotes_client_id ON quotes(client_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_number ON quotes(quote_number);
CREATE INDEX IF NOT EXISTS idx_support_tickets_client_id ON support_tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned_to ON support_tickets(assigned_to);

-- 4. Créer des fonctions utilitaires
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Créer les triggers pour updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_roles_updated_at ON roles;
CREATE TRIGGER update_roles_updated_at 
    BEFORE UPDATE ON roles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at 
    BEFORE UPDATE ON clients 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at 
    BEFORE UPDATE ON invoices 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at 
    BEFORE UPDATE ON quotes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_support_tickets_updated_at ON support_tickets;
CREATE TRIGGER update_support_tickets_updated_at 
    BEFORE UPDATE ON support_tickets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Configurer les politiques de sécurité (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- 7. Créer des politiques optimisées pour les performances
-- Supprimer toutes les politiques existantes pour éviter les doublons
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Masters can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Masters can manage all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Enable read access for roles" ON roles;
DROP POLICY IF EXISTS "Enable all access for clients" ON clients;
DROP POLICY IF EXISTS "Enable all for clients" ON clients;
DROP POLICY IF EXISTS "Enable all access for invoices" ON invoices;
DROP POLICY IF EXISTS "Enable all for invoices" ON invoices;
DROP POLICY IF EXISTS "Enable all access for quotes" ON quotes;
DROP POLICY IF EXISTS "Enable all for quotes" ON quotes;
DROP POLICY IF EXISTS "Enable all access for support_tickets" ON support_tickets;
DROP POLICY IF EXISTS "Enable all for support_tickets" ON support_tickets;
DROP POLICY IF EXISTS "Enable all for roles" ON roles;
DROP POLICY IF EXISTS "Enable all for user_profiles" ON user_profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON user_profiles;
DROP POLICY IF EXISTS "Enable update for own profile" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON user_profiles;

-- Politiques optimisées pour user_profiles (avec SELECT pour éviter les réévaluations)
CREATE POLICY "user_profiles_select" ON user_profiles
    FOR SELECT USING ((SELECT auth.role()) = 'authenticated');

CREATE POLICY "user_profiles_update" ON user_profiles
    FOR UPDATE USING ((SELECT auth.uid()) = id);

CREATE POLICY "user_profiles_insert" ON user_profiles
    FOR INSERT WITH CHECK ((SELECT auth.role()) = 'authenticated');

-- Politiques optimisées pour roles
CREATE POLICY "roles_select" ON roles
    FOR SELECT USING ((SELECT auth.role()) = 'authenticated');

-- Politiques optimisées pour clients
CREATE POLICY "clients_all" ON clients
    FOR ALL USING ((SELECT auth.role()) = 'authenticated');

-- Politiques optimisées pour invoices
CREATE POLICY "invoices_all" ON invoices
    FOR ALL USING ((SELECT auth.role()) = 'authenticated');

-- Politiques optimisées pour quotes
CREATE POLICY "quotes_all" ON quotes
    FOR ALL USING ((SELECT auth.role()) = 'authenticated');

-- Politiques optimisées pour support_tickets
CREATE POLICY "support_tickets_all" ON support_tickets
    FOR ALL USING ((SELECT auth.role()) = 'authenticated');

-- 8. Créer des vues pour les analytics
CREATE OR REPLACE VIEW analytics_dashboard AS
SELECT 
    (SELECT COUNT(*) FROM clients WHERE status = 'active') as active_clients,
    (SELECT COUNT(*) FROM clients WHERE status = 'prospect') as prospects,
    (SELECT COUNT(*) FROM invoices WHERE status = 'paid') as paid_invoices,
    (SELECT COUNT(*) FROM invoices WHERE status = 'overdue') as overdue_invoices,
    (SELECT COALESCE(SUM(total_amount), 0) FROM invoices WHERE status = 'paid') as total_revenue,
    (SELECT COUNT(*) FROM quotes WHERE status = 'accepted') as accepted_quotes,
    (SELECT COUNT(*) FROM support_tickets WHERE status = 'open') as open_tickets,
    (SELECT COUNT(*) FROM support_tickets WHERE status = 'resolved') as resolved_tickets;

-- 9. Créer une vue pour les données PowerBI
CREATE OR REPLACE VIEW powerbi_data AS
SELECT 
    'clients' as data_type,
    COUNT(*) as count,
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_count,
    AVG(rating) as avg_rating
FROM clients
UNION ALL
SELECT 
    'invoices' as data_type,
    COUNT(*) as count,
    SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as active_count,
    AVG(total_amount) as avg_rating
FROM invoices
UNION ALL
SELECT 
    'quotes' as data_type,
    COUNT(*) as count,
    SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as active_count,
    AVG(total_amount) as avg_rating
FROM quotes
UNION ALL
SELECT 
    'tickets' as data_type,
    COUNT(*) as count,
    SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as active_count,
    AVG(CASE 
        WHEN priority = 'urgent' THEN 4
        WHEN priority = 'high' THEN 3
        WHEN priority = 'medium' THEN 2
        WHEN priority = 'low' THEN 1
        ELSE 0
    END) as avg_rating
FROM support_tickets;

-- 10. Créer des fonctions pour générer des numéros automatiques
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    year_part TEXT;
    month_part TEXT;
    sequence_num INTEGER;
    invoice_num TEXT;
BEGIN
    year_part := EXTRACT(YEAR FROM NOW())::TEXT;
    month_part := LPAD(EXTRACT(MONTH FROM NOW())::TEXT, 2, '0');
    
    -- Compter les factures du mois actuel
    SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 9) AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM invoices 
    WHERE invoice_number LIKE 'INV-' || year_part || month_part || '-%';
    
    invoice_num := 'INV-' || year_part || month_part || '-' || LPAD(sequence_num::TEXT, 3, '0');
    
    RETURN invoice_num;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
DECLARE
    year_part TEXT;
    month_part TEXT;
    sequence_num INTEGER;
    quote_num TEXT;
BEGIN
    year_part := EXTRACT(YEAR FROM NOW())::TEXT;
    month_part := LPAD(EXTRACT(MONTH FROM NOW())::TEXT, 2, '0');
    
    -- Compter les devis du mois actuel
    SELECT COALESCE(MAX(CAST(SUBSTRING(quote_number FROM 9) AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM quotes 
    WHERE quote_number LIKE 'QUO-' || year_part || month_part || '-%';
    
    quote_num := 'QUO-' || year_part || month_part || '-' || LPAD(sequence_num::TEXT, 3, '0');
    
    RETURN quote_num;
END;
$$ LANGUAGE plpgsql;

-- 11. Créer les tables pour la gestion des projets
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    client_id UUID REFERENCES clients(id),
    commercial_id UUID NOT NULL,
    status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'on_hold', 'completed', 'cancelled')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    start_date DATE,
    end_date DATE,
    estimated_hours INTEGER DEFAULT 0,
    actual_hours INTEGER DEFAULT 0,
    budget DECIMAL(10,2),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    tags TEXT[],
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'completed', 'cancelled')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assigned_to UUID,
    estimated_hours INTEGER DEFAULT 0,
    actual_hours INTEGER DEFAULT 0,
    due_date DATE,
    completed_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    completed_date DATE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'overdue')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    task_id UUID REFERENCES project_tasks(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    file_type TEXT,
    uploaded_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Créer des index pour les projets
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_commercial_id ON projects(commercial_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_priority ON projects(priority);
CREATE INDEX IF NOT EXISTS idx_project_tasks_project_id ON project_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_project_tasks_assigned_to ON project_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_project_tasks_status ON project_tasks(status);
CREATE INDEX IF NOT EXISTS idx_project_milestones_project_id ON project_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_project_files_project_id ON project_files(project_id);

-- 13. Créer les triggers pour les projets
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_project_tasks_updated_at ON project_tasks;
CREATE TRIGGER update_project_tasks_updated_at 
    BEFORE UPDATE ON project_tasks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_project_milestones_updated_at ON project_milestones;
CREATE TRIGGER update_project_milestones_updated_at 
    BEFORE UPDATE ON project_milestones 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 14. Activer RLS pour les tables de projets
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;

-- 15. Créer les politiques RLS pour les projets
CREATE POLICY "projects_all" ON projects
    FOR ALL USING ((SELECT auth.role()) = 'authenticated');

CREATE POLICY "project_tasks_all" ON project_tasks
    FOR ALL USING ((SELECT auth.role()) = 'authenticated');

CREATE POLICY "project_milestones_all" ON project_milestones
    FOR ALL USING ((SELECT auth.role()) = 'authenticated');

CREATE POLICY "project_files_all" ON project_files
    FOR ALL USING ((SELECT auth.role()) = 'authenticated');

-- 16. Créer des vues sécurisées pour les projets
-- Supprimer l'ancienne vue si elle existe
DROP VIEW IF EXISTS project_overview;

-- Créer une fonction sécurisée pour obtenir les données de projet
CREATE OR REPLACE FUNCTION get_project_overview()
RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    status TEXT,
    priority TEXT,
    progress INTEGER,
    start_date DATE,
    end_date DATE,
    estimated_hours INTEGER,
    actual_hours INTEGER,
    budget DECIMAL,
    client_name TEXT,
    client_email TEXT,
    commercial_name TEXT,
    commercial_email TEXT,
    total_tasks BIGINT,
    completed_tasks BIGINT,
    total_milestones BIGINT,
    completed_milestones BIGINT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.description,
        p.status,
        p.priority,
        p.progress,
        p.start_date,
        p.end_date,
        p.estimated_hours,
        p.actual_hours,
        p.budget,
        c.name as client_name,
        c.email as client_email,
        up.first_name || ' ' || up.last_name as commercial_name,
        up.email as commercial_email,
        COUNT(DISTINCT pt.id) as total_tasks,
        COUNT(DISTINCT CASE WHEN pt.status = 'completed' THEN pt.id END) as completed_tasks,
        COUNT(DISTINCT pm.id) as total_milestones,
        COUNT(DISTINCT CASE WHEN pm.status = 'completed' THEN pm.id END) as completed_milestones,
        p.created_at,
        p.updated_at
    FROM projects p
    LEFT JOIN clients c ON p.client_id = c.id
    LEFT JOIN user_profiles up ON p.commercial_id = up.id
    LEFT JOIN project_tasks pt ON p.id = pt.project_id
    LEFT JOIN project_milestones pm ON p.id = pm.project_id
    GROUP BY p.id, c.name, c.email, up.first_name, up.last_name, up.email;
END;
$$;

-- Créer une vue simple qui utilise la fonction sécurisée
CREATE VIEW project_overview AS
SELECT * FROM get_project_overview();

-- 17. Créer la table des demandes de suppression
CREATE TABLE IF NOT EXISTS deletion_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name VARCHAR(255) NOT NULL,
  record_id UUID NOT NULL,
  record_data JSONB NOT NULL,
  reason TEXT,
  requested_by UUID NOT NULL,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT
);

-- Activer RLS sur la table des demandes de suppression
ALTER TABLE deletion_requests ENABLE ROW LEVEL SECURITY;

-- Politique RLS pour les demandes de suppression
CREATE POLICY "Enable all operations for authenticated users" ON deletion_requests
  FOR ALL USING (auth.role() = 'authenticated');

-- Index unique pour empêcher les doublons de demandes en attente
CREATE UNIQUE INDEX IF NOT EXISTS deletion_requests_unique_pending 
ON deletion_requests (table_name, record_id) 
WHERE status = 'pending';

-- 18. Créer la table des préférences de thèmes
CREATE TABLE IF NOT EXISTS theme_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  theme_name VARCHAR(50) NOT NULL CHECK (theme_name IN ('none', 'christmas', 'easter', 'halloween', 'summer')),
  is_active BOOLEAN DEFAULT true,
  activated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deactivated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS sur la table des préférences de thèmes
ALTER TABLE theme_preferences ENABLE ROW LEVEL SECURITY;

-- Politique RLS pour les préférences de thèmes
CREATE POLICY "Enable all operations for authenticated users" ON theme_preferences
  FOR ALL USING (auth.role() = 'authenticated');

-- Index pour les préférences de thèmes
CREATE INDEX IF NOT EXISTS idx_theme_preferences_user_id ON theme_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_theme_preferences_active ON theme_preferences(is_active) WHERE is_active = true;

-- 19. Insérer le compte master avec les bonnes permissions
INSERT INTO users (id, email, first_name, last_name, role, status, created_by) 
VALUES (
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c',
  'master@mastercom.fr',
  'Master',
  'Admin',
  'master',
  'active',
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c'
) ON CONFLICT (email) DO UPDATE SET
  role = 'master',
  status = 'active',
  updated_at = NOW();

-- Insérer aussi master@mastercom.com pour compatibilité
INSERT INTO users (email, first_name, last_name, role, status, created_by) 
VALUES (
  'master@mastercom.com',
  'Master',
  'Admin',
  'master',
  'active',
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c'
) ON CONFLICT (email) DO NOTHING;

-- 20. Message de confirmation final
SELECT '🎉 Schéma MasterCom complet créé avec succès !' as message;
SELECT '✅ Toutes les tables créées' as tables;
SELECT '✅ Politiques RLS activées' as security;
SELECT '✅ Index de performance créés' as performance;
SELECT '✅ Compte master configuré' as master_account;
SELECT '✅ Système de suppression avec validation' as deletion_system;
SELECT '✅ Système de thèmes saisonniers' as themes_system;

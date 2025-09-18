import { supabase } from '../services/supabase';

export const initTestUsers = async () => {
  console.log('🔧 Initialisation des utilisateurs de test...');

  try {
    // Créer l'utilisateur admin
    const { data: adminData, error: adminError } = await supabase.auth.signUp({
      email: 'admin@mastercom.fr',
      password: 'admin123',
      options: {
        data: {
          first_name: 'Admin',
          last_name: 'MasterCom',
          role: 'master'
        }
      }
    });

    if (adminError) {
      console.warn('⚠️ Erreur création admin:', adminError.message);
    } else {
      console.log('✅ Utilisateur admin créé:', adminData.user?.email);
    }

    // Créer l'utilisateur client
    const { data: clientData, error: clientError } = await supabase.auth.signUp({
      email: 'client@mastercom.fr',
      password: 'client123',
      options: {
        data: {
          first_name: 'Client',
          last_name: 'Test',
          role: 'client'
        }
      }
    });

    if (clientError) {
      console.warn('⚠️ Erreur création client:', clientError.message);
    } else {
      console.log('✅ Utilisateur client créé:', clientData.user?.email);
    }

    // Créer les rôles si nécessaire
    const { error: roleError } = await supabase
      .from('roles')
      .upsert([
        {
          id: 'master',
          name: 'master',
          description: 'Administrateur principal',
          permissions: { all: true }
        },
        {
          id: 'client',
          name: 'client',
          description: 'Client standard',
          permissions: { all: false }
        }
      ]);

    if (roleError) {
      console.warn('⚠️ Erreur création rôles:', roleError.message);
    } else {
      console.log('✅ Rôles créés');
    }

    console.log('🎉 Initialisation terminée !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  }
};

// Fonction pour vérifier si les utilisateurs existent
export const checkTestUsers = async () => {
  try {
    const { data: users, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.warn('⚠️ Impossible de vérifier les utilisateurs:', error.message);
      return false;
    }

    const adminExists = users.users.some(user => user.email === 'admin@mastercom.fr');
    const clientExists = users.users.some(user => user.email === 'client@mastercom.fr');

    console.log('👥 Utilisateurs existants:');
    console.log('  - Admin:', adminExists ? '✅' : '❌');
    console.log('  - Client:', clientExists ? '✅' : '❌');

    return adminExists && clientExists;
  } catch (error) {
    console.error('❌ Erreur vérification utilisateurs:', error);
    return false;
  }
};

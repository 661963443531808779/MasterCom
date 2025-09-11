import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Calendar } from 'lucide-react';
import { supportService } from '../services/supabase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      
      // Déterminer le type de demande
      const isQuoteRequest = formData.budget || formData.timeline;
      
      if (isQuoteRequest) {
        // Créer une demande de devis
        const result = await supportService.createQuoteRequest({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          project_description: formData.message,
          budget: formData.budget,
          timeline: formData.timeline
        });
        alert('Votre demande de devis a été envoyée ! Nous vous recontacterons rapidement.');
      } else {
        // Créer un ticket de contact
        const result = await supportService.createContactTicket({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message
        });
        alert('Votre message a été envoyé ! Nous vous recontacterons rapidement.');
      }
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        budget: '',
        timeline: '',
      });
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi:', error);
      
      // Message d'erreur plus détaillé
      let errorMessage = 'Une erreur est survenue. ';
      
      if (error.message) {
        if (error.message.includes('permission denied')) {
          errorMessage += 'Problème de permissions. Vérifiez la configuration Supabase.';
        } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
          errorMessage += 'Table manquante. Exécutez le script de migration.';
        } else if (error.message.includes('column') && error.message.includes('does not exist')) {
          errorMessage += 'Colonne manquante. Exécutez le script de migration.';
        } else {
          errorMessage += `Détails: ${error.message}`;
        }
      }
      
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Prêt à donner une nouvelle dimension à votre communication ? Parlons de votre projet !
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos Coordonnées</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Adresse</h3>
                      <p className="text-gray-600">
                        123 Rue de la Communication<br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Téléphone</h3>
                      <p className="text-gray-600">+33 1 23 45 67 89</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">contact@mastercom.fr</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Horaires</h3>
                      <p className="text-gray-600">
                        Lun - Ven: 9h00 - 18h00<br />
                        Sam: 9h00 - 12h00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 space-y-4">
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chat en direct
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    <Calendar className="mr-2 h-5 w-5" />
                    Réserver un RDV
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Parlez-nous de votre projet</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Mon Entreprise"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+33 1 23 45 67 89"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="branding">Branding & Identité visuelle</option>
                      <option value="strategy">Stratégie de communication</option>
                      <option value="digital">Marketing digital</option>
                      <option value="social">Réseaux sociaux</option>
                      <option value="events">Événementiel</option>
                      <option value="pr">Relations presse</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Budget estimé
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Sélectionnez votre budget</option>
                        <option value="5k-10k">5 000€ - 10 000€</option>
                        <option value="10k-25k">10 000€ - 25 000€</option>
                        <option value="25k-50k">25 000€ - 50 000€</option>
                        <option value="50k+">Plus de 50 000€</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline souhaitée
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Sélectionnez la timeline</option>
                        <option value="asap">Le plus tôt possible</option>
                        <option value="1-3m">Dans 1-3 mois</option>
                        <option value="3-6m">Dans 3-6 mois</option>
                        <option value="6m+">Plus de 6 mois</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Décrivez votre projet *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Parlez-nous de votre projet, vos objectifs, vos attentes..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="consent"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="ml-2 text-sm text-gray-700">
                      J'accepte que mes données soient utilisées pour me recontacter *
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Où nous trouver</h2>
            <p className="text-lg text-gray-600">
              Notre agence est située au cœur de Paris, facilement accessible
            </p>
          </div>
          
          {/* Map Placeholder - En production, vous pourriez intégrer Google Maps */}
          <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">
                123 Rue de la Communication, 75001 Paris
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Métro : Châtelet-Les Halles (Lignes 1, 4, 7, 11, 14)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
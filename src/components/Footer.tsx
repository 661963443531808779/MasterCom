import { FC } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Master Com</h3>
            <p className="text-gray-300 mb-4">
              Votre agence de communication créative et innovante. 
              Nous transformons vos idées en succès.
            </p>
            <div className="flex space-x-4">
<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
  <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
</a>
<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
  <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
</a>
<a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
  <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
</a>
<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
  <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
</a>

            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Stratégie de communication</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Branding & Identité visuelle</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Réseaux sociaux</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Événementiel</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Marketing digital</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">À propos</a></li>
              <li><a href="/portfolio" className="text-gray-300 hover:text-white transition-colors">Nos réalisations</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mentions légales</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">123 Rue de la Communication<br />75001 Paris</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">contact@mastercom.fr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Master Com. Tous droits réservés. | 
            <a href="#" className="hover:text-white ml-2">Politique de confidentialité</a> | 
            <a href="#" className="hover:text-white ml-2">CGU</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

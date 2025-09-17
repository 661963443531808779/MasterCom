import { FC } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEO: FC<SEOProps> = ({
  title = 'MasterCom - Agence de Communication Professionnelle',
  description = 'MasterCom est une agence de communication professionnelle offrant des services de branding, marketing digital, réseaux sociaux et événementiel. Gestion CRM intégrée et analytics avancés.',
  keywords = 'agence communication, marketing digital, branding, réseaux sociaux, événementiel, CRM, analytics, MasterCom',
  image = '/og-image.jpg',
  url = 'https://mastercom.fr',
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const fullTitle = title.includes('MasterCom') ? title : `${title} | MasterCom`;
  
  // Mise à jour du titre de la page
  if (typeof document !== 'undefined') {
    document.title = fullTitle;
    
    // Mise à jour de la meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Mise à jour des keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);
  }
  
  return null; // Ce composant ne rend rien visuellement
};

export default SEO;
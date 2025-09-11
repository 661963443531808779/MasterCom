import React from 'react';
import { Helmet } from 'react-helmet-async';

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

const SEO: React.FC<SEOProps> = ({
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
  
  return (
    <Helmet>
      {/* Meta tags de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author || "MasterCom"} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="MasterCom" />
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.length > 0 && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MasterCom",
          "description": "Agence de communication professionnelle",
          "url": "https://mastercom.fr",
          "logo": "https://mastercom.fr/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33-1-23-45-67-89",
            "contactType": "customer service",
            "availableLanguage": "French"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR",
            "addressLocality": "Paris"
          },
          "sameAs": [
            "https://www.linkedin.com/company/mastercom",
            "https://twitter.com/mastercom"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;

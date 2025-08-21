'use client';

import { useEffect } from 'react';

export default function JsonLd() {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "MERN Todo App",
      "description": "A full-stack Todo application built with MERN stack featuring task management, filtering, sorting, and responsive design.",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Create and manage tasks",
        "Edit task details",
        "Delete tasks",
        "Filter tasks by status",
        "Sort tasks by date, title, or status",
        "Responsive design",
        "Real-time updates"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
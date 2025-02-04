'use client';

import { useEffect, useRef } from 'react';

export default function Comments() {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove any existing giscus elements
    const existingScript = document.querySelector('script[src*="giscus.app"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'brskrt/blog-ai');
    script.setAttribute('data-repo-id', 'R_kgDOLQGxXw');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOLQGxX84CdxYE');
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'tr');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    const container = commentsRef.current;
    if (container) {
      container.innerHTML = ''; // Clear existing content
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="mt-10 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-8">Yorumlar</h2>
      <div ref={commentsRef} className="giscus" />
    </div>
  );
} 
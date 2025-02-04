'use client';

import { useEffect, useRef } from 'react';

export default function Comments() {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'brskrt/blog-ai');
    script.setAttribute('data-repo-id', 'R_kgDOLQGxXw');
    script.setAttribute('data-category', 'Comments');
    script.setAttribute('data-category-id', 'DIC_kwDOLQGxX84CdxYE');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'tr');
    script.crossOrigin = 'anonymous';
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      if (commentsRef.current) {
        const giscusFrame = commentsRef.current.querySelector('iframe.giscus-frame');
        if (giscusFrame) {
          giscusFrame.remove();
        }
      }
    };
  }, []);

  return (
    <div className="mt-10 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-8">Yorumlar</h2>
      <div ref={commentsRef} />
    </div>
  );
} 
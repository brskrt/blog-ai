'use client';

import { DiscussionEmbed } from 'disqus-react';
import { usePathname } from 'next/navigation';

export default function Comments() {
  const pathname = usePathname();
  const disqusShortname = 'bariskurt-blog';
  
  const disqusConfig = {
    url: `https://bariskurt.com${pathname}`,
    identifier: pathname,
    title: document.title,
    language: 'tr'
  };

  return (
    <div className="mt-10 pt-10 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-8">Yorumlar</h2>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
} 
import { BlogPost } from '@/types/blog';

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Next.js ile Modern Web Geliştirme',
    slug: 'nextjs-ile-modern-web-gelistirme',
    excerpt: 'Next.js, React tabanlı web uygulamaları geliştirmek için mükemmel bir framework. Bu yazıda Next.js\'in temel özelliklerini inceleyeceğiz.',
    content: `
# Next.js ile Modern Web Geliştirme

Next.js, React tabanlı web uygulamaları geliştirmek için mükemmel bir framework. Server-side rendering, static site generation, API routes ve daha birçok özellik sunuyor.

## Önemli Özellikler

Next.js ile geliştirme yaparken dikkat etmeniz gereken önemli noktalar:

1. **Sayfa Yönlendirmeleri**
   - File-system based routing
   - Dynamic routes
   - Shallow routing

2. **Data Fetching Yöntemleri**
   - getStaticProps
   - getServerSideProps
   - Incremental Static Regeneration

3. **SEO Optimizasyonu**
   - Metadata API
   - robots.txt
   - sitemap.xml

4. **Performance Optimizasyonu**
   - Image Optimization
   - Font Optimization
   - Script Optimization

### Kod Örneği

\`\`\`typescript
// pages/index.tsx
export default function Home() {
  return (
    <div>
      <h1>Next.js ile Geliştirme</h1>
      <p>Modern web uygulamaları için en iyi çözüm!</p>
    </div>
  )
}
\`\`\`

Bu yazı serisinde tüm bu konuları detaylı olarak inceleyeceğiz.
    `,
    date: '2024-02-03',
    author: 'Ahmet Yılmaz',
    tags: ['nextjs', 'react', 'web development']
  },
  {
    id: '2',
    title: 'TypeScript ile Güvenli Kod Yazımı',
    slug: 'typescript-ile-guvenli-kod-yazimi',
    excerpt: 'TypeScript, JavaScript\'e tip güvenliği ekleyerek daha güvenilir ve sürdürülebilir kod yazmamızı sağlar.',
    content: `
# TypeScript ile Güvenli Kod Yazımı

TypeScript, Microsoft tarafından geliştirilen ve JavaScript'e tip güvenliği ekleyen bir programlama dilidir.

## TypeScript'in Avantajları

1. **Tip Güvenliği**
   - Statik tip kontrolü
   - Interface ve Type tanımlamaları
   - Generics desteği

2. **Daha İyi IDE Desteği**
   - Otomatik tamamlama
   - Hata yakalama
   - Refactoring araçları

3. **Daha Az Hata**
   - Derleme zamanı hata kontrolü
   - Tip kontrolleri
   - Null checking

4. **Kolay Refactoring**
   - Güvenli değişiklikler
   - Kod navigasyonu
   - Tip çıkarımı

### Örnek Kod

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUserName(user: User): string {
  return user.name;
}

// Hata! Eksik property
const user = {
  id: 1,
  name: 'John'
};

getUserName(user); // TypeScript bunu yakalar!
\`\`\`

Bu yazıda TypeScript'in temel özelliklerini ve best practice'lerini inceleyeceğiz.
    `,
    date: '2024-02-02',
    author: 'Ayşe Demir',
    tags: ['typescript', 'javascript', 'programming']
  }
]; 
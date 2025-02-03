import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Markdown from 'react-markdown';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      notFound();
    }

    return (
      <main className="min-h-screen p-8 max-w-4xl mx-auto">
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-8 inline-block"
        >
          ← Ana Sayfaya Dön
        </Link>
        
        <article className="prose lg:prose-xl max-w-none">
          <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
          <div className="not-prose mb-8 text-lg">
            {post.author && (
              <>
                <span className="text-purple-600 font-medium">{post.author}</span>
                <span className="mx-2 text-gray-400">•</span>
              </>
            )}
            <span className="text-emerald-600 font-medium">
              {new Date(post.date).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="mx-2 text-gray-400">•</span>
                <span className="space-x-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>
          <div className="prose-lg">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </main>
    );
  } catch {
    notFound();
  }
} 
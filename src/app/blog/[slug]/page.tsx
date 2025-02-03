import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Markdown from 'react-markdown';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
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
  const resolvedParams = await params;
  
  if (!resolvedParams?.slug) {
    notFound();
  }

  try {
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
      notFound();
    }

    return (
      <main className="min-h-screen py-12 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfaya Dön
          </Link>
          
          <article className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
            
            <div className="flex items-center space-x-4 mb-8 text-sm">
              <div className="flex items-center text-purple-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author}
              </div>
              
              <div className="flex items-center text-emerald-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.date).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal">
              <Markdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl mt-8 mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl mt-8 mb-4" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl mt-6 mb-3" {...props} />,
                  p: ({node, ...props}) => <p className="my-4 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="my-4 ml-6 space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="my-4 ml-6 space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                  a: ({node, ...props}) => (
                    <a 
                      className="text-blue-600 hover:underline" 
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props} 
                    />
                  ),
                  code: ({node, ...props}) => (
                    <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono" {...props} />
                  ),
                  pre: ({node, ...props}) => (
                    <pre className="p-4 bg-gray-900 text-white rounded-lg overflow-x-auto my-4" {...props} />
                  ),
                }}
              >
                {post.content}
              </Markdown>
            </div>
          </article>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
} 
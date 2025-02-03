import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.'
    };
  }

  // Get the first paragraph of the content for description
  const firstParagraph = post.content.split('\n').find(p => p.trim() !== '' && !p.startsWith('#'));

  return {
    title: `${post.title} | Barış Kurt`,
    description: firstParagraph || post.title,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-12 transition-colors group"
        >
          <svg 
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Ana Sayfaya Dön
        </Link>
        
        <article className="bg-white rounded-2xl shadow-sm p-8 sm:p-12">
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
              <div className="flex items-center text-purple-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">Barış Kurt</span>
              </div>
              
              <div className="flex items-center text-emerald-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time className="font-medium">
                  {new Date(post.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal">
            <Markdown
              components={{
                h1: (props) => <h2 className="text-3xl font-bold mt-12 mb-6" {...props} />,
                h2: (props) => <h2 className="text-2xl font-bold mt-10 mb-5" {...props} />,
                h3: (props) => <h3 className="text-xl font-bold mt-8 mb-4" {...props} />,
                h4: (props) => <h4 className="text-lg font-bold mt-6 mb-3" {...props} />,
                h5: (props) => <h5 className="text-base font-bold mt-4 mb-2" {...props} />,
                h6: (props) => <h6 className="text-sm font-bold mt-4 mb-2" {...props} />,
                p: (props) => <p className="my-6 leading-relaxed" {...props} />,
                ul: (props) => <ul className="my-6 ml-6 space-y-3" {...props} />,
                ol: (props) => <ol className="my-6 ml-6 space-y-3" {...props} />,
                li: (props) => <li className="leading-relaxed pl-2" {...props} />,
                a: (props) => (
                  <a 
                    className="text-blue-600 hover:underline font-medium" 
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props} 
                  />
                ),
                code: (props) => (
                  <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-gray-800" {...props} />
                ),
                pre: (props) => (
                  <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto my-6 text-sm" {...props} />
                ),
                blockquote: (props) => (
                  <blockquote className="pl-4 border-l-4 border-gray-200 italic my-6 text-gray-700" {...props} />
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
} 
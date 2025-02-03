import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  if (!params?.slug) {
    notFound();
  }

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
            <span className="text-purple-600 font-medium">{post.author}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-emerald-600 font-medium">{new Date(post.date).toLocaleDateString('tr-TR')}</span>
            {post.tags && (
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
            <Markdown
              options={{
                overrides: {
                  h2: {
                    props: {
                      className: 'text-3xl font-bold mt-8 mb-4',
                    },
                  },
                  h3: {
                    props: {
                      className: 'text-2xl font-bold mt-6 mb-3',
                    },
                  },
                  p: {
                    props: {
                      className: 'mb-4 leading-relaxed',
                    },
                  },
                  a: {
                    props: {
                      className: 'text-blue-600 hover:text-blue-800',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                  },
                  code: {
                    props: {
                      className: 'bg-gray-100 rounded px-1 py-0.5',
                    },
                  },
                  pre: {
                    props: {
                      className: 'bg-gray-100 rounded-lg p-4 overflow-x-auto my-4',
                    },
                  },
                  ul: {
                    props: {
                      className: 'list-disc pl-6 mb-4',
                    },
                  },
                  ol: {
                    props: {
                      className: 'list-decimal pl-6 mb-4',
                    },
                  },
                  li: {
                    props: {
                      className: 'mb-2',
                    },
                  },
                },
              }}
            >
              {post.content}
            </Markdown>
          </div>
        </article>
      </main>
    );
  } catch (error) {
    notFound();
  }
} 
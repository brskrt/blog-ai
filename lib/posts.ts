import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  author: string;
  slug: string;
  tags: string[];
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    const allPostsWithNull = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const post = await getPostBySlug(slug);
        return post;
      })
    );

    // Filter out null values and sort posts
    const allPosts = allPostsWithNull.filter((post): post is Post => post !== null);
    
    return allPosts.sort((post1, post2) => {
      if (post1.date < post2.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id: slug,
      title: data.title,
      date: data.date,
      content: content,
      author: data.author || 'Barış Kurt',
      slug: slug,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
} 
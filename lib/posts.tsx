import { glob } from 'glob';
import * as matter from 'gray-matter';
import fs from "fs";

export interface Post {
  title: string;
  path: string;
  excerpt: string;
  hero?: string;
  slug: string;
  date: Date;
}

export interface PostFrontmatter {
  title: string;
  hero?: string;
  hideHero?: boolean;
  image?: string;
  date: string;
}

export async function getAllPosts() {
  const regex = /^siteContent\/posts\/(.*)\/page\.mdx$/;

  let jsfiles = await glob('siteContent/posts/**/*.mdx', {
    ignore: 'node_modules/**'
  });
  const posts: Post[] = jsfiles.map((file) => {
    const fileContents = fs.readFileSync(file, 'utf-8')
      .split('\n')
      .filter(line => !line.trim().startsWith('import'))
      .join('\n');

    const slug = file.match(regex)?.[1] ?? '';
    const m = matter.default(fileContents, {
      excerpt: true,
      excerpt_separator: '{/* --- */}'
    });
    return {
      title: m.data['title'],
      excerpt: m.excerpt || m.content,
      hero: m.data['hero'],
      hideHero: m.data['hideHero'],
      date: m.data['date'],
      path: '/post/' + slug,
      slug
    };
  });

  // Sort them from newest to oldest
  posts.sort((a, b) => (+b.date - +a.date));

  return posts;
}

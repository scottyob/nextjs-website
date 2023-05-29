import { glob } from 'glob';
import * as matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';

export interface Post {
  title: string;
  path: string;
  excerpt: string;
  hero?: string;
  slug: string;
}

export interface PostFrontmatter {
  title: string;
}

export async function getAllPosts() {
  const regex = /^siteContent\/posts\/(.*)\/page\.mdx$/;

  let jsfiles = await glob('siteContent/posts/**/*.mdx', {
    ignore: 'node_modules/**'
  });
  const posts: Post[] = jsfiles.map((file) => {
    const slug = file.match(regex)?.[1] ?? '';
    const m = matter.read(file, {
      excerpt: true,
      excerpt_separator: '{/* EXCERPT */}'
    });
    return {
      title: m.data['title'],
      excerpt: m.excerpt || m.content,
      hero: m.data['hero'],
      path: '/post/' + slug + '/',
      slug
    };
  });
  return posts;
}

import { glob } from 'glob';
import matter from 'gray-matter';

export interface Recipe {
  title: string;
  slug: string;
  img?: string;
  categories: string[];
}

export async function getAllRecipes() {
  const regex = /^siteContent\/recipes\/(.*)\/.*mdx$/;

  let jsfiles = await glob('siteContent/recipes/**/*.mdx', {
    ignore: 'node_modules/**'
  });
  const recipes: Recipe[] = jsfiles.map((file) => {
    const slug = file.match(regex)?.[1] ?? '';
    const m = matter.read(file, {
      excerpt: true,
      excerpt_separator: '{/* EXCERPT */}'
    });
    return {
      title: m.data['title'] || m.data['Title'],
      img: m.data['img'],
      categories: m.data['categories'] || [],
      slug
    };
  });
  return recipes;
}

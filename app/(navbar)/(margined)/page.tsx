import Article from '@/components/Article.react';
import { getAllPosts } from '@/lib/posts';

export default async function Home() {
  const posts = (await getAllPosts()).map((p, i) => {
    const imagePlacement = i % 2 == 0 ? 'left' : 'right';

    // @ts-expect-error Server Component
    return <Article key={p.path} post={p} imagePlacement={imagePlacement} />
  });

  return <div>{posts}</div>;
}

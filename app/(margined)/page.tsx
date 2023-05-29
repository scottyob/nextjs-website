import Article from '@/components/Article.react';
import { getAllPosts } from '@/lib/posts';

export default async function Home() {
  const posts = (await getAllPosts()).map((p) => (
    // @ts-expect-error Server Component
    <Article key={p.path} post={p} />
  ));

  return <div>{posts}</div>;
}

import Article from "@/components/Article.react";
import { getAllPosts } from "@/lib/posts";


export default async function Home() {
  {/* @ts-expect-error Server Component */}
  const posts = (await getAllPosts()).map(p => <Article key={p.path} post={p} />);
  
  return (
    <div>
      {posts}
    </div>
  );
}

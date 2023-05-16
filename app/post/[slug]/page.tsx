import { PostFrontmatter, getAllPosts } from "@/lib/posts";
import { DM_Sans, DM_Serif_Display } from "next/font/google";

const titleFont = DM_Serif_Display({ weight: "400", subsets: ["latin"] });
const articleFont = DM_Sans({ weight: "400", subsets: ["latin"] });

type PostProps = {
  params: { slug: string };
};

export default async function Post(props: PostProps) {
  // Load up the MDX post
  const {frontmatter, default: Component} = await import(`/posts/${props.params.slug}/page.mdx`);
  const meta = frontmatter as PostFrontmatter;

  return <article className="prose lg:prose-lg">
    <div className={articleFont.className + " mb-9"}>
      <h2>{meta.title}</h2>
      <Component />
    </div>
  </article>
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => {return {slug: p.slug}});
}
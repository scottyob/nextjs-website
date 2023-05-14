import { PostFrontmatter } from "@/lib/posts";

type PostProps = {
  params: { slug: string };
};

export default async function Post(props: PostProps) {
  // Load up the MDX post
  const {frontmatter, default: Component} = await import(`/posts/${props.params.slug}/page.mdx`);
  const meta = frontmatter as PostFrontmatter;

  return <article>
    <h2>{meta.title}</h2>
    <Component />
  </article>
}

import { PostFrontmatter, getAllPosts } from '@/lib/posts';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import Image from "next/image";

const titleFont = DM_Serif_Display({ weight: '400', subsets: ['latin'] });
const articleFont = DM_Sans({ weight: '400', subsets: ['latin'] });

type PostProps = {
  params: { slug: string[] };
};

export default async function Post(props: PostProps) {
  // Load up the MDX post
  const { frontmatter, default: Component } = await import(
    `/siteContent/posts/${props.params.slug.join('/')}/page.mdx`
  );
  const meta = frontmatter as PostFrontmatter;

  let hero = undefined;
  if (meta.hero != null) {
    const img = (
      await import(`/siteContent/posts/${props.params.slug.join('/')}/${meta.hero}`)
    ).default;

    hero = <div className="not-prose">
      <Image src={img} alt="Post picture" />
    </div>;
  }

  return (
    <article className="prose lg:prose-lg">
      <div className={articleFont.className + ' mb-9'}>
        <h2>{meta.title}</h2>
        {hero}
        <Component />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => {
    return { slug: p.slug.split('/') };
  });
}

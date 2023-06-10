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

  const date = new Date(meta.date);

  let hero = undefined;
  if (meta.hero != null) {
    const img = (
      await import(`/siteContent/posts/${props.params.slug.join('/')}/${meta.hero}`)
    ).default;

    hero = <Image src={img} alt="Post picture" className="m-auto mb-5" />;
  }

  return (
    <article className="">
      <div className={articleFont.className + ' mb-9'}>
        <h2 className={titleFont.className + " text-2xl"}>{meta.title}</h2>
        <div className="text-xs text-gray-400 italic mb-5">
          Created: {date.toLocaleDateString()}
        </div>
        {hero}
        <div className="prose lg:prose-lg">
          <Component />
        </div>
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

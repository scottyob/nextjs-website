import { getAllRecipes } from '@/lib/recipes';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';

const titleFont = DM_Serif_Display({ weight: '400', subsets: ['latin'] });
const articleFont = DM_Sans({ weight: '400', subsets: ['latin'] });
import Image from 'next/image';
import Link from 'next/link';

type RecipeProps = {
  params: { slug: string };
};

export default async function Recipe(props: RecipeProps) {
  // Load up the MDX post

  const { frontmatter, default: Component } = await import(
    `/siteContent/recipes/${props.params.slug}/index.mdx`
  );
  const meta = frontmatter;

  let img = <></>;
  if (meta.img != null) {
    const imgModule = (
      await import(`/siteContent/recipes/${props.params.slug}/${meta.img}`)
    ).default;
    img = (
      <Link href={imgModule.src}>
        <Image src={imgModule} alt={meta.Title} className="m-auto w-[80%]" />
      </Link>
    );
  }

  return (
    <article className="prose">
      <div className={articleFont.className + ' mb-9'}>
        <h2 className="text-center">{meta.Title}</h2>
        {img}
        <Component />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getAllRecipes();
  return posts.map((p) => {
    return { slug: p.slug };
  });
}

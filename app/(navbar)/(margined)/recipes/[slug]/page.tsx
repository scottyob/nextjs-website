import { getAllRecipes } from '@/lib/recipes';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';

const titleFont = DM_Serif_Display({ weight: '400', subsets: ['latin'] });
const articleFont = DM_Sans({ weight: '400', subsets: ['latin'] });
import Image from 'next/image';
import RecipeList from '../components/RecipeList';

type RecipeProps = {
  params: { slug: string };
};

export default async function Recipe(props: RecipeProps) {
  // Check if this slug matches a category listing
  // and render the recipe list if it's a category
  const recipies = await getAllRecipes();
  const categories = new Set(recipies.flatMap((r) => r.categories));
  if (categories.has(props.params.slug)) {
    return <RecipeList recipies={recipies} filteredTag={props.params.slug} />;
  }

  // Load up the MDX post
  const { frontmatter, default: Component } = await import(
    `/siteContent/recipes/${props.params.slug}/index.mdx`
  );
  const meta = frontmatter;
  const recipe = recipies.find((r) => r.slug === props.params.slug);

  // Recipe Image
  let img = <></>;
  if (meta.img != null) {
    const imgModule = (
      await import(`/siteContent/recipes/${props.params.slug}/${meta.img}`)
    ).default;
    img = (
      <a href={imgModule.src}>
        <Image src={imgModule} alt={meta.Title} className="m-auto w-[80%]" />
      </a>
    );
  }

  // Recipe Tags
  const tags = recipe?.categories?.map((t) => (
    <a href={`/recipes/${t}`} key={t} className='p-1'>
      {t}
    </a>
  ));

  return (
    <article className="prose">
      <div className={articleFont.className + ' mb-9'}>
        <div className='pb-4 text-center'>
          <h2 className="pb-1 mb-0">{meta.Title}</h2>
          <div className="text-sm italic">
            {tags}
          </div>
        </div>
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

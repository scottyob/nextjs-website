import { getAllRecipes } from '@/lib/recipes';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';

const titleFont = DM_Serif_Display({ weight: '400', subsets: ['latin'] });
const articleFont = DM_Sans({ weight: '400', subsets: ['latin'] });
import Image from 'next/image';
import RecipeList from '../components/RecipeList';
import { Metadata, ResolvingMetadata } from 'next/types';

type RecipeProps = {
  params: { slug: string };
};

// Pulls out post componet and metadata for a given slug
async function recipeMetadata(slug: string) {
  const { frontmatter, default: Component } = await import(
    `/siteContent/recipes/${slug}/index.mdx`
  );

  const imgModule = frontmatter.img ? (
    await import(`/siteContent/recipes/${slug}/${frontmatter.img}`)
  ).default : undefined;

  return {
    frontmatter,
    Component,
    imgModule
  }
}

export default async function Recipe(props: RecipeProps) {
  // Check if this slug matches a category listing
  // and render the recipe list if it's a category
  const recipies = await getAllRecipes();
  const recipe = recipies.find((r) => r.slug === props.params.slug);
  if(!recipe) {
    throw Error("No recipe found");
  }

  const categories = new Set(recipies.flatMap((r) => r.categories));
  if (categories.has(props.params.slug)) {
    return <RecipeList recipies={recipies} filteredTag={props.params.slug} />;
  }

  // Load up the MDX post
  const recipeData = await recipeMetadata(props.params.slug);

  // Recipe Image
  let img = <></>;
  if (recipeData.imgModule) {
    const imgModule = recipeData.imgModule;
    img = (
      <a href={imgModule.src}>
        <Image src={imgModule} alt={recipe?.title} className="m-auto w-[80%]" />
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
          <h2 className="pb-1 mb-0">{recipe.title}</h2>
          <div className="text-sm italic">
            {tags}
          </div>
        </div>
        {img}
        <recipeData.Component />
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

export async function generateMetadata(props: RecipeProps, parent: ResolvingMetadata): Promise<Metadata> {
  const recipies = await getAllRecipes();
  const recipe = recipies.find((r) => r.slug === props.params.slug);
  if(!recipe) {
    throw Error("No recipe found");
  }

  // Load the metadata and image data from recipe
  const recipeData = await recipeMetadata(props.params.slug);

  // access and extend parent metadata
  const previousImages = (await parent).openGraph?.images || []

  const title = `Recipe: ${recipe.title}`;
  return {
    title, 
    openGraph: {
      images: [recipeData.imgModule.src, ...previousImages],
      title,
      description: recipe.title
    }
  }
}

import { Recipe } from '@/lib/recipes';
import Link from 'next/link';
import Image from 'next/image';

export async function RecipeCard(props: { recipe: Recipe }) {
  const recipe = props.recipe;

  let img = <div className="grow"></div>;
  if (recipe?.img != null) {
    const imgModule = (
      await import(`/siteContent/recipes/${recipe.slug}/${recipe.img}`)
    ).default;
    img = (
      <Image
        className="object-cover aspect-square"
        src={imgModule}
        alt={recipe.title}
        width={250}
        height={250}
      />
    );
  }

  return (
    <Link
      href={`/recipes/${recipe.slug}/`}
      className="text-sm md:text-base w-24 md:w-52 p-3 flex flex-col md:min-h-[274px] transition hover:translate-y-2 hover:scale-110"
    >
      {img}
      <h2 className="text-center">{recipe.title}</h2>
    </Link>
  );
}

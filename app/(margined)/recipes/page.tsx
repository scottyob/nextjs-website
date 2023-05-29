// import { getAllRecipes } from "@/lib/recipes"

import { getAllRecipes } from '@/lib/recipes';
import { RecipeCard } from './RecipeCard';

export default async function Home() {
  {
    /* @ts-expect-error Server Component */
  }
  const cards = (await getAllRecipes()).map((r) => (
    <RecipeCard key={r.path} recipe={r} />
  ));

  return <div className="flex flex-row flex-wrap">{cards}</div>;
}

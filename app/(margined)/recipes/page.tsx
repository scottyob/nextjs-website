import { getAllRecipes } from '@/lib/recipes';
import { RecipeCard } from './RecipeCard';

export default async function Home() {
  const cards = (await getAllRecipes()).map((r) => (
    // @ts-expect-error Server Component
    <RecipeCard key={r.path} recipe={r} />
  ));

  return <div className="flex flex-row flex-wrap">{cards}</div>;
}

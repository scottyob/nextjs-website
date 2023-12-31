import { Recipe, getAllRecipes } from '@/lib/recipes';
import { RecipeCard } from './RecipeCard';
import Link from 'next/link';

export default function RecipeList(props: {
  recipies: Recipe[];
  filteredTag?: string;
}) {
  // Get a list of recipies
  let { recipies } = props;

  // Build a list of tags for taxonomy
  const tagStyles = {
    selected: 'bg-green-200 font-bold',
    unselected: 'bg-gray-200',
    common: 'rounded-md text-sm p-1 mb-1'
  };

  const allTags = new Set(recipies.flatMap((r) => r.categories));
  const categoryLinks = Array.from(allTags)
    .sort()
    .map((tag) => {
      // Check if this tag is the one selected
      const selected = tag === props.filteredTag;

      // Get the formatting
      const className = [
        tagStyles.common,
        selected ? tagStyles.selected : tagStyles.unselected
      ].join(' ');

      // Get the link (if tag selected, unselect)
      const href = selected ? '/recipes' : `/recipes/${tag}`;

      return (
        <span key={tag} className={className}>
          <Link href={href}>{tag}</Link>
        </span>
      );
    });

  // Filter out the recipies that match this category
  const filteredTag = props.filteredTag;
  if (filteredTag) {
    recipies = recipies.filter((r) => r.categories.indexOf(filteredTag) != -1);
  }

  // Recipe Cards
  const cards = recipies.map((r) => (
    // @ts-expect-error Server Component
    <RecipeCard key={r.path} recipe={r} />
  ));

  return (
    <>
      <div className="mb-4 flex flex-row flex-wrap justify-center space-x-3">
        {categoryLinks}
      </div>
      <div className="flex flex-row flex-wrap justify-center">{cards}</div>
    </>
  );
}

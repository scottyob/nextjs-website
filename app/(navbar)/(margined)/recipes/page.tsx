import { getAllRecipes } from "@/lib/recipes";
import RecipeList from "./components/RecipeList";

export default async function Home() {

  const recipies = await getAllRecipes();

  return <RecipeList recipies={recipies} />

}

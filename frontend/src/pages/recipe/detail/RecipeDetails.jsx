import React from "react";
import RecipeDetail from "@/components/features/recipe-detail/RecipeDetail";
import IngredientsSection from "@/components/features/recipe-detail/IngredientsSection";

const RecipeDetails = () => {
  return (
    <div>
      <RecipeDetail />
      <IngredientsSection />
    </div>
  );
};

export default RecipeDetails;

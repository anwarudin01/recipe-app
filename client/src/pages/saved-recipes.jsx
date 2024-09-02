import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipes/savedRecipes/${userID}`,
          { userID }
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedRecipe();
  }, [userID]);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>

            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>

            <img src={recipe.imageUrl} alt={recipe.name} />

            <p>Coocing Time : {recipe.coocingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

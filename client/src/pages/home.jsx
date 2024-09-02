import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipes/savedRecipes/ids/${userID}`,
          { userID }
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, [userID, cookies.access_token]);

  const SaveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => SaveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
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

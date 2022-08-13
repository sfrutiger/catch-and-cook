import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";

const AddRecipe = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");

  const updatePost = (recipeIDs) => {
    auth.currentUser.getIdToken(true).then(function (idToken) {
      axios
        .post(
          "/api/posts",
          {
            recipes: recipeIDs,
          },
          {
            headers: {
              authtoken: idToken,
            },
          }
        )
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const addRecipe = () => {
    auth.currentUser.getIdToken(true).then(function (idToken) {
      console.log(user.uid);
      try {
        axios
          .post(
            "/api/recipes",
            {
              author: user.uid,
              name: recipeName,
              ingredients: recipeIngredients,
              instructions: recipeInstructions,
            },
            {
              headers: {
                authtoken: idToken,
              },
            }
          )
          .then(function () {
            return updatePost();
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleSubmit = (e) => {
    try {
      addRecipe();
      navigate("/myposts");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <form>
        <div className="flex flex-col py-2">
          <label className="py-2">Recipe name </label>
          <input
            onChange={(e) => setRecipeName(e.target.value)}
            className="border py-1"
            type="text"
            value={recipeName}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2">Ingredients</label>
          <textarea
            onChange={(e) => setRecipeIngredients(e.target.value)}
            className="border py-1"
            type="text"
            value={recipeIngredients}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2">Instructions</label>
          <textarea
            onChange={(e) => setRecipeInstructions(e.target.value)}
            className="border py-1"
            type="text"
            value={recipeInstructions}
          />
        </div>
      </form>
      <div className="flex flex-row">
        <Link to="/myposts" className="w-full mr-1">
          <button className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2">
            Cancel
          </button>
        </Link>
        <button
          onClick={() => handleSubmit()}
          className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2 ml-1"
        >
          Add recipe
        </button>
      </div>
    </div>
  );
};

export default AddRecipe;

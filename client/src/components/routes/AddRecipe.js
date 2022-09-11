import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";

const AddRecipe = ({ setMyPosts, postEdited, setPostEdited }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const location = useLocation();
  const post = location.state[0];
  const recipe = location.state[1];
  const [recipeName, setRecipeName] = useState(recipe ? recipe.name : "");
  const [recipeIngredients, setRecipeIngredients] = useState(
    recipe ? recipe.ingredients : ""
  );
  const [recipeInstructions, setRecipeInstructions] = useState(
    recipe ? recipe.instructions : ""
  );

  const updatePost = (response) => {
    const updatedRecipes = [...post.recipes, response.data._id];
    auth.currentUser.getIdToken(true).then(function (idToken) {
      axios
        .patch(
          `/api/posts/${post._id}`,
          {
            recipes: updatedRecipes,
          },
          {
            headers: {
              authtoken: idToken,
            },
          }
        )
        .then(function () {
          setPostEdited(postEdited + 1);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const addRecipe = () => {
    auth.currentUser.getIdToken(true).then(function (idToken) {
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
          .then(function (response) {
            return updatePost(response);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const editRecipe = () => {
    auth.currentUser.getIdToken(true).then(function (idToken) {
      try {
        axios.patch(
          `/api/recipes/${recipe._id}`,
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
        );
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (recipe) {
        editRecipe();
      } else {
        addRecipe();
      }
    } catch (error) {
      console.log(error.message);
    }
    setMyPosts([]);
    navigate("/myposts");
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
          onClick={(e) => handleSubmit(e)}
          className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2 ml-1"
        >
          Save recipe
        </button>
      </div>
    </div>
  );
};

export default AddRecipe;

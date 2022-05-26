import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const [recipes, setRecipes] = useState([]);
  const [skip, setSkip] = useState(0);

  let recipeIDs;
  if (post.recipes[0] != "") {
    recipeIDs = post.recipes;
  } else recipeIDs = null;

  console.log(recipeIDs);

  let latitude = post.location[1];
  latitude = Math.round(latitude * 1000) / 1000;
  if (latitude > 0) {
    latitude = latitude + "° N";
  } else if (latitude < 0) {
    latitude = Math.abs(latitude) + "° S";
  } else {
    latitude = latitude + "°";
  }

  let longitude = post.location[0];
  longitude = Math.round(longitude * 1000) / 1000;
  if (longitude > 0) {
    longitude = longitude + "° E";
  } else if (longitude < 0) {
    longitude = Math.abs(longitude) + "° W";
  } else {
    longitude = longitude + "°";
  }

  const getRecipes = async () => {
    try {
      const response = await axios.get(`/api/recipes`, {
        params: {
          recipeIDs: recipeIDs.reduce((x, y) => `${x},${y}`),
        },
      });
      setRecipes(response.data);
    } catch (e) {}
  };

  useEffect(() => {
    getRecipes();
  }, [skip]);

  return (
    <>
      {post._id ? (
        <div className="shadow-3xl w-full max-w-[700px] mb-4 p-4">
          <div className="flex justify-between mb-2">
            <div className="flex flex-col items-start">
              <p>{post.author.email}</p>
              {post.conditions ? (
                <>
                  <p>{post.conditions.data.currentConditions.conditions}</p>
                  <p>
                    Temperature: {post.conditions.data.currentConditions.temp}{" "}
                    °F
                  </p>
                  <p>
                    Wind: {post.conditions.data.currentConditions.windspeed} mph
                  </p>
                  <p>
                    Pressure: {post.conditions.data.currentConditions.pressure}{" "}
                    millibars
                  </p>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col items-end">
              <p>{post.date}</p>
              <p>
                Location: {latitude}, {longitude}
              </p>
              <p>Species: {post.species}</p>
              <p>Method: {post.method}</p>
            </div>
          </div>
          <img src={post.pictureDownloadURL} alt="catch" />
          {recipeIDs ? (
            <div className="mt-4">
              <p>Recipes:</p>
              <div className="flex">
                {recipes.map((recipe) => (
                  <Link
                    to={`/recipedetails/${recipe._id}`}
                    state={recipe}
                    key={recipe._id}
                    className="mr-8"
                  >
                    <div className="cursor-pointer">{recipe.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Post;

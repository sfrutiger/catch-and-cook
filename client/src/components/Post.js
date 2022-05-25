import { useState, useEffect } from "react";
import axios from "axios";

const Post = ({ post }) => {
  const [recipes, setRecipes] = useState([]);
  const [skip, setSkip] = useState(0);

  const getRecipes = async () => {
    try {
      const response = await axios.get(`/api/recipes?skip=${skip}`);
      if (recipes.length > 0) {
        setRecipes([...recipes, ...response.data]);
      } else {
        setRecipes(response.data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getRecipes();
  }, [skip]);

  return (
    <>
      {post._id ? (
        <div className="shadow-3xl w-full max-w-[700px] mb-4 p-4">
          <p>{post.author.email}</p>
          <img src={post.pictureDownloadURL} alt="catch" />
          <p>{post.date}</p>
          <p>
            {post.location[1]}, {post.location[0]}
          </p>

          {post.conditions ? (
            <>
              <p>{post.conditions.data.currentConditions.conditions}</p>
              <p>
                Temperature: {post.conditions.data.currentConditions.temp} °F
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
          <p>{post.species}</p>
          <p>{post.method}</p>
          {recipes.length ? (
            <>
              <p>Recipes:</p>
              <div>
                {recipes.map((recipe) => (
                  <div key={recipe._id} className="cursor-pointer">
                    {recipe.title}
                  </div>
                ))}
              </div>
            </>
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

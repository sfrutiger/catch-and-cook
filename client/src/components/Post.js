import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSpinner, FaTimes, FaEdit } from "react-icons/fa";
import Switch from "./Switch";
import { getAuth } from "firebase/auth";

const Post = ({
  post,
  feedPosition,
  setUserFeedId,
  generalFeed,
  myFeed,
  myPosts,
  setMyPosts,
  posts,
  setPosts,
  postEdited,
}) => {
  const [postRecipes, setPostRecipes] = useState([]);
  const [skip, setSkip] = useState(0);
  const [authorUsername, setAuthorUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const [shareCoordinates, setShareCoordinates] = useState(
    post.shareCoordinates
  );

  let address;
  if (post.location.length) {
    address = post.location[0].formatted_address;
  }

  let latitude = post.coordinates[1];
  latitude = Math.round(latitude * 1000) / 1000;
  if (latitude > 0) {
    latitude = latitude + "° N";
  } else if (latitude < 0) {
    latitude = Math.abs(latitude) + "° S";
  } else {
    latitude = latitude + "°";
  }

  let longitude = post.coordinates[0];
  longitude = Math.round(longitude * 1000) / 1000;
  if (longitude > 0) {
    longitude = longitude + "° E";
  } else if (longitude < 0) {
    longitude = Math.abs(longitude) + "° W";
  } else {
    longitude = longitude + "°";
  }

  const coordinates = latitude + ", " + longitude;

  // handle retrieving linked recipes from database
  let recipeIDs;
  if (post.recipes.length) {
    recipeIDs = post.recipes;
  } else recipeIDs = null;

  const getRecipes = async () => {
    try {
      const response = await axios.get(`/api/recipes`, {
        params: {
          recipes: recipeIDs.reduce((x, y) => `${x},${y}`),
        },
      });
      setPostRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthorUsername = async () => {
    try {
      const response = await axios.get("/api/users", {
        params: {
          criteria: "authorUID",
          authorUID: post.authorUID,
        },
      });
      setAuthorUsername(response.data[0].displayName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthorUsername();
  }, []);

  useEffect(() => {
    getRecipes();
  }, [postEdited]);

  const handleClick = () => {
    sessionStorage.setItem("scrollPosition", feedPosition);
    setUserFeedId(post.authorUID);
  };

  const deletePost = () => {
    //move to protected route
    const id = post._id;
    if (auth.currentUser.uid === post.authorUID) {
      auth.currentUser.getIdToken(true).then(function (idToken) {
        axios
          .delete(`/api/posts/${id}`, {
            headers: {
              authtoken: idToken,
            },
          })
          .then(function () {
            setMyPosts(myPosts.filter((post) => post._id !== id));
            setPosts(posts.filter((post) => post._id !== id));
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    } else {
      console.log("Access denied. Only post auther can delete post");
    }
  };

  const deleteRecipe = (recipe) => {
    //move to protected route
    const id = recipe._id;
    if (auth.currentUser.uid === recipe.authorUID) {
      auth.currentUser.getIdToken(true).then(function (idToken) {
        axios
          .delete(`/api/recipes/${id}`, {
            headers: {
              authtoken: idToken,
            },
          })
          .then(function () {
            getRecipes();
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    } else {
      console.log("Access denied. Only post auther can delete recipe");
    }
  };

  return (
    <>
      {post._id ? (
        <div className="shadow-3xl w-full max-w-[700px] mb-4 p-4">
          <div className="flex w-full justify-between mb-2">
            {myFeed ? (
              <>
                <Link to="/createpost" state={post}>
                  <FaEdit className="text-2xl mr-6 mb-2 cursor-pointer" />
                </Link>

                <FaTimes
                  className="text-2xl cursor-pointer"
                  onClick={deletePost}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex flex-col items-start">
              {generalFeed ? (
                <Link
                  to={`/userfeed/${post.authorUID}`}
                  state={[post, authorUsername]}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  <p className="curser-pointer hover:underline">
                    {authorUsername || "User"}
                  </p>
                </Link>
              ) : (
                ""
              )}
              <p>{post.date}</p>
              {address ? <p>{address}</p> : ""}
              {myFeed ? (
                <Switch
                  variable={coordinates}
                  value={shareCoordinates}
                  setValue={setShareCoordinates}
                />
              ) : (
                ""
              )}
              {shareCoordinates ? (
                <p className={`${myFeed ? "hidden" : ""}`}>{coordinates}</p>
              ) : (
                ""
              )}
              <p>Species: {post.species}</p>
              <p>Method: {post.method}</p>
            </div>
            <div className="flex flex-col items-end">
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
          </div>
          <div
            className="flex items-center"
            style={{ display: loading ? "block" : "none" }}
          >
            <FaSpinner
              icon="spinner"
              className="text-5xl animate-spin w-full"
            />
          </div>
          <div style={{ display: loading ? "none" : "block" }}>
            <img
              src={post.pictureDownloadURL}
              onLoad={() => setLoading(false)}
            />
          </div>
          {postRecipes.length ? (
            <div className="mt-4 w-full">
              <p>Recipes:</p>
              <div className="mt-2 grid sm:grid-cols-2 gap-x-4">
                {postRecipes.map((recipe) => (
                  <div key={recipe._id}>
                    <div className="shadow-3xl min-w-[150px] w-full text-center cursor-pointer mr-4 mb-4 flex flex-col justify-end">
                      {myFeed ? (
                        <div className="text-xl cursor-pointer p-2 pb-0 flex w-full  justify-between">
                          <Link to="/addrecipe" state={[post, recipe]}>
                            <FaEdit />
                          </Link>
                          <FaTimes
                            onClick={() => {
                              deleteRecipe(recipe);
                            }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <Link
                        to={`/recipedetails/${recipe._id}`}
                        state={recipe}
                        key={recipe._id}
                        onClick={() =>
                          sessionStorage.setItem("scrollPosition", feedPosition)
                        }
                      >
                        <div className="cursor-pointer flex items-center justify-center h-12 my-4 whitespace-pre-wrap">
                          {recipe.name}
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="my-4">No recipes yet</p>
          )}
          {myFeed ? (
            <Link to="/addrecipe" state={[post]}>
              <button className="buttons max-w-[200px] h-[40px]">
                Add recipe
              </button>
            </Link>
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

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaSpinner,
  FaTimes,
  FaEdit,
  FaTrashAlt,
  FaCheck,
} from "react-icons/fa";
import Switch from "./Switch";
import Map from "./routes/createpost/Map";
import { getAuth } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { roundHour } from "../functions";
import DeletePostConfirmation from "./DeletePostConfirmation";

const EditPost = ({
  feedPosition,
  myPosts,
  setMyPosts,
  posts,
  setPosts,
  postEdited,
  setPostEdited,
}) => {
  const locationState = useLocation();
  const navigate = useNavigate();
  const post = locationState.state;
  const [postRecipes, setPostRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const [shareCoordinates, setShareCoordinates] = useState(
    post.shareCoordinates
  );
  const [date, setDate] = useState(post.date);
  const [time, setTime] = useState(post.time);
  const [species, setSpecies] = useState(post.species);
  const [method, setMethod] = useState(post.method);
  const [coordinates, setCoordinates] = useState(post.coordinates);
  const [conditions, setConditions] = useState(post.conditions);
  const [location, setLocation] = useState(post.location);
  const [refetchConditions, setRefetchConditions] = useState(false);
  const isMounted = useRef(false);
  const isMountedTwo = useRef(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [typeOfDeletion, setTypeOfDeletion] = useState("");
  const [recipeToDelete, setRecipeToDelete] = useState("");

  let newConditions = conditions;

  let latitude = coordinates[1];
  latitude = Math.round(latitude * 1000) / 1000;
  if (latitude > 0) {
    latitude = latitude + "° N";
  } else if (latitude < 0) {
    latitude = Math.abs(latitude) + "° S";
  } else {
    latitude = latitude + "°";
  }

  let longitude = coordinates[0];
  longitude = Math.round(longitude * 1000) / 1000;
  if (longitude > 0) {
    longitude = longitude + "° E";
  } else if (longitude < 0) {
    longitude = Math.abs(longitude) + "° W";
  } else {
    longitude = longitude + "°";
  }

  // handle retrieving linked recipes from database
  let recipeIDs;
  if (post.recipes.length) {
    recipeIDs = post.recipes;
  } else recipeIDs = null;

  const getRecipes = async () => {
    if (recipeIDs) {
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
    }
  };

  useEffect(() => {
    getRecipes();
  }, [postEdited]);

  const deletePost = () => {
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
      console.log("Access denied. Only post author can delete post");
    }
  };

  const deleteRecipe = (recipe) => {
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
      console.log("Access denied. Only post author can delete recipe");
    }
  };

  const editPost = async (newConditions) => {
    if (auth.currentUser.uid === post.authorUID) {
      const response = await auth.currentUser
        .getIdToken(true)
        .then(function (idToken) {
          try {
            axios.patch(
              `/api/posts/${post._id}`,
              {
                species: species,
                date: date,
                time: time,
                location: location,
                coordinates: coordinates,
                shareCoordinates: shareCoordinates,
                conditions: newConditions,
                method: method,
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
        })
        .then(function () {
          setPostEdited(postEdited + 1);
        });
    } else {
      console.log("Access denied. Only post author can delete recipe");
    }
  };

  const [nearestDate, setNearestDate] = useState(date);
  const [nearestHour, setNearestHour] = useState("");

  useEffect(() => {
    const response = roundHour(date, time);
    setNearestHour(response[0]);
    setNearestDate(response[1]);
  }, [time, date]);

  // check if variables that effect conditions have been changed before sending API request
  useEffect(() => {
    if (isMounted.current) {
      setRefetchConditions(true);
    } else {
      isMounted.current = true;
    }
  }, [coordinates, date, time]);

  const reverseGeocode = (coordinates) => {
    try {
      auth.currentUser.getIdToken(true).then(function (idToken) {
        axios
          .get(
            `/api/data/reversegeocode?latitude=${coordinates[1]}&longitude=${coordinates[0]}`,
            {
              headers: {
                authtoken: idToken,
              },
            }
          )
          .then(function (response) {
            setLocation(response.data.response.results);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isMountedTwo.current) {
      reverseGeocode(coordinates);
    } else {
      isMountedTwo.current = true;
    }
  }, [coordinates]);

  const retrieveWeather = async () => {
    try {
      await auth.currentUser.getIdToken(true).then(async function (idToken) {
        const response = await axios.get(
          `/api/data/weather?nearestHour=${nearestHour}&nearestDate=${nearestDate}&latitude=${coordinates[1]}&longitude=${coordinates[0]}`,
          {
            headers: {
              authtoken: idToken,
            },
          }
        );
        newConditions = response.data.response;
        return newConditions;
      });
    } catch (error) {
      console.log(error);
    }
    return newConditions;
  };

  const discardChanges = () => {
    setMyPosts([]);
    navigate("/myposts");
  };

  const saveChanges = async () => {
    if (refetchConditions) {
      const response = await retrieveWeather();
      editPost(response).then(navigate("/myposts"));
    } else {
      editPost(newConditions).then(navigate("/myposts")); //figure out how to do this without rewriting conditions
    }
  };

  return (
    <>
      <DeletePostConfirmation
        deletePost={() => deletePost(post)}
        deleteRecipe={() => deleteRecipe(recipeToDelete)}
        myPosts={myPosts}
        setMyPosts={setMyPosts}
        typeOfDeletion={typeOfDeletion}
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
      ></DeletePostConfirmation>
      <div className="sticky top-0 w-full h-[60px] bg-secondary text-light flex justify-center">
        <div className="w-full max-w-[1500px] h-full flex items-center justify-around">
          <FaTimes
            onClick={() => discardChanges()}
            className="text-2xl cursor-pointer text-red-500"
          />
          <h1 className="text-xl w-[50%] max-w-[700px] text-center">
            Edit post
          </h1>
          <FaCheck
            onClick={() => saveChanges()}
            className="text-2xl cursor-pointer text-green-500"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-secondary shadow-3xl w-full max-w-[700px] mt-4 mb-20 p-4">
          <div className="flex w-full justify-between mb-2">
            <div
              className="max-w-[50%]"
              style={{ display: loading ? "none" : "block" }}
            >
              <img
                src={post.pictureDownloadURL}
                onLoad={() => setLoading(false)}
              />
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
            {post.conditions ? (
              <div className="ml-4 mt-8">
                <p>{conditions.currentConditions.conditions}</p>
                <p>Temperature: {conditions.currentConditions.temp} °F</p>
                <p>Wind: {conditions.currentConditions.windspeed} mph</p>
                <p>Pressure: {conditions.currentConditions.pressure} mbar</p>
              </div>
            ) : (
              ""
            )}
            <FaTrashAlt
              className="text-2xl cursor-pointer"
              onClick={() => {
                setTypeOfDeletion("post");
                setDeleteConfirmation(true);
              }}
            />
          </div>

          <form className="flex w-full justify-between mb-4">
            <div className="w-full max-w-[250px] mr-2">
              <div className="flex flex-col mb-2">
                <label className="">Date</label>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  className="border py-1"
                  type="date"
                  value={date}
                />
              </div>
              <div className="flex flex-col">
                <label className="">Time</label>
                <input
                  onChange={(e) => setTime(e.target.value)}
                  className="border py-1"
                  type="time"
                  value={time}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col mb-2">
                <label className="">Species</label>
                <input
                  onChange={(e) => setSpecies(e.target.value)}
                  className="border py-1"
                  type="text"
                  value={species}
                />
              </div>
              <div className="flex flex-col">
                <label className="">Method</label>
                <input
                  onChange={(e) => setMethod(e.target.value)}
                  className="border py-1"
                  type="text"
                  value={method}
                />
              </div>
            </div>
          </form>
          <Map
            defaultLat={coordinates[1]}
            defaultLong={coordinates[0]}
            setCoordinates={setCoordinates}
            mapHeight={"250px"}
          ></Map>
          <div className="flex flex-row justify-between py-2">
            <Switch
              name="location-secret"
              variable={"Share coordinates"}
              value={shareCoordinates}
              setValue={setShareCoordinates}
            />
            {coordinates ? (
              <div className={`${shareCoordinates ? "" : "opacity-50"}`}>
                {latitude}, {longitude}
              </div>
            ) : (
              <></>
            )}
            {location[0] ? (
              <div>{location[0].formatted_address}</div>
            ) : (
              <div></div>
            )}
          </div>
          {postRecipes.length ? (
            <div className="mt-4 w-full">
              <p>Recipes:</p>
              <div className="mt-2 grid sm:grid-cols-2 gap-x-4">
                {postRecipes.map((recipe) => (
                  <div key={recipe._id}>
                    <div className="buttons min-w-[150px] w-full text-center cursor-pointer mr-4 mb-4 flex flex-col justify-end">
                      <div className="text-xl cursor-pointer p-2 pb-0 flex w-full  justify-between">
                        <Link to="/addrecipe" state={[post, recipe]}>
                          <FaEdit />
                        </Link>
                        <FaTrashAlt
                          onClick={() => {
                            setTypeOfDeletion("recipe");
                            setRecipeToDelete(recipe);
                            setDeleteConfirmation(true);
                          }}
                        />
                      </div>
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
          <Link to="/addrecipe" state={[post]}>
            <button className="buttons max-w-[200px] h-[40px]">
              Add recipe
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EditPost;

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSpinner, FaFontAwesomeFlag, FaEdit, FaUser } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import ReportConfirmation from "./ReportConfirmation";

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
  const [reportConfirmation, setReportConfirmation] = useState(false);

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
      if (recipeIDs) {
        const response = await axios.get(`/api/recipes`, {
          params: {
            recipes: recipeIDs.reduce((x, y) => `${x},${y}`),
          },
        });
        setPostRecipes(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthorUsername = async () => {
    try {
      const response = await axios.get("/api/users", {
        params: {
          criteria: "uid",
          uid: post.authorUID,
        },
      });
      setAuthorUsername(response.data[0].username);
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

  return (
    <div className="bg-secondary rounded-lg border-2 border-secondary w-full max-w-[700px] mb-4 p-4 relative">
      <ReportConfirmation
        post={post}
        postType={"post"}
        reportConfirmation={reportConfirmation}
        setReportConfirmation={setReportConfirmation}
      />
      <div className="flex w-full justify-end mb-2">
        {myFeed ? (
          <>
            <Link to={`/editpost/${post._id}`} state={post}>
              <FaEdit className="text-2xl mb-2 cursor-pointer" />
            </Link>
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
              <div className="flex items-baseline">
                <FaUser />
                <p className="curser-pointer hover:underline font-semibold ml-2">
                  {authorUsername || "User"}
                </p>
              </div>
            </Link>
          ) : (
            ""
          )}
          <p>{post.date}</p>
          <p>{post.time}</p>
          {address ? <p>{address}</p> : ""}
          {shareCoordinates ? <p>{coordinates}</p> : ""}
          <p>Species: {post.species}</p>
          <p>Method: {post.method}</p>
        </div>
        <div className="flex flex-col items-end">
          {post.conditions.currentConditions ? (
            <>
              <p>{post.conditions.currentConditions.conditions}</p>
              <p>Temperature: {post.conditions.currentConditions.temp} °F</p>
              <p>Wind: {post.conditions.currentConditions.windspeed} mph</p>
              <p>
                Pressure: {post.conditions.currentConditions.pressure} millibars
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
        <FaSpinner icon="spinner" className="text-5xl animate-spin w-full" />
      </div>
      <div style={{ display: loading ? "none" : "block" }}>
        <img src={post.pictureDownloadURL} onLoad={() => setLoading(false)} />
      </div>
      {postRecipes.length ? (
        <div className="mt-4 w-full">
          <p className="font-semibold">Recipes:</p>
          <div className="mt-2 grid sm:grid-cols-2 gap-x-4">
            {postRecipes.map((recipe) => (
              <div key={recipe._id}>
                <div className="buttons min-w-[150px] w-full text-center cursor-pointer mr-4 mb-4 flex flex-col justify-end">
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
      {!myFeed ? (
        <div
          className="flex items-baseline text-sm w-full justify-end cursor-pointer"
          onClick={() => setReportConfirmation(true)}
        >
          <FaFontAwesomeFlag className="transform scale-x-[-1] mr-1" />
          <p>Report</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;

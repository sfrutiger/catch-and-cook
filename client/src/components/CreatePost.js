import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";

const CreatePost = ({ getPosts }) => {
  const [species, setSpecies] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [conditions, setConditions] = useState("");
  const [method, setMethod] = useState("");
  const [details, setDetails] = useState("");
  const [recipes, setRecipes] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const createPost = () => {
    auth.currentUser.getIdToken(true).then(function (idToken) {
      axios
        .post(
          "/api/posts",
          {
            author: user,
            species: species,
            date: date,
            location: location,
            conditions: conditions,
            method: method,
            details: details,
            recipes: recipes,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(
        user,
        species,
        date,
        location,
        conditions,
        method,
        details,
        recipes
      );
      getPosts();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="flex flex-col items-center my-8">
      <h1 className="text-2xl">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2">Species</label>
          <textarea
            onChange={(e) => setSpecies(e.target.value)}
            className="border py-1"
            type="text"
          />
        </div>
        <div className="form-items">
          <label className="py-2">Date</label>
          <input
            onChange={(e) => setDate(e.target.value)}
            className="border p-1"
            type="text"
          />
        </div>
        <div className="form-items">
          <label className="py-2">Location</label>
          <input
            onChange={(e) => setLocation(e.target.value)}
            className="border p-1"
            type="text"
          />
        </div>
        <div className="form-items">
          <label className="py-2">Conditions</label>
          <input
            onChange={(e) => setConditions(e.target.value)}
            className="border p-1"
            type="text"
          />
        </div>
        <div className="form-items">
          <label className="py-2">Method</label>
          <input
            onChange={(e) => setMethod(e.target.value)}
            className="border p-1"
            type="text"
          />
        </div>
        <div className="form-items">
          <label className="py-2">Details</label>
          <input
            onChange={(e) => setDetails(e.target.value)}
            className="border p-1"
            type="text"
          />
        </div>
        <div className="form-items">
          <label className="py-2">Recipes</label>
          <input
            onChange={(e) => setRecipes(e.target.value)}
            className="border p-1"
            type="text"
          />
        </div>
        <button className="buttons mt-4">Submit</button>
        <Link to="/" className="w-full">
          <button className="buttons mt-2">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreatePost;

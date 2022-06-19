import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import Picture from "./Picture";
import SpeciesAndMethod from "./SpeciesAndMethods";
import LocationAndConditions from "./LocationAndConditions";
import Recipes from "./Recipes";
import Confirm from "./Confirm";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreatePost = ({ posts, setPosts }) => {
  const [step, setStep] = useState(1);
  const [picture, setPicture] = useState(null);
  const [picturePreviewURL, setPicturePreviewURL] = useState("");
  const [species, setSpecies] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [conditions, setConditions] = useState([""]);
  const [method, setMethod] = useState("");
  /* const [recipeIDs, setRecipeIDs] = useState([]); */
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Return to previous step
  const previousStep = () => {
    setStep(step - 1);
  };

  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  console.log(auth.currentUser);

  const createPost = (recipeIDs) => {
    auth.currentUser.getIdToken(true).then(function (idToken) {
      axios
        .post(
          "/api/posts",
          {
            author: user,
            pictureDownloadURL: downloadURL,
            species: species,
            date: date,
            time: time,
            location: location,
            conditions: conditions,
            method: method,
            recipes: recipeIDs,
          },
          {
            headers: {
              authtoken: idToken,
            },
          }
        )
        .then(function (response) {
          setPosts((posts) => [response.data, ...posts]);
        })
        .then(() => console.log(recipeIDs))
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  let recipeIDs = [];

  const createRecipe = () => {
    auth.currentUser.getIdToken(true).then(function (idToken) {
      try {
        axios
          .post(
            "/api/recipes",
            {
              author: user,
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
            recipeIDs = [...recipeIDs, response.data._id];
            return createPost(recipeIDs);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  let downloadURL;

  const uploadPicture = async () => {
    const storageID = uuidv4();
    const storageRef = ref(storage, storageID);
    await uploadBytes(storageRef, picture);
    return (downloadURL = await getDownloadURL(storageRef));
  };

  const handleSubmit = async (e) => {
    try {
      await uploadPicture();
      if (recipeName) {
        createRecipe();
      } else {
        createPost();
      }
      navigate("/signedin");
    } catch (error) {
      console.log(error.message);
    }
  };

  switch (step) {
    default:
    case 1:
      return (
        <Picture
          nextStep={nextStep}
          picture={picture}
          setPicture={setPicture}
          picturePreviewURL={picturePreviewURL}
          setPicturePreviewURL={setPicturePreviewURL}
          uploadPicture={uploadPicture}
          handleSubmit={handleSubmit}
        />
      );
    case 3:
      return (
        <SpeciesAndMethod
          nextStep={nextStep}
          previousStep={previousStep}
          setSpecies={setSpecies}
          setMethod={setMethod}
          species={species}
          method={method}
        />
      );
    case 2:
      return (
        <LocationAndConditions
          nextStep={nextStep}
          previousStep={previousStep}
          setDate={setDate}
          setTime={setTime}
          setLocation={setLocation}
          setConditions={setConditions}
          time={time}
          date={date}
          location={location}
          conditions={conditions}
        />
      );
    case 4:
      return (
        <Recipes
          nextStep={nextStep}
          previousStep={previousStep}
          recipeName={recipeName}
          recipeIngredients={recipeIngredients}
          recipeInstructions={recipeInstructions}
          setRecipeName={setRecipeName}
          setRecipeIngredients={setRecipeIngredients}
          setRecipeInstructions={setRecipeInstructions}
        />
      );
    case 5:
      return (
        <Confirm
          species={species}
          method={method}
          date={date}
          time={time}
          location={location}
          conditions={conditions}
          recipeName={recipeName}
          handleSubmit={handleSubmit}
          previousStep={previousStep}
          picturePreviewURL={picturePreviewURL}
        />
      );
  }
};

export default CreatePost;

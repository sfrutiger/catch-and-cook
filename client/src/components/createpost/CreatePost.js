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
import { getStorage, ref, uploadBytes } from "firebase/storage";

const CreatePost = ({ posts, setPosts }) => {
  const [step, setStep] = useState(1);
  const [picture, setPicture] = useState(null);
  const [pictureURL, setPictureURL] = useState("");
  const [species, setSpecies] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [conditions, setConditions] = useState("");
  const [method, setMethod] = useState("");
  const [details, setDetails] = useState("");
  const [recipes, setRecipes] = useState("");

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
        .then((response) => setPosts((posts) => [response.data, ...posts]))
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const uploadPicture = () => {
    /* e.preventDefault(); */
    const storageRef = ref(storage, uuidv4());
    uploadBytes(storageRef, picture).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadPicture();
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
      navigate("/signedin");
    } catch (e) {
      console.log(e.message);
    }
  };

  switch (step) {
    case 1:
      return (
        <Picture
          nextStep={nextStep}
          picture={picture}
          setPicture={setPicture}
          pictureURL={pictureURL}
          setPictureURL={setPictureURL}
          uploadPicture={uploadPicture}
        />
      );
    case 2:
      return (
        <SpeciesAndMethod
          nextStep={nextStep}
          previousStep={previousStep}
          setSpecies={setSpecies}
          setMethod={setMethod}
          setDetails={setDetails}
          species={species}
          method={method}
          details={details}
        />
      );
    case 3:
      return (
        <LocationAndConditions
          nextStep={nextStep}
          previousStep={previousStep}
          setDate={setDate}
          setLocation={setLocation}
          setConditions={setConditions}
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
          setRecipes={setRecipes}
          recipes={recipes}
        />
      );
    case 5:
      return (
        <Confirm
          species={species}
          method={method}
          details={details}
          location={location}
          conditions={conditions}
          recipes={recipes}
          handleSubmit={handleSubmit}
          previousStep={previousStep}
          pictureURL={pictureURL}
        />
      );
  }
};

export default CreatePost;

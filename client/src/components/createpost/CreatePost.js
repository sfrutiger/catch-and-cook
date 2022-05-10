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
  const [pictureDownloadURL, setPictureDownloadURL] = useState("");
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
            pictureDownloadURL: downloadURL,
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
      createPost(
        user,
        downloadURL,
        species,
        date,
        location,
        conditions,
        method,
        details,
        recipes
      );
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
          date={date}
          location={location}
          conditions={conditions}
          recipes={recipes}
          handleSubmit={handleSubmit}
          previousStep={previousStep}
          picturePreviewURL={picturePreviewURL}
        />
      );
  }
};

export default CreatePost;

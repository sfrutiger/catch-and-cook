import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Picture = ({
  nextStep,
  setPicture,
  picturePreviewURL,
  setPicturePreviewURL,
}) => {
  function handleChange(e) {
    setPicture(e.target.files[0]);
    setPicturePreviewURL(URL.createObjectURL(e.target.files[0]));
  }

  const [error, setError] = useState("");
  //reset error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const handleClick = () => {
    if (picturePreviewURL) {
      setError("");
      nextStep();
    } else {
      setError("A picture is required");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <img src={picturePreviewURL} alt="Catch" />
      <form>
        <input type="file" onChange={(e) => handleChange(e)} />
      </form>
      <div className="flex flex-row">
        <Link to="/" className="w-full mr-1">
          <button className="w-full h-[3rem] my-2 buttons mr-1">Cancel</button>
        </Link>
        <button
          onClick={() => handleClick()}
          className="w-full h-[3rem] my-2 buttons ml-1"
        >
          Next
        </button>
      </div>
      <p className="error-message">{error}</p>
      <p className="text-sm absolute bottom-20">
        *Posts containing explicit, offensive, or inappropriate content will be
        removed.
      </p>
    </div>
  );
};

export default Picture;

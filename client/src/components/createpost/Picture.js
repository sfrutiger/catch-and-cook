import { Link } from "react-router-dom";

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

  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <img src={picturePreviewURL} alt="Catch" />
      <form>
        <input type="file" onChange={(e) => handleChange(e)} />
      </form>
      <div className="flex flex-row">
        <Link to="/" className="w-full">
          <button className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2 mr-1">
            Cancel
          </button>
        </Link>
        <button
          onClick={() => nextStep()}
          className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2 ml-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Picture;

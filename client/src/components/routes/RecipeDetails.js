import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFontAwesomeFlag } from "react-icons/fa";
import { useState } from "react";
import ReportConfirmation from "../ReportConfirmation";

const RecipeDetails = ({ myFeed }) => {
  const location = useLocation();
  const recipe = location.state;
  const navigate = useNavigate();
  const [reportConfirmation, setReportConfirmation] = useState(false);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="w-full my-8 mb-16 flex flex-col items-center">
      <div className="bg-secondary rounded-lg w-full max-w-[700px] text-center mb-4 p-4">
        <ReportConfirmation
          recipe={recipe}
          postType={"recipe"}
          reportConfirmation={reportConfirmation}
          setReportConfirmation={setReportConfirmation}
        />
        <FaArrowLeft
          onClick={() => handleClick()}
          className="text-xl cursor-pointer m-0"
        />
        {recipe.name ? <h1 className="mb-4 text-2xl">{recipe.name}</h1> : ""}
        {recipe.ingredients ? (
          <div className="mb-4 mx-8 text-left">
            <h2 className="text-xl mb-2">Ingredients:</h2>
            <p className="whitespace-pre-wrap">{recipe.ingredients}</p>
          </div>
        ) : (
          ""
        )}
        {recipe.instructions ? (
          <div className="mb-4 mx-8 text-left">
            <h2 className="text-xl mb-2">Instructions:</h2>
            <p className="whitespace-pre-wrap">{recipe.instructions}</p>
          </div>
        ) : (
          ""
        )}

        {!myFeed ? (
          <div className="flex w-full justify-end">
            <div
              className="cursor-pointer text-sm flex items-baseline p-2"
              onClick={() => setReportConfirmation(true)}
            >
              <FaFontAwesomeFlag className="transform scale-x-[-1] mr-1" />
              <p>Report</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;

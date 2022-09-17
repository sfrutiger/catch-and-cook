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
      <div className="border-2 border-secondary bg-secondary rounded-lg w-full max-w-[700px] text-center mb-4 p-4">
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
        <h1 className="mb-4 text-2xl">{recipe.name}</h1>
        <p className="mb-4 whitespace-pre-wrap">
          Ingredients: {recipe.ingredients}
        </p>
        <p className="mb-4 whitespace-pre-wrap">
          Instructions: {recipe.instructions}
        </p>
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
    </div>
  );
};

export default RecipeDetails;

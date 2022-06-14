import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const RecipeDetails = ({ returnFeedToSamePosition }) => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="w-full my-8 mb-16 flex flex-col items-center">
      <div className="shadow-3xl w-full max-w-[700px] text-center mb-4 p-4">
        <FaArrowLeft
          onClick={() => handleClick()}
          className="text-xl cursor-pointer m-0"
        />
        <h1 className="mb-4 text-2xl">{data.name}</h1>
        <p className="mb-4 whitespace-pre-wrap">
          Ingredients: {data.ingredients}
        </p>
        <p className="mb-4 whitespace-pre-wrap">
          Instructions: {data.instructions}
        </p>
      </div>
    </div>
  );
};

export default RecipeDetails;

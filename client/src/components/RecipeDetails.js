import { useLocation } from "react-router-dom";

const RecipeDetails = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="w-full my-8 mb-16 flex flex-col items-center">
      <div className="shadow-3xl w-full max-w-[700px] text-center mb-4 p-4">
        <h1 className="mb-4 text-2xl">{data.name}</h1>
        <p className="mb-4">Ingredients: {data.ingredients}</p>
        <p className="mb-4">Instructions: {data.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;

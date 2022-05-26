import { useLocation } from "react-router-dom";

const RecipeDetails = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <div>
      <h1>{data.title}</h1>
      <p>Ingredients: {data.ingredients}</p>
      <p>Instructions: {data.instructions}</p>
    </div>
  );
};

export default RecipeDetails;

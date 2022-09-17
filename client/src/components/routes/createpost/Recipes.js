const Recipes = ({
  nextStep,
  previousStep,
  recipeName,
  recipeIngredients,
  recipeInstructions,
  setRecipeName,
  setRecipeIngredients,
  setRecipeInstructions,
}) => {
  return (
    <div className="max-w-[700px] h-[95%] mx-auto mt-8 p-4 flex flex-col justify-between">
      <div>
        <form>
          <div className="flex flex-col py-2">
            <label className="py-2">Recipe name </label>
            <input
              onChange={(e) => setRecipeName(e.target.value)}
              className="border py-1"
              type="text"
              value={recipeName}
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2">Ingredients</label>
            <textarea
              onChange={(e) => setRecipeIngredients(e.target.value)}
              className="border py-1"
              type="text"
              value={recipeIngredients}
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2">Instructions</label>
            <textarea
              onChange={(e) => setRecipeInstructions(e.target.value)}
              className="border py-1"
              type="text"
              value={recipeInstructions}
            />
          </div>
        </form>
        <div className="flex flex-row">
          <button
            onClick={() => previousStep()}
            className="w-full h-[3rem] my-2 buttons mb-2 mr-1"
          >
            Back
          </button>
          <button
            onClick={() => nextStep()}
            className="w-full h-[3rem] my-2 buttons mb-2 ml-1"
          >
            Next
          </button>
        </div>
        <p className="text-sm">
          *Additional recipes can be added after posting
        </p>
      </div>
      <p className="text-sm">
        *Posts containing explicit, offensive, or inappropriate content will be
        removed.
      </p>
    </div>
  );
};

export default Recipes;

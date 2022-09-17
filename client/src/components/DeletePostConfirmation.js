import { useNavigate } from "react-router-dom";

const DeletePostConfirmation = ({
  deleteConfirmation,
  setDeleteConfirmation,
  typeOfDeletion,
  deletePost,
  deleteRecipe,
  recipeToDelete,
}) => {
  const navigate = useNavigate();

  const handClick = () => {
    switch (typeOfDeletion) {
      case "post":
        deletePost();
        break;
      case "recipe":
        deleteRecipe(recipeToDelete);
        break;
    }
    navigate("/myposts");
  };

  return (
    <>
      {deleteConfirmation ? (
        <div className="w-[100vw] h-[100vh] bg-black/[0.6] z-10 absolute top-0 flex items-center justify-around">
          <div className="w-[400px] h-[150px] confirmation flex flex-col items-center justify-center">
            <p className="mb-8">
              Are you sure you want to delete this {typeOfDeletion}?
            </p>
            <div className="flex w-full">
              <button
                className="buttons h-[40px] ml-2 mr-1"
                onClick={() => setDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="buttons h-[40px] mr-2 ml-1"
                onClick={() => {
                  handClick();
                }}
              >
                Confirm deletion
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default DeletePostConfirmation;

import { Link } from "react-router-dom";

const CreatePostButton = () => {
  return (
    <div className="w-full h-[70px] flex flex-col items-center sticky bottom-0">
      <Link to="/createpost" className="w-[50%]">
        <button className="w-full h-[2.6rem] bg-white text-slate-500 rounded">
          Create Post
        </button>
      </Link>
    </div>
  );
};

export default CreatePostButton;

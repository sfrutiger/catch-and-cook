import { Link } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";

const PrivateFooter = ({ setMenuOpen }) => {
  return (
    <div className="w-full h-[70px] flex flex-row items-center justify-around fixed bottom-0 py-4 bg-slate-600">
      <FaHome className="text-2xl cursor-pointer" />
      <Link to="/createpost" className="w-[50%]">
        <button className="w-full h-[2.6rem] bg-white text-slate-500 rounded">
          Create Post
        </button>
      </Link>
      <FaBars
        onClick={() => setMenuOpen(true)}
        className="text-2xl cursor-pointer"
      />
    </div>
  );
};

export default PrivateFooter;

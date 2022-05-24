import { Link } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";

const PublicFooter = ({ setMenuOpen }) => {
  return (
    <div className="w-full h-[70px] flex flex-row items-center justify-around fixed bottom-0 py-4 bg-slate-600">
      <FaHome className="text-2xl cursor-pointer" />
      <Link to="/signin" className="w-[50%]">
        <button className="buttons h-[2.6rem]">Sign In</button>
      </Link>
      <FaBars
        onClick={() => setMenuOpen(true)}
        className="text-2xl cursor-pointer"
      />
    </div>
  );
};

export default PublicFooter;

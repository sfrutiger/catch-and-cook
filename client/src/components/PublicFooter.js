import { Link } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";

const PublicFooter = ({ setMenuOpen }) => {
  return (
    <div className="footer">
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

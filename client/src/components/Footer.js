import { Link } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";

const Footer = ({ setMenuOpen }) => {
  const { user } = UserAuth();

  if (user) {
    return (
      <div className="footer">
        <Link
          to="/"
          /* onClick={() => {
            window.location.reload();
          }} */
        >
          <FaHome className="text-2xl cursor-pointer" />
        </Link>
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
  } else {
    return (
      <div className="footer">
        <Link
          to="/signedin"
          /* onClick={() => {
            window.location.reload();
          }} */
        >
          <FaHome className="text-2xl cursor-pointer" />
        </Link>
        <Link to="/signin" className="w-[50%]">
          <button className="buttons h-[2.6rem]">Sign In</button>
        </Link>
        <FaBars
          onClick={() => setMenuOpen(true)}
          className="text-2xl cursor-pointer"
        />
      </div>
    );
  }
};

export default Footer;

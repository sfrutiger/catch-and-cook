import { Link } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";

const Footer = ({ setMenuOpen }) => {
  const { user } = UserAuth();

  return (
    <div className="fixed bottom-0 w-full h-[70px] bg-slate-700 flex justify-center">
      <div className="w-full max-w-[1500px] h-full flex items-center justify-around">
        <Link
          to="/"
          /* onClick={() => {
            window.location.reload();
          }} */
        >
          <FaHome className="text-2xl cursor-pointer m-0" />
        </Link>
        {user ? (
          <Link to="/createpost" className="w-[50%] max-w-[700px]">
            <button className="w-full h-[2.6rem] bg-white text-slate-500 rounded">
              Create Post
            </button>
          </Link>
        ) : (
          <Link to="/signin" className="w-[50%] max-w-[700px]">
            <button className="buttons h-[2.6rem]">Sign In</button>
          </Link>
        )}

        <FaBars
          onClick={() => setMenuOpen(true)}
          className="text-2xl cursor-pointer m-0"
        />
      </div>
    </div>
  );
};

export default Footer;

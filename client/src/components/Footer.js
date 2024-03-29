import { Link } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";

const resetScroll = () => {
  document.getElementById("App").scrollTo(0, 0);
};

const Footer = ({ setMenuOpen, createPostVisible }) => {
  const { user } = UserAuth();

  return (
    //changing footer height may mess up infinite scroll on mobile
    <div className="fixed bottom-0 w-full h-[70px] bg-secondary shadow-3xl shadow-black flex justify-center">
      <div className="w-full max-w-[780px] h-full flex items-center justify-around">
        <Link to="/">
          <button
            className="text-2xl cursor-pointer text-light p-3"
            onClick={() => resetScroll()}
          >
            <FaHome />
          </button>
        </Link>
        {user ? (
          <Link to="/createpost" className="w-[50%] max-w-[700px] ">
            <button
              style={{ display: createPostVisible ? "block" : "none" }}
              className="w-full h-[3rem] buttons"
            >
              Create Post
            </button>
          </Link>
        ) : (
          <Link to="/signin" className="w-[50%] max-w-[700px]">
            <button className="buttons h-[2.6rem]">Sign In</button>
          </Link>
        )}
        <button
          className="text-2xl cursor-pointer text-light p-3"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default Footer;

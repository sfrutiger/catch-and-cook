import { Link } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";

const Footer = ({ setMenuOpen, createPostVisible }) => {
  const { user } = UserAuth();

  return (
    <div className="fixed bottom-0 w-full h-[70px] bg-secondary border-t-2 border-secondary flex justify-center">
      <div className="w-full max-w-[1500px] h-full flex items-center justify-around">
        <Link to="/">
          <FaHome className="text-2xl cursor-pointer m-0 text-light" />
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
        <FaBars
          onClick={() => setMenuOpen(true)}
          className="text-2xl cursor-pointer m-0 text-light"
        />
      </div>
    </div>
  );
};

export default Footer;

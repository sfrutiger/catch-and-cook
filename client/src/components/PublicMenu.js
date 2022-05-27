import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const PublicMenu = ({ menuOpen, setMenuOpen }) => {
  return (
    <>
      {menuOpen ? (
        <div className="w-[100vw] h-[100vh] bg-black/[0.6] z-10 absolute top-0">
          <div
            onClick={() => setMenuOpen(false)}
            className="w-full h-[40%]"
          ></div>
          <div className="w-full h-[60%] flex items-center bg-slate-600 absolute bottom-0 z-11">
            <FaTimes
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-3 cursor-pointer"
            />
            <div className="w-full h-[30%] flex flex-col items-center justify-around">
              <p className="menu-items">About</p>
              <p className="menu-items">Invite friends</p>
              <Link
                className="menu-items"
                to="/signin"
                onClick={() => setMenuOpen(false)}
              >
                <p>Sign In</p>
              </Link>
              <Link
                className="menu-items"
                to="/signup"
                onClick={() => setMenuOpen(false)}
              >
                <p>Create Account</p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PublicMenu;

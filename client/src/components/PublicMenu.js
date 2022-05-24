import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const PublicMenu = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const logOut = () => {
    return signOut(auth);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setMenuOpen(false);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

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
              <p>About</p>
              <p>Invite friends</p>
              <Link to="/signin" onClick={() => setMenuOpen(false)}>
                <p>Sign In</p>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
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

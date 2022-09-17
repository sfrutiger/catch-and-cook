import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { UserAuth } from "../../context/AuthContext";
import About from "./About";
import Settings from "./Settings";
import ChangeUsername from "./ChangeUsername";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

const DisplayInMenu = ({ setMenuOpen }) => {
  const { user } = UserAuth();
  const [displayCase, setDisplayCase] = useState("");
  const [username, setUsername] = useState(user.displayName);
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

  switch (displayCase) {
    case "about":
      return (
        <div className="w-full h-[30%] flex flex-col items-center justify-around">
          <FaArrowLeft
            className="absolute left-5 top-5 cursor-pointer text-2xl"
            onClick={() => setDisplayCase("")}
          />
          <About />
        </div>
      );

    case "settings":
      return (
        <div className="w-full h-[30%] flex flex-col items-center justify-around">
          <FaArrowLeft
            className="absolute left-5 top-5 cursor-pointer text-2xl"
            onClick={() => setDisplayCase("")}
          />
          <Settings
            setDisplayCase={setDisplayCase}
            displayCase={displayCase}
            username={username}
            setUsername={setUsername}
          />
        </div>
      );

    case "changeusername":
      return (
        <div className="w-full h-[30%] flex flex-col items-center justify-around">
          <FaArrowLeft
            className="absolute left-5 top-5 cursor-pointer text-2xl"
            onClick={() => setDisplayCase("")}
          />
          <ChangeUsername
            setDisplayCase={setDisplayCase}
            username={username}
            setUsername={setUsername}
          />
        </div>
      );

    case "changepassword":
      return (
        <div className="w-full h-[30%] flex flex-col items-center justify-around">
          <FaArrowLeft
            className="absolute left-3 top-3 cursor-pointer text-2xl"
            onClick={() => setDisplayCase("")}
          />
          <ChangePassword setDisplayCase={setDisplayCase} />
        </div>
      );

    case "deleteaccount":
      return (
        <div className="w-full h-[30%] flex flex-col items-center justify-around">
          <FaArrowLeft
            className="absolute left-3 top-3 cursor-pointer text-2xl"
            onClick={() => setDisplayCase("")}
          />
          <DeleteAccount setDisplayCase={setDisplayCase} />
        </div>
      );

    default:
      return (
        <div className="w-full h-[30%] flex flex-col items-center justify-around">
          {user ? (
            <>
              <Link to="/myposts" onClick={() => setMenuOpen(false)}>
                <p className="menu-items buttons">My Posts</p>
              </Link>
              <p
                className="menu-items buttons"
                onClick={() => setDisplayCase("settings")}
              >
                Settings
              </p>
            </>
          ) : (
            ""
          )}
          <p
            className="menu-items buttons"
            onClick={() => setDisplayCase("about")}
          >
            About
          </p>
          {user ? (
            <>
              <Link
                className="menu-items buttons"
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >
                <p>Contact</p>
              </Link>
              <p className="menu-items buttons" onClick={handleLogout}>
                Sign Out
              </p>
            </>
          ) : (
            <>
              <Link
                className="menu-items buttons"
                to="/signin"
                onClick={() => setMenuOpen(false)}
              >
                <p>Sign In</p>
              </Link>
              <Link
                className="menu-items buttons"
                to="/signup"
                onClick={() => setMenuOpen(false)}
              >
                <p>Create Account</p>
              </Link>
              <Link
                className="menu-items buttons"
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >
                <p>Contact</p>
              </Link>
            </>
          )}
        </div>
      );
  }
};

export default DisplayInMenu;

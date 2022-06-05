import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import About from "./About";
import { UserAuth } from "../context/AuthContext";

const DisplayInMenu = ({ setMenuOpen }) => {
  const { user } = UserAuth();
  const [displayCase, setDisplayCase] = useState("");
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
            className="absolute left-3 top-3 cursor-pointer"
            onClick={() => setDisplayCase("")}
          />
          <About />
        </div>
      );

    default:
      return (
        <div className="w-full h-[30%] flex flex-col items-center justify-around">
          {user ? <p className="menu-items">Settings</p> : ""}
          <p className="menu-items" onClick={() => setDisplayCase("about")}>
            About
          </p>
          <p className="menu-items">Invite friends</p>
          {user ? (
            <p className="menu-items" onClick={handleLogout}>
              Sign Out
            </p>
          ) : (
            <>
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
            </>
          )}
        </div>
      );
  }
};

export default DisplayInMenu;
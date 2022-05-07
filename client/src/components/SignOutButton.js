import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
/* import { UserAuth } from "../context/AuthContext"; */
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SignOutButton = () => {
  /* const { logOut } = UserAuth; */
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const logOut = () => {
    return signOut(auth);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="w-[110px] absolute right-4 top-4 hidden sm:flex flex-col">
        <button onClick={handleLogout} className="signin-buttons">
          Sign Out
        </button>
      </div>

      <div
        onClick={handleClick}
        className="sm:hidden absolute z-10 right-4 top-4"
      >
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      <div
        className={
          !nav
            ? "hidden"
            : "absolute left-0 w-full h-screen flex flex-col justify-start items-center"
        }
      >
        <button onClick={handleLogout} className="signin-buttons-mobile mt-12">
          Sign Out
        </button>
      </div>
    </>
  );
};

export default SignOutButton;

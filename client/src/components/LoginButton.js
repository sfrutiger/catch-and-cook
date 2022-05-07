import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginButton = ({ logout }) => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <>
      <div className="w-[110px] absolute right-4 top-4 hidden sm:flex flex-col">
        <Link to="/login">
          <button className="login-buttons">Log in</button>
        </Link>
        <Link to="/signup">
          <button className="login-buttons">Sign up</button>
        </Link>
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
        <Link to="/login">
          <button className="login-buttons-mobile mt-12">Log in</button>
        </Link>
        <Link to="/signup">
          <button className="login-buttons-mobile">Sign up</button>
        </Link>
      </div>
    </>
  );
};

export default LoginButton;

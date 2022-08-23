import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  /* const { googleSignIn } = UserAuth(); */
  /* const { provider } = UserAuth(); */
  const navigate = useNavigate();

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get("/api/users", {
        params: {
          criteria: "username",
          displayName: username,
        },
      });
      if (response.data.length === 0) {
        createUser(email, password, username).then(function (error) {
          if (error) {
            setError(error.message);
          } else {
            navigate("/");
          }
        });
      } else {
        setError("Username unavailable");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    checkUsernameAvailability(username);
  };

  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <div>
        <h1 className="text-2xl py-2">Sign up for a free account</h1>
        <p className="py-2">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Sign in.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-2">
          <label className="py-2">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="border p-3"
            type="text"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="py-2">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3"
            type="email"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label className="py-2">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3"
            type="password"
          />
        </div>
        <div className="flex flex-row">
          <Link to="/" className="w-full mr-1">
            <button className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2">
              Cancel
            </button>
          </Link>
          <button className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2 ml-1">
            Sign Up
          </button>
        </div>
      </form>
      {/* <p className="ml-0">or</p>
      <button
        className="sign-up-with-google p-0 m-0"
        onClick={() => googleSignIn(provider)}
      >
        {""}
      </button> */}
      <div className="text-red-400">{error}</div>
    </div>
  );
};

export default SignUpForm;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  //reset error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get("/api/users", {
        params: {
          criteria: "username",
          username: username,
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
    const specialCharacters = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    e.preventDefault();
    setError("");
    if (!username) {
      setError("Username is required");
    } else if (username.length < 4) {
      setError("Username must be 4 to 24 characters in length");
    } else if (username.length > 24) {
      setError("Username must be 4 to 24 characters in length");
    } else if (specialCharacters.test(username)) {
      setError("Username may contain only letters, numbers, and _.");
    } else if (!email) {
      setError("An email address is required");
    } else if (!password) {
      setError("A password is required");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      checkUsernameAvailability(username);
    }
  };

  return (
    <div className="max-w-[700px] h-[50%] mx-auto my-8 p-4">
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
        <div className="flex flex-col mb-2">
          <label className="py-2">Confirm password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-3"
            type="password"
          />
        </div>
        <div className="flex flex-row">
          <Link to="/" className="w-full mr-1">
            <button className="w-full h-[3rem] my-2 buttons mb-2">
              Cancel
            </button>
          </Link>
          <button className="w-full h-[3rem] my-2  buttons mb-2 ml-1">
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

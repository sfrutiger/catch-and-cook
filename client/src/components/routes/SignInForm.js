import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  /* const { createUser } = UserAuth(); */
  /* const { googleSignIn } = UserAuth(); */
  /* const { provider } = UserAuth(); */

  //reset error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    signIn(email, password)
      .then(function (error) {
        if (error) {
          setError(error.message);
        }
      })
      .then(function () {
        navigate("/");
      });
  };

  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <div>
        <h1 className="text-2xl py-2">Sign in to your account</h1>
        <p className="py-2">
          Don't have an account yet?{" "}
          <Link to="/signup" className="underline">
            Sign up.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
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
        <Link to="/forgotpassword">
          <p>Forgot password?</p>
        </Link>
        <div className="flex flex-row mt-2">
          <Link to="/" className="w-full mr-1">
            <button className="w-full h-[3rem] my-2 buttons mb-2">
              Cancel
            </button>
          </Link>
          <button className="w-full h-[3rem] my-2 buttons mb-2 ml-1">
            Sign in
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

export default SignInForm;

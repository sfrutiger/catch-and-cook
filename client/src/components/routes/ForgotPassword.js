import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const auth = getAuth();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();

  //reset error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <div>
        <h1 className="text-2xl py-2">Reset password</h1>
        <p className="py-2">
          Enter the email address associated with your account. If a match is
          found, an email with a link to reset your password will be sent.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3"
            type="email"
          />
        </div>
        <div className="flex flex-row">
          <Link to="/" className="w-full mr-1">
            <button className="w-full h-[3rem] my-2 buttons mb-2">
              Cancel
            </button>
          </Link>
          <button className="w-full h-[3rem] my-2 buttons mb-2 ml-1">
            Send password reset email
          </button>
        </div>
      </form>
      {error ? <p className="error-message">{error}</p> : ""}
    </div>
  );
};

export default ForgotPassword;

import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const ChangeUsername = ({ setDisplayCase }) => {
  const { user } = UserAuth();
  const [username, setUsername] = useState(user.displayName);
  const [error, setError] = useState("");

  //reset error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const changeUsername = (username) => {
    const uid = auth.currentUser.uid;
    try {
      auth.currentUser
        .getIdToken(true)
        .then(function (idToken) {
          axios.patch(
            `/api/users/${uid}`,
            {
              username: username,
            },
            {
              headers: {
                authtoken: idToken,
              },
            }
          );
        })
        .then(function () {
          updateProfile(auth.currentUser, {
            displayName: username,
          });
        })
        .then(function () {
          setDisplayCase("settings");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get("/api/users", {
        params: {
          criteria: "username",
          username: username,
        },
      });
      if (response.data.length === 0) {
        changeUsername(username);
      } else {
        setError("Username unavailable");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUsernameAvailability(username);
  };

  return (
    <div>
      <p className="text-red-400 mb-2">{error}</p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          className="h-[40px] my-2"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <button className="buttons h-[40px] my-2">Save change</button>
      </form>
      <button
        className="buttons h-[40px]"
        onClick={() => {
          setDisplayCase("settings");
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default ChangeUsername;

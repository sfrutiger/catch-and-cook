import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const ChangeUsername = ({ setDisplayCase, username, setUsername }) => {
  const { user } = UserAuth();
  const [error, setError] = useState("");
  const [newUsername, setNewUsername] = useState(username);

  //reset error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const changeUsername = (newUsername) => {
    const uid = auth.currentUser.uid;
    try {
      auth.currentUser
        .getIdToken(true)
        .then(function (idToken) {
          axios.patch(
            `/api/users/${uid}`,
            {
              username: newUsername,
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
            displayName: newUsername,
          });
        })
        .then(function () {
          setUsername(newUsername);
          setDisplayCase("settings");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const checkUsernameAvailability = async (newUsername) => {
    try {
      const response = await axios.get("/api/users", {
        params: {
          criteria: "username",
          username: newUsername,
        },
      });
      if (response.data.length === 0) {
        changeUsername(newUsername);
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
    if (!newUsername) {
      setError("Username is required");
    } else if (newUsername.length < 4) {
      setError("Username must be 4 to 24 characters in length");
    } else if (newUsername.length > 24) {
      setError("Username must be 4 to 24 characters in length");
    } else if (specialCharacters.test(newUsername)) {
      setError("Username may contain only letters, numbers, and _.");
    } else {
      checkUsernameAvailability(newUsername);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[60%]">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="h-[40px] my-2"
            name="username"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
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
      <p className="text-red-400 mb-2">{error}</p>
    </div>
  );
};

export default ChangeUsername;

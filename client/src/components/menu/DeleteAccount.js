import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";

const DeleteAccount = ({ setDisplayCase }) => {
  const { user, reauthenticateUser, deleteAccount } = UserAuth();
  const [password, setPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState("");
  const [error, setError] = useState("");

  //reset error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    reauthenticateUser(user, password)
      .then((response) => {
        if (response.user === user) {
          if (confirmDelete === "delete") {
            deleteAccount(user);
            setDisplayCase("");
          } else {
            setError('You must type "delete" to confirm deletion');
          }
        } else {
          setError("Incorrect password");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-[75%] max-w-[400px]">
      <p className="text-red-400 mb-2">{error}</p>
      <p className="mb-4">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="password">Enter your password</label>
        <input
          className="h-[40px] my-2"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label htmlFor="confirm-delete">
          and type "delete" below to confirm deletion
        </label>
        <input
          className="h-[40px] my-2"
          name="confirm-delete"
          type="text"
          onChange={(e) => setConfirmDelete(e.target.value)}
        ></input>
        <button className="buttons h-[40px] my-2">Delete account</button>
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

export default DeleteAccount;

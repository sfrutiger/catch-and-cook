import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";

const ChangePassword = ({ setDisplayCase }) => {
  const { user, changePassword, reauthenticateUser } = UserAuth();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  //reset error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    reauthenticateUser(user, password).then(function (error) {
      if (error) {
        setError(error.message);
      } else {
        if (newPassword === confirmNewPassword) {
          changePassword(user, newPassword);
          setDisplayCase("settings");
        } else {
          setError("Passwords do not match");
        }
      }
    });
  };

  return (
    <div>
      <p className="text-red-400 mb-2">{error}</p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="oldpassword">Old password</label>
        <input
          className="h-[40px] my-2"
          name="oldpassword"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label htmlFor="newpassword">New password</label>
        <input
          className="h-[40px] my-2"
          name="newpassword"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        ></input>
        <label htmlFor="confirmnewpassword">Confirm new password</label>
        <input
          className="h-[40px] my-2"
          name="confirmnewpassword"
          type="password"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        ></input>
        <button className="buttons my-2 h-[40px]">Save change</button>
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

export default ChangePassword;

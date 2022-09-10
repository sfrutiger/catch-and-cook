import { UserAuth } from "../../context/AuthContext";

const Settings = ({ setDisplayCase }) => {
  const { user } = UserAuth();

  return (
    <div className="flex flex-col items-center">
      <p className="mb-10 text-xl">Logged in as {user.displayName}</p>
      <button
        className="menu-items"
        onClick={() => {
          setDisplayCase("changeusername");
        }}
      >
        Change username
      </button>
      <button
        className="menu-items"
        onClick={() => {
          setDisplayCase("changepassword");
        }}
      >
        Change password
      </button>
      <button
        className="menu-items"
        onClick={() => {
          setDisplayCase("deleteaccount");
        }}
      >
        Delete account
      </button>
    </div>
  );
};

export default Settings;

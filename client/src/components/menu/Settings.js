import { UserAuth } from "../../context/AuthContext";

const Settings = ({ displayCase, setDisplayCase, username, setUsername }) => {
  const { user } = UserAuth();

  return (
    <div className="flex flex-col items-center">
      <p className="mb-10 text-xl">Logged in as {username}</p>
      <button
        className="menu-items buttons"
        onClick={() => {
          setDisplayCase("changeusername");
        }}
      >
        Change username
      </button>
      <button
        className="menu-items buttons"
        onClick={() => {
          setDisplayCase("changepassword");
        }}
      >
        Change password
      </button>
      <button
        className="menu-items buttons"
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

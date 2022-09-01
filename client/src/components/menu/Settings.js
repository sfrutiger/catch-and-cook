import { UserAuth } from "../../context/AuthContext";

const Settings = ({ setDisplayCase }) => {
  const { user } = UserAuth();

  return (
    <div className="flex flex-col items-center">
      <p>Logged in as {user.displayName}</p>
      <button
        className="buttons w-[200px] my-4"
        onClick={() => {
          setDisplayCase("changeusername");
        }}
      >
        Change username
      </button>
      <button
        className="buttons w-[200px] mb-4"
        onClick={() => {
          setDisplayCase("changepassword");
        }}
      >
        Change password
      </button>
      <button
        className="buttons w-[200px] mb-4"
        onClick={() => {
          setDisplayCase("requestsupport");
        }}
      >
        Request support
      </button>
      <button
        className="buttons w-[200px]"
        onClick={() => {
          setDisplayCase("changepassword");
        }}
      >
        Delete account
      </button>
    </div>
  );
};

export default Settings;

import { UserAuth } from "../../context/AuthContext";

const Settings = () => {
  const { user } = UserAuth();

  return (
    <div className="flex flex-col items-center">
      <p>Logged in as {user.displayName}</p>
      <button className="buttons w-[200px] m-4">Change username</button>
      <button className="buttons w-[200px]">Change password</button>
    </div>
  );
};

export default Settings;

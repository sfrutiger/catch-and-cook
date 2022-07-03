import { UserAuth } from "../context/AuthContext";

const Settings = () => {
  const { user } = UserAuth();
  console.log(user.displayName);

  return <div>username: {user.displayName}</div>;
};

export default Settings;

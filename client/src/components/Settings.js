import { UserAuth } from "../context/AuthContext";

const Settings = () => {
  const { user } = UserAuth();

  return <div>username: {user.displayName}</div>;
};

export default Settings;

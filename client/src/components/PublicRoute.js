import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = UserAuth();

  if (user) {
    return <Navigate to="signedin" />;
  }

  return children;
};

export default PublicRoute;

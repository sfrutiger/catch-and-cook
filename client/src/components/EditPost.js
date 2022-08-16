import { useLocation } from "react-router-dom";

const EditPost = () => {
  const location = useLocation();
  const post = location.state;
  return <div>EditPost</div>;
};

export default EditPost;

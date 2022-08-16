import { useLocation } from "react-router-dom";

const EditPost = () => {
  const location = useLocation();
  console.log(location.state);
  return <div>EditPost</div>;
};

export default EditPost;

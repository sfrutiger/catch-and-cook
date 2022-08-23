import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col my-8 items-center">
      <h1 className="w-full text-center mb-4">404: Page not found</h1>
      <Link to="/">
        <button className="signin-buttons w-[150px]">Return home</button>
      </Link>
    </div>
  );
};

export default NotFound;

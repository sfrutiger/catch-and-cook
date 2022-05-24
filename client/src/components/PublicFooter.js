import { Link } from "react-router-dom";

const PublicFooter = () => {
  return (
    <div className="w-full h-[70px] flex flex-row justify-center fixed bottom-0 py-4 bg-slate-600">
      <Link to="/signin" className="w-[150px] mr-1">
        <button className="buttons h-[2.6rem]">Sign In</button>
      </Link>
      <Link to="/signup" className="w-[150px] ml-1">
        <button className="buttons h-[2.6rem]">Create Account</button>
      </Link>
    </div>
  );
};

export default PublicFooter;

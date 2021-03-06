import Post from "./Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";

const MyPosts = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [skip, setSkip] = useState(0);

  console.log(myPosts);

  const getPosts = async () => {
    const userID = user.uid;
    try {
      const response = await axios.get(
        `/api/posts?skip=${skip}&userid=${userID}`
      );
      if (myPosts.length > 0) {
        setMyPosts([...myPosts, ...response.data]);
      } else {
        setMyPosts(response.data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getPosts();
  }, [skip]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="sticky top-0 w-full h-[60px] bg-slate-700 flex justify-center">
        <div className="w-full max-w-[1500px] h-full flex items-center justify-around">
          <FaArrowLeft
            onClick={() => handleClick()}
            className="text-2xl cursor-pointer"
          />
          <h1 className="text-xl w-[50%] max-w-[700px] text-center">
            {user.displayName}
          </h1>
          <div className="w-[0px]"></div>
        </div>
      </div>
      {myPosts.length ? (
        <div className="w-full my-8 mb-16 flex flex-col items-center">
          {myPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MyPosts;

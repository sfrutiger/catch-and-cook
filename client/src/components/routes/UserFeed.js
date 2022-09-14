import Post from "../Post";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const UserFeed = ({ userFeedSkip, userPosts, setUserPosts }) => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const getPosts = async () => {
    const userID = data[0].authorUID;
    try {
      const response = await axios.get(
        `/api/posts?skip=${userFeedSkip}&userid=${userID}`
      );
      if (userPosts.length > 0) {
        setUserPosts([...userPosts, ...response.data]);
      } else {
        setUserPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [userFeedSkip]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="sticky top-0 w-full h-[60px] bg-secondary flex justify-center text-light">
        <div className="w-full max-w-[1500px] h-full flex items-center justify-around">
          <FaArrowLeft
            onClick={() => handleClick()}
            className="text-2xl cursor-pointer"
          />
          <h1 className="text-xl w-[50%] max-w-[700px] text-center">
            {data[1]}
          </h1>
          <div className="w-[0px]"></div>
        </div>
      </div>
      {userPosts.length ? (
        <div className="w-full my-8 mb-16 flex flex-col items-center">
          {userPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserFeed;

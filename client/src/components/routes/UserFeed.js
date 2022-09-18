import Post from "../Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import LoadMoreButton from "../LoadMoreButton";

const UserFeed = ({
  userFeedSkip,
  setUserFeedSkip,
  userPosts,
  setUserPosts,
}) => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [endOfPosts, setEndOfPosts] = useState(false);

  const getPosts = async () => {
    const userID = data[0].authorUID;
    try {
      const response = await axios.get(
        `/api/posts?skip=${userFeedSkip}&userid=${userID}`
      );
      if (
        userPosts.length > 0 &&
        userFeedSkip !== 0 &&
        response.data.length > 0
      ) {
        setUserPosts([...userPosts, ...response.data]);
      } else if (response.data.length === 0 && userFeedSkip !== 0) {
        setEndOfPosts(true);
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
      <div className="sticky z-10 top-0 w-full h-[60px] bg-primary flex justify-center">
        <div className="w-full max-w-[1500px] h-full flex items-center justify-around">
          <FaArrowLeft
            onClick={() => handleClick()}
            className="text-2xl cursor-pointer"
          />
          <h1 className="text-xl w-[50%] max-w-[700px] text-center font-semibold">
            {data[1]}
          </h1>
          <div className="w-[20px]"></div>
        </div>
      </div>
      {userPosts.length ? (
        <div className="w-full mb-8 flex flex-col items-center">
          {userPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        ""
      )}
      <LoadMoreButton
        posts={userPosts}
        setSkip={setUserFeedSkip}
        endOfPosts={endOfPosts}
      />
    </>
  );
};

export default UserFeed;

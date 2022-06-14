import Post from "./Post";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const UserFeed = () => {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const getPosts = async () => {
    const userID = data.author.uid;
    try {
      const response = await axios.get(
        `/api/posts?skip=${skip}&userid=${userID}`
      );
      if (posts.length > 0) {
        setPosts([...posts, ...response.data]);
      } else {
        setPosts(response.data);
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
            {data.author.email}
          </h1>
          <div className="w-[0px]"></div>
        </div>
      </div>
      {posts.length ? (
        <div className="w-full my-8 mb-16 flex flex-col items-center">
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post} /* feedPosition={feedPosition} */
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserFeed;

import Post from "../Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
/* import { FaArrowLeft } from "react-icons/fa"; */
import { UserAuth } from "../../context/AuthContext";

const MyPosts = ({ posts, setPosts, postEdited }) => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const userID = user.uid;
  const myFeed = "my feed, not general or user feed"; //this is to clarify Post component is generated from myPosts

  const getMyPosts = async () => {
    try {
      const response = await axios.get(
        `/api/posts?skip=${skip}&userid=${userID}`
      );
      setMyPosts(response.data);
    } catch (e) {}
  };

  useEffect(() => {
    getMyPosts();
  }, [userID]);

  useEffect(() => {
    setMyPosts("");
    getMyPosts();
  }, [postEdited]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="sticky top-0 w-full h-[60px] bg-slate-700 flex justify-center">
        <div className="w-full max-w-[1500px] h-full flex items-center justify-around">
          {/* <FaArrowLeft
            onClick={() => handleClick()}
            className="text-2xl cursor-pointer"
          /> */}
          <h1 className="text-xl w-full text-center">{user.displayName}</h1>
          <div className="w-[0px]"></div>
        </div>
      </div>
      {myPosts.length ? (
        <div className="w-full my-8 mb-16 flex flex-col items-center">
          {myPosts.map((post) => (
            <Post
              key={post._id}
              post={post}
              myFeed={myFeed}
              setMyPosts={setMyPosts}
              myPosts={myPosts}
              posts={posts}
              setPosts={setPosts}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MyPosts;

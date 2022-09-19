import Post from "../Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import LoadMoreButton from "../LoadMoreButton";

const MyPosts = ({
  posts,
  setPosts,
  postEdited,
  myPosts,
  setMyPosts,
  myFeedSkip,
  setMyFeedSkip,
}) => {
  const { user } = UserAuth();
  const userID = user.uid;
  const myFeed = "my feed, not general or user feed"; //this is to clarify Post component is generated from myPosts
  const [endOfPosts, setEndOfPosts] = useState(false);

  const getMyPosts = async () => {
    try {
      const response = await axios.get(
        `/api/posts?skip=${myFeedSkip}&userid=${userID}`
      );
      if (myPosts.length > 0 && myFeedSkip !== 0 && response.data.length > 0) {
        setMyPosts([...myPosts, ...response.data]);
        console.log("false");
      } else if (response.data.length === 0 && myFeedSkip !== 0) {
        setEndOfPosts(true);
      } else {
        setMyPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, [user, myFeedSkip, postEdited]);

  useEffect(() => {
    setMyPosts([]);
    getMyPosts();
  }, [postEdited]);

  return (
    <>
      <div className="sticky z-10 top-0 w-full h-[60px] bg-primary flex justify-center">
        <div className="w-full max-w-[1500px] h-full flex items-center justify-around">
          <h1 className="text-xl w-full text-center font-semibold">
            {user.displayName}
          </h1>
        </div>
      </div>
      {myPosts.length ? (
        <div className="w-full mb-8 flex flex-col items-center">
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
          <LoadMoreButton
            posts={myPosts}
            setSkip={setMyFeedSkip}
            endOfPosts={endOfPosts}
          />
        </div>
      ) : (
        <div className="w-full mt-28 flex flex-col justify-center items-center">
          <p>No posts to show</p>
        </div>
      )}
    </>
  );
};

export default MyPosts;

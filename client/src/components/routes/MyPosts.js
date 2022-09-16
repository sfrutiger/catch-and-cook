import Post from "../Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";

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

  const getMyPosts = async () => {
    try {
      const response = await axios.get(
        `/api/posts?skip=${myFeedSkip}&userid=${userID}`
      );
      if (myPosts.length > 0 && myFeedSkip !== 0) {
        setMyPosts([...myPosts, ...response.data]);
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
      <div className="sticky top-0 w-full h-[60px] bg-primary flex justify-center">
        <div className="w-full max-w-[1500px] h-full flex items-center justify-around">
          <h1 className="text-xl w-full text-center font-semibold">
            {user.displayName}
          </h1>
        </div>
      </div>
      {myPosts.length ? (
        <div className="w-full mb-16 flex flex-col items-center">
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

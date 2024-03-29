import Post from "./Post";
import LoadMoreButton from "./LoadMoreButton";

const Feed = ({ posts, feedPosition, setUserFeedId, setSkip, endOfPosts }) => {
  const generalFeed = "general feed, not user feed"; // this is so Post component can have conditions based on whether it is generated from general feed or individual user feed

  return (
    <>
      {posts.length ? (
        <div className="w-full my-8 flex flex-col items-center">
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              feedPosition={feedPosition}
              setUserFeedId={setUserFeedId}
              generalFeed={generalFeed}
            />
          ))}
          <LoadMoreButton
            posts={posts}
            setSkip={setSkip}
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

export default Feed;

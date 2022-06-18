import Post from "./Post";

const Feed = ({ posts, feedPosition, setUserFeedId }) => {
  const generalFeed = "general feed, not user feed"; // this is so Post component can have conditions based on whether it is generated from general feed or individual user feed

  return (
    <>
      {posts.length ? (
        <div className="w-full my-8 mb-16 flex flex-col items-center">
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              feedPosition={feedPosition}
              setUserFeedId={setUserFeedId}
              generalFeed={generalFeed}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Feed;

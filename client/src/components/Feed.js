import Post from "./Post";

const Feed = ({ posts }) => {
  return (
    <>
      {posts.length ? (
        <div className="w-full my-8 mb-16 flex flex-col items-center">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Feed;

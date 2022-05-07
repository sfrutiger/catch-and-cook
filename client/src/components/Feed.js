import Post from "./Post";

const Feed = ({ posts }) => {
  return (
    <div className="w-full my-8 flex flex-col items-center">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;

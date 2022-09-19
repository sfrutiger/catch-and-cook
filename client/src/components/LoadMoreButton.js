const LoadMoreButton = ({ endOfPosts, setSkip, posts }) => {
  return (
    <div className="mt-4">
      {endOfPosts ? (
        <p>End of posts</p>
      ) : (
        <button
          className="buttons w-[200px] h-[2.6rem]"
          onClick={() => setSkip(posts.length)}
        >
          Load more posts
        </button>
      )}
    </div>
  );
};

export default LoadMoreButton;

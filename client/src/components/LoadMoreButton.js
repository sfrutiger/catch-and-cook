const LoadMoreButton = ({ endOfPosts, setSkip, posts }) => {
  return (
    <div className="flex w-full justify-center my-8">
      {endOfPosts ? (
        <p>No more posts to show</p>
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

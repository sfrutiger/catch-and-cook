const Post = ({ post }) => {
  return (
    <div className="border-2 w-[50%] mb-2 p-4">
      <p>{post.author.email}</p>
      <img src={post.pictureDownloadURL} alt="catch" />
      <p>{post.date}</p>
      <p>
        {post.location[1]}, {post.location[0]}
      </p>

      {post.conditions ? (
        <>
          <p>{post.conditions.data.currentConditions.conditions}</p>
          <p>Temperature: {post.conditions.data.currentConditions.temp} °F</p>
          <p>Wind: {post.conditions.data.currentConditions.windspeed} mph</p>
          <p>
            Pressure: {post.conditions.data.currentConditions.pressure}{" "}
            millibars
          </p>
        </>
      ) : (
        ""
      )}
      <p>{post.species}</p>
      <p>{post.method}</p>
      <p>{post.recipes}</p>
    </div>
  );
};

export default Post;

const Post = ({ post }) => {
  return (
    <div className="border-2 w-[50%] mb-2 p-4">
      <p>{post.author.email}</p>
      <p>{post.species}</p>
      <p>{post.date}</p>
      <p>{post.location}</p>
      <p>{post.conditions}</p>
      <p>{post.method}</p>
      <p>{post.details}</p>
      <p>{post.recipes}</p>
    </div>
  );
};

export default Post;

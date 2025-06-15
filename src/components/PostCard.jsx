const PostCard = ({ post }) => {
  return (
    <div className="card bg-base-100 shadow-md mb-4">
      {/* Post image */}
      {post.img && <img src={post.img} alt="Post" className="w-full h-64 object-cover rounded-t-box" />}

      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.body}</p>
        {/* Author */}
        <p className="text-sm text-gray-500">By {post.author?.username || 'Unknown'}</p>
      </div>
    </div>
  )
}

export default PostCard

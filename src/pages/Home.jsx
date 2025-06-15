import FloatingAddButton from "../components/FloatingAddButton";
import PostCard from "../components/PostCard";
import { usePosts } from "../context/sss";

const Home = () => {
  const { posts, loading, error } = usePosts();

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Recent Posts</h1>

      {loading && <p className="text-center">Loading posts...</p>}
      {error && <p className="text-error text-center">{error}</p>}
      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500">No posts yet</p>
      )}
      {!loading && posts.map((post) => <PostCard key={post._id} post={post} />)}

      <FloatingAddButton />
    </div>
  );
};

export default Home;

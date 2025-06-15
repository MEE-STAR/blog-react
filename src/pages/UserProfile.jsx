import { useEffect, useState } from "react";

import api from "../api/axio";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import FloatingAddButton from "../components/FloatingAddButton";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user's posts
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await api.get("/posts/me/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error loading user posts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyPosts();
  }, [user]);

  // Handel delete post
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${postId}`);
      // حذف البوست من الواجهة مباشرة
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Failed to delete post", err);
      alert("Failed to delete post");
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <p className="text-center mt-10">Please login to view your profile.</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-base-100 p-6 rounded shadow mb-8">
        <div className="flex items-center gap-4">
          {/* Avatar or fallback letter */}
          <div className="avatar">
            <div className="w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl uppercase">
              {user?.username?.charAt(0)}
            </div>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <div className="ml-auto">
            <button className="btn btn-error btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">My Posts</h3>

        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="card bg-base-100 shadow p-4">
                <img src={post.img} alt={post.title} className="rounded mb-2" />
                <h4 className="text-xl font-bold">{post.title}</h4>
                <p>{post.body}</p>

                {/* edit  & delete*/}
                <div className="mt-3 flex justify-end gap-2">
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="btn btn-sm btn-outline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FloatingAddButton />
    </div>
  );
};

export default UserProfile;

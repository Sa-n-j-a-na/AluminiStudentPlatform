import React, { useEffect, useState } from 'react';
import { FiShare2 } from 'react-icons/fi'; // Import the share icon
import './MyPost.css'; // Ensure this CSS file is imported

function MyPost({ email }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Email received: ${typeof email}`); // Should print 'string'
  }, [email]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/myposts/${email}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [email]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="my-post-container">
      <h2 className="post-heading">My Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="post-grid">
          {posts.map(post => (
            <div key={post._id} className="post">
              <p className="post-date-time">
                {new Date(post.date).toLocaleString()}
              </p>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <img
                src={post.image}
                alt={post.title}
                className="post-image"
              />
              <div className="post-actions">
                <span>👍 15</span>
                <span>💬 5</span>
                <span><FiShare2 /> Share</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPost;

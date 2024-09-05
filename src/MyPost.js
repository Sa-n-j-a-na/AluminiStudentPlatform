import React, { useEffect, useState } from 'react';

function MyPost({ email }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="my-posts">
      <h2>My Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="posts-list">
          {posts.map(post => (
            <div key={post._id} className="post">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.image}
                className="post-image"
              />
              <p>Date: {new Date(post.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPost;

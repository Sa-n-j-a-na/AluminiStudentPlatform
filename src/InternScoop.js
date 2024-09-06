import React, { useEffect, useState } from 'react';
import { FiShare2 } from 'react-icons/fi';
import './MyPost.css'; // Ensure this CSS file is imported

function InternScoop() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/internposts');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Fetch names for all posts
        const emails = Array.from(new Set(data.map(post => post.email)));
        const nameResponses = await Promise.all(
          emails.map(email =>
            fetch(`http://localhost:5000/getname/${email}`).then(res => res.json())
          )
        );
        const nameMap = Object.fromEntries(nameResponses.map(res => [res.email, res.name]));

        // Add names to posts
        const postsWithNames = data.map(post => ({
          ...post,
          name: nameMap[post.email]
        }));

        setPosts(postsWithNames);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="my-post-container">
      <h2>Intern Scoop</h2>
      {posts.length === 0 ? (
        <p>No internship posts found.</p>
      ) : (
        <div className="post-grid">
          {posts.map(post => (
            <div key={post._id} className="post">
            <p>Date: {new Date(post.date).toLocaleString()}</p>
              <p><strong>Posted by:</strong> {post.email}</p>
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

export default InternScoop;

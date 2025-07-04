import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { FiShare2 } from 'react-icons/fi';
import "./App.css";
import { Link } from "react-router-dom";

function AluminiHome({ email }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSidebarToggle = () => setSidebarExpanded(!sidebarExpanded);
  const togglePopup = () => setShowPopup(!showPopup);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPostImage(file);
      setUploadedFileName(file.name);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName(null);
    setPostImage(null);
  };

  const handlePost = async () => {
    if (!postTitle || !postDescription || !postImage) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('title', postTitle);
    formData.append('description', postDescription);
    formData.append('image', postImage);
    formData.append('date', new Date().toISOString());

    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Post created successfully!');
        setPostTitle('');
        setPostDescription('');
        setUploadedFileName(null);
        setPostImage(null);
        togglePopup();
        fetchPosts(); // Reload posts after upload
      } else {
        alert('Error creating post.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating post.');
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/myposts/${email}`);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container-fluid">
      {/* Navbar */}
      <header className="row bg-light p-3 navbar">
        <div className="col-2 d-flex flex-column align-items-center">
          <img
            src="/alumni.jpg"
            alt="Profile"
            className="img-fluid rounded-circle profile-img"
          />
          <Link to="/profile" state={{ email }} className="btn btn-link view-profile-btn">
            View Profile
          </Link>
        </div>
        <div className="col-8 d-flex align-items-center">
          <div className="input-group flex-grow-1">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search alumni/student name..."
            />
            <button className="btn btn-outline-secondary search-button">Search</button>
          </div>
        </div>
        <button className="btn btn-primary post-button ms-3" onClick={togglePopup}>Post</button>
      </header>

      <div className="dashboard">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarExpanded ? 'expanded' : ''}`}>
          <div className="sidebar-header">
            <h1 className="brand">Dashboard</h1>
            <button className="toggle-btn" style={{ fontSize: '26px' }} onClick={handleSidebarToggle}>
              {sidebarExpanded ? (
                <span style={{ color: 'white', fontSize: '20px' }}>✖</span>
              ) : (
                '☰'
              )}
            </button>
          </div>
          {sidebarExpanded && (
            <nav className="menu">
              <Link to="/myposts" className="menu-item btn">My Posts</Link>
              <Link to="/internscoop" className="menu-item btn">Intern Scoop</Link>
              <Link to="/alumni/tech-library" className="menu-item btn">Access Tech Library</Link>
              <Link to="/alumnidirectory" className="menu-item btn">Alumni Directory</Link>
            </nav>
          )}
        </aside>

        {/* Main Content */}
        <main className={`content ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
          {/* AI Suggestion Carousel */}
          <section className="ai-suggestion mb-4">
            <h3>AI-driven Suggestion Post</h3>
            <Carousel>
              <Carousel.Item>
                <img className="carousel-img" src="/uploads/1725585416397.jpeg" alt="First slide" />
                <Carousel.Caption>
                  <h5>First AI Suggested Post</h5>
                  <p>Based on your skills and interests.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="carousel-img" src="/uploads/1725586785827.jpg" alt="Second slide" />
                <Carousel.Caption>
                  <h5>Second AI Suggested Post</h5>
                  <p>Explore new opportunities.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="carousel-img" src="/uploads/1725597512774.jpeg" alt="Third slide" />
                <Carousel.Caption>
                  <h5>Third AI Suggested Post</h5>
                  <p>Enhance your skills with these resources.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </section>

          {/* Trending Posts */}
          <section className="recent-posts">
            <h3>Recent and Trending Posts</h3>
            {loading ? (
              <p>Loading posts...</p>
            ) : posts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              <div className="post-grid">
                {posts.map((post) => (
                  <div className="post" key={post._id}>
                    <img src={post.image} alt={post.title} className="post-image" />
                    <div className="post-actions">
                      <span>👍 0</span>
                      <span>💬 0</span>
                      <span><FiShare2 /> Share</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Post Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="btn-close position-absolute top-0 end-0 m-2" onClick={togglePopup}>
              &times;
            </button>
            <h4>Create a Post</h4>
            <div className="mb-3">
              <label htmlFor="post-title" className="form-label">Title</label>
              <input
                id="post-title"
                type="text"
                className="form-control"
                placeholder="Enter post title..."
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="post-description" className="form-label">Description</label>
              <textarea
                id="post-description"
                className="form-control"
                rows="3"
                placeholder="Describe your post..."
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="file-upload-section">
              <label htmlFor="file-upload" className="btn btn-secondary">Upload Image</label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              {uploadedFileName && (
                <div className="uploaded-file mt-2">
                  <span>{uploadedFileName}</span>
                  <button className="btn btn-danger btn-sm ms-2" onClick={handleRemoveFile}>Remove</button>
                </div>
              )}
            </div>
            <button className="btn btn-primary mt-3" onClick={handlePost}>Post</button>
            <button className="btn btn-secondary mt-3 ms-2" onClick={togglePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AluminiHome;

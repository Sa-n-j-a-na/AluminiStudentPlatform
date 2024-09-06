import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { FiShare2 } from 'react-icons/fi';
import "./App.css";

function StudentHome({ email }) { // Destructure email from props
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postImage, setPostImage] = useState(null);

  console.log(email); // This should now correctly show the email

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostImage(file);
      setUploadedFileName(file.name);
    }
  };
  
  const handleRemoveFile = () => {
    setUploadedFileName(null);
    setPostImage(null); // Also reset postImage
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('title', postTitle);
    formData.append('description', postDescription);
    formData.append('image', postImage);
    formData.append('date', new Date().toISOString());
  
    // Debugging
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    if (!postTitle || !postDescription || !postImage) {
      alert('Please fill in all fields and upload an image.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Post created successfully!');
        togglePopup(); // Close the popup
      } else {
        alert('Error creating post.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating post.');
    }
  };

  return (
    <div className="container-fluid">
      <header className="row bg-light p-3 navbar">
        <div className="col-2 d-flex flex-column align-items-center">
          <img
            src="/student.jpg"
            alt="Profile"
            className="img-fluid rounded-circle profile-img"
          />
          <Link
            to="/studentprofile"
            state={{ email }} // Passing the email as state
            className="btn btn-link view-profile-btn"
          >
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
        <aside className={`sidebar ${sidebarExpanded ? 'expanded' : ''}`}>
          <div className="sidebar-header">
            <h1 className="brand">Dashboard</h1>
            <button className="toggle-btn" style={{ fontSize: '26px' }} onClick={handleSidebarToggle}>
              {sidebarExpanded ? (
                <span style={{ color: 'white !important', fontSize: '20px' }}>✖</span>
              ) : (
                '☰'
              )}
            </button>
          </div>
          {sidebarExpanded && (
            <nav className="menu">
              <Link to="/myposts" className="menu-item btn">
                My Posts
              </Link>
              <Link to="/internscoop" className="menu-item btn"> {/* Added link to InternScoop */}
                Intern Scoop
              </Link>
              <button className="menu-item">
      <Link to="/student/tech-library" className="no-link-style">
        Tech Library
      </Link>
    </button>
    <Link to="/alumnidirectory" className="menu-item">Alumni Directory</Link>
            </nav>
          )}
        </aside>

        <main className={`content ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
          <section className="ai-suggestion mb-4">
            <h3>AI-driven Suggestion Post</h3>
            <Carousel>
              <Carousel.Item>
                <img
                  className="carousel-img"
                  src="\uploads\1725585416397.jpeg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h5>First AI Suggested Post</h5>
                  <p>Based on your skills and interests.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel-img"
                  src="\uploads\1725586785827.jpg"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h5>Second AI Suggested Post</h5>
                  <p>Explore new opportunities.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel-img"
                  src="\uploads\1725597512774.jpeg"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h5>Third AI Suggested Post</h5>
                  <p>Enhance your skills with these resources.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </section>

          <section className="recent-posts">
            <h3>Recent and Trending Posts</h3>
            <div className="post-grid">
              <div className="post">
                <img src="\uploads\1725585309937.jpeg" alt="Post 1" className="post-image" />
                <div className="post-actions">
                  <span>👍 20</span>
                  <span>💬 2</span>
                  <span><FiShare2 /> Share</span>
                </div>
              </div>
              <div className="post">
                <img src="\uploads\1725586785827.jpg" alt="Post 2" className="post-image" />
                <div className="post-actions">
                  <span>👍 15</span>
                  <span>💬 5</span>
                  <span><FiShare2 /> Share</span>
                </div>
              </div>
              <div className="post">
                <img src="\uploads\1725597512774.jpeg" alt="Post 3" className="post-image" />
                <div className="post-actions">
                  <span>👍 30</span>
                  <span>💬 8</span>
                  <span><FiShare2 /> Share</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* Popup for Post */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button
              className="btn-close position-absolute top-0 end-0 m-2"
              onClick={togglePopup}
            >
              &times;
            </button>
            <h4>Create a Post</h4>

            {/* Title Input Section */}
            <div className="mb-3">
              <label htmlFor="post-title" className="form-label">Title</label>
              <input
                id="post-title"
                type="text"
                className="form-control"
                placeholder="Enter post title..."
                value={postTitle} // Bind to state
                onChange={(e) => setPostTitle(e.target.value)} // Update state
              />
            </div>

            {/* Description Input Section */}
            <div className="mb-3">
              <label htmlFor="post-description" className="form-label">Description</label>
              <textarea
                id="post-description"
                className="form-control"
                rows="3"
                placeholder="Describe your post..."
                value={postDescription} // Bind to state
                onChange={(e) => setPostDescription(e.target.value)} // Update state
              ></textarea>
            </div>

            {/* File Upload Section */}
            <div className="file-upload-section">
              <label htmlFor="file-upload" className="btn btn-secondary">Upload Image</label>
              <input
                id="file-upload"
                type="file"
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

export default StudentHome;

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap'; // Import Carousel
import { FiShare2 } from 'react-icons/fi';  // Import FiShare2
import "./App.css";
import { Link } from "react-router-dom"; // Import Link


function App(email) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false); // Define state for sidebar
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded); // Toggle sidebar expansion
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName(null);
  };


  return (
    <div className="container-fluid">
      {/* Navbar */}
      <header className="row bg-light p-3 navbar">
        <div className="col-2 d-flex flex-column align-items-center">
          <img 
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="img-fluid rounded-circle profile-img"
          />
          <Link
        to="/profile"
        state={{ email }} // Passing the email as state
        className="btn btn-link view-profile-btn">
        View Profile
      </Link> {/* Update here */}
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

      {/* Dashboard Layout */}
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
              <button className="menu-item">My Posts</button>
              <button className="menu-item">Intern Scoop</button>
              <div className="menu-item tech-library" onClick={handleDropdownToggle}>
                Tech Library
                {showDropdown && (
                  <div className="dropdown">
                    <button className="dropdown-item">Domain</button>
                  </div>
                )}
              </div>
              <button className="menu-item">Student Directory</button>
            </nav>
          )}
        </aside>

        {/* Main Content Area */}
        <main className={`content ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
          {/* AI-driven Suggestion Posts - Carousel */}
          <section className="ai-suggestion mb-4">
            <h3>AI-driven Suggestion Post</h3>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x300"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h5>First AI Suggested Post</h5>
                  <p>Based on your skills and interests.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x300"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h5>Second AI Suggested Post</h5>
                  <p>Explore new opportunities.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x300"
                  alt="Third slide"
                />
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
            <div className="post-grid">
              {/* Post 1 */}
              <div className="post">
                <img src="https://via.placeholder.com/150" alt="Post 1" className="post-image" />
                <div className="post-actions">
                  <span>👍 20</span>
                  <span>💬 2</span>
                  <span><FiShare2 /> Share</span>
                </div>
              </div>
              {/* Post 2 */}
              <div className="post">
                <img src="https://via.placeholder.com/150" alt="Post 2" className="post-image" />
                <div className="post-actions">
                  <span>👍 15</span>
                  <span>💬 5</span>
                  <span><FiShare2 /> Share</span>
                </div>
              </div>
              {/* Post 3 */}
              <div className="post">
                <img src="https://via.placeholder.com/150" alt="Post 3" className="post-image" />
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
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Describe your post..."
            ></textarea>

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
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={handleRemoveFile}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <button className="btn btn-primary mt-3">Post</button>
            <button className="btn btn-secondary mt-3 ms-2" onClick={togglePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
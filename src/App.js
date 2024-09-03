import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import "./App.css";

function App() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="container-fluid">
      {/* Navbar */}
      <header className="row bg-light p-3">
        <div className="col-2">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="img-fluid rounded-circle"
          />
          <button className="btn btn-link d-block mt-2">View Profile</button>
        </div>
        <div className="col-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search alumni/student name..."
            />
            <button className="btn btn-outline-secondary">Search</button>
          </div>
        </div>
        <div className="col-2 text-end">
          <button className="btn btn-primary">Post</button>
        </div>
      </header>

      {/* Dashboard Layout */}
      <div className="dashboard">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1 className="brand">Brand</h1>
          </div>
          <nav className="menu">
            <button className="menu-item">My Posts</button>
            <button className="menu-item">Intern Scoop</button>
            <div className="menu-item tech-library" onClick={handleDropdownToggle}>
              Tech Library
              {showDropdown && (
                <div className="dropdown-menu show">
                  <button className="dropdown-item">Domain</button>
                </div>
              )}
            </div>
            <button className="menu-item">Alumni Directory</button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="content">
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
              <div className="post bg-primary text-white">
                <img src="https://via.placeholder.com/150" alt="Post" className="post-image" />
                <div className="post-actions">
                  <span>👍 20</span>
                  <span>💬 2</span>
                  <span>🔗 Share</span>
                </div>
              </div>
              <div className="post bg-success text-white">
                <img src="https://via.placeholder.com/150" alt="Post" className="post-image" />
                <div className="post-actions">
                  <span>👍 15</span>
                  <span>💬 5</span>
                  <span>🔗 Share</span>
                </div>
              </div>
              <div className="post bg-info text-white">
                <img src="https://via.placeholder.com/150" alt="Post" className="post-image" />
                <div className="post-actions">
                  <span>👍 30</span>
                  <span>💬 10</span>
                  <span>🔗 Share</span>
                </div>
              </div>
              <div className="post bg-warning text-white">
                <img src="https://via.placeholder.com/150" alt="Post" className="post-image" />
                <div className="post-actions">
                  <span>👍 25</span>
                  <span>💬 8</span>
                  <span>🔗 Share</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

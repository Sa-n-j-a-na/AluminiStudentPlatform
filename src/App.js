import React, { useState } from "react";
import "./App.css";

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSidebarToggle = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-left">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="profile-img"
          />
        </div>
        <div className="navbar-right">
          <button className="msg-btn">💬</button>
        </div>
      </header>

      {/* Dashboard Layout */}
      <div className="dashboard">
        <aside className={`sidebar ${sidebarExpanded ? 'expanded' : ''}`}>
          <div className="sidebar-header">
            <h1 className="brand">Brand</h1>
            <button className="toggle-btn" onClick={handleSidebarToggle}>
              {sidebarExpanded ? '☰' : '☰'}
            </button>
          </div>
          <nav className="menu">
            {sidebarExpanded && (
              <>
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
                <button className="menu-item">Alumni Directory</button>
              </>
            )}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="content">
          {/* Search and Post Navbar */}
          <div className="search-post-navbar">
            <input type="text" placeholder="Search..." className="search-input" />
            <button className="search-button">Search</button>
            <button className="post-button">Post</button>
          </div>

          <section className="recent-posts">
            <h3>Recent and Trending Posts</h3>
            <div className="post-grid">
              <div className="post">
                <img src="https://via.placeholder.com/150" alt="Post" className="post-image" />
                <div className="post-actions">
                  <span>👍 20</span>
                  <span>💬 2</span>
                  <span>🔗 Share</span>
                </div>
              </div>
              {/* Add more posts as needed */}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Removed useNavigate
import Login from './login';
import StudentHome from './StudentHome';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email, password, role) => {
    // Replace this with real authentication logic
    if (email && password && role) {
      setIsAuthenticated(true);
    }
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route path="/" element={<StudentHome />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

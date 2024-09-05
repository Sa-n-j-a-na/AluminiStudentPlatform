import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import StudentHome from './StudentHome';
import AlumniViewProfile from './AluminiViewProfile'; 
import StudentViewProfile from './StudentViewProfile'; 
import AluminiHome from './AluminiHome';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');  // Add email state
  const [userRole, setUserRole] = useState('');
  const handleLogin = (email, password, role) => {
    if (email && password && role) {
      setIsAuthenticated(true);
      setUserRole(role);
      setEmail(email);  // Store the email
    }
  };

  return (
    <Router>
      <Routes>

          {!isAuthenticated ? (
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              {userRole === 'student' && <Route path="/" element={<StudentHome email={email}/>} />}
              {userRole === 'alumni' && <Route path="/" element={<AluminiHome email={email}/>} />}
              <Route path="/" element={<StudentHome email={email}/>} />
            <Route path="/" element={<AluminiHome email={email}/>} />
            <Route path="/profile" element={<AlumniViewProfile email={email} />} /> {/* Pass email to AlumniViewProfile */}
            <Route path="/studentprofile" element={<StudentViewProfile email={email} />}/>
            
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

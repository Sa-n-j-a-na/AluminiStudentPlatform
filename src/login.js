import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:5000/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
      onLogin(email, password, role);  // still passes info to parent
      navigate('/');                   // now safe to navigate
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('Server error');
  }
};


  return (
    <div className="login-background">
      <div className="login-wrapper">
        <div className="login-box">
          <div className="login-header">
            <div className="login-icon">
              <img src="/image1.png" alt="Login" className="login-image" />
            </div>
          </div>
          <h2 className="login-title">Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="role-selection">
              <label>
                <input 
                  type="radio" 
                  value="student" 
                  checked={role === 'student'} 
                  onChange={() => setRole('student')} 
                />
                Student
              </label>
              <label>
                <input 
                  type="radio" 
                  value="alumni" 
                  checked={role === 'alumni'} 
                  onChange={() => setRole('alumni')} 
                />
                Alumni
              </label>
            </div>
            <input 
              type="email" 
              id="email" 
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="login-input"
            />
            <input 
              type="password" 
              id="password" 
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="login-input"
            />
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

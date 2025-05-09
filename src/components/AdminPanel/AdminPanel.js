import React, { useState } from 'react';
import './AdminPanel.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [loginData, setLoginData] = useState({ gmail: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  console.log('Login:', loginData);
//   navigate("/admindashboard")

  try {
    const response = await fetch('https://backend-creadisea.onrender.com/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('adminName', result.data.name);
            localStorage.setItem(
        'user',
        JSON.stringify({ name: '', role: 'admin' }) // or 'user'
      );
      navigate('/admindashboard');

    } else {
      alert('Login failed: ' + result.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Server error during login');
  }
};



  return (
    <div className="user-panel">
      <div className="card-container">
             <form onSubmit={handleLogin} className="form-box">
            <input
              type="email"
              placeholder="abc@gmail.com"
              value={loginData.gmail}
              onChange={(e) => setLoginData({ ...loginData, gmail: e.target.value })}
              required
            />
            <div className="password-input">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="A"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button type="submit">Login</button>
          </form>
      </div>
    </div>
  );
};

export default AdminPanel;

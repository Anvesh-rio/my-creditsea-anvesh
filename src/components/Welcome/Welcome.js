import React, { useState } from 'react';
import './Welcome.css';
import UserPanel from '../UserPanel/UserPanel';
import AdminPanel from '../AdminPanel/AdminPanel';

const Welcome = () => {
  const [role, setRole] = useState('user'); 

  return (
    <div className="welcome-wrapper">
      <h2>Welcome to <span className="highlight">CreditSea - NxtWave</span></h2>

      <div className="role-buttons">
        <button
          onClick={() => setRole('user')}
          className={`role-btn ${role === 'user' ? 'active' : 'inactive'}`}
        >
          User
        </button>
        <button
          onClick={() => setRole('admin')}
          className={`role-btn ${role === 'admin' ? 'active' : 'inactive'}`}
        >
          Admin
        </button>
        <button
          onClick={() => setRole('verified')}
          className={`role-btn ${role === 'verified' ? 'active' : 'inactive'}`}
        >
          Verified
        </button>
      </div>

      {role === 'user' && <UserPanel />}
      {role === 'admin' && <AdminPanel />}
            <h2>Thank for the opportunity <span className="highlight">anveshjarpati@gmail.com</span></h2>

    </div>
  );
};

export default Welcome;

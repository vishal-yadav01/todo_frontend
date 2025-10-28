import React from 'react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const longOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div>
      Dashboard
      <button onClick={longOut}>Longout bro</button>
    </div>
  );
};

export default Dashboard;

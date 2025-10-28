import React, { useEffect, useState } from 'react';
import { apiCall } from '../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccessFlag } from '../slice/authSlice';
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const res = await apiCall('/profile', 'GET');

      if (res && res.user) {
        console.log(res.user);
        // dispatch(setAccessFlag(true));
        setUser(res.user);
      } else {
        // dispatch(setAccessFlag(false));

        navigate('/login');
      }
    } catch (err) {
      console.error('Profile fetch failed:', err);
      dispatch(setAccessFlag(false));
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await apiCall('/logout', 'POST');

      if (res.success) {
        alert('Logout successful');
        setUser(null);
        dispatch(setAccessFlag(false));
        navigate('/login');
      } else {
        alert(res.message || 'Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Server not responding.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading)
    return (
      <h3 className="text-center text-slate-500 mt-24 text-lg tracking-wide">
        Loading profile...
      </h3>
    );

  if (!user)
    return (
      <h3 className="text-center text-slate-500 mt-24 text-lg tracking-wide">
        Unauthorized. Redirecting...
      </h3>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-7 rounded-md shadow-sm border border-blue-100 text-center">
        <h2 className="text-2xl font-semibold text-slate-800 mb-3">
          Welcome,{' '}
          <span className="text-blue-600 font-medium">{user.email}</span>
        </h2>

        <button
          onClick={handleLogout}
          className="mt-5 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md font-medium transition-all duration-200 shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

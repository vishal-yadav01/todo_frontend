import React, { useState } from 'react';
import { apiCall } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccessFlag } from '../slice/authSlice';
export default function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password) return alert('All fields required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return alert('Invalid email format');
    if (password.length < 6)
      return alert('Password must be at least 6 characters');

    const res = await apiCall('/signup', 'POST', { userName, email, password });

    if (res.success) {
      alert('Signup successful!');
      dispatch(setAccessFlag(true));
      navigate('/profile');
    } else {
      alert(res.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-amber-50">
      <div className="w-full max-w-sm bg-white/95 p-7 rounded-lg shadow-md border border-amber-100">
        <h2 className="text-center text-2xl font-semibold text-slate-700 mb-5">
          Signup
        </h2>

        <form onSubmit={handleSignup} className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-amber-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-lime-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400 placeholder:text-gray-400"
          />

          {/* Password input with toggle */}
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-teal-300 rounded-md w-full px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-medium transition-colors duration-200"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

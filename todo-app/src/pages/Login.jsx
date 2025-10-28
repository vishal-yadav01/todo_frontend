import React, { useState } from 'react';
import { apiCall } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();


  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert('All fields required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return alert('Invalid email format');

    const res = await apiCall('/login', 'POST', { email, password });

    if (res.success) {
      alert('Login successful!');
      navigate('/profile');
    } else {
      alert(res.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="w-full max-w-sm bg-white p-7 rounded-md shadow-md border border-red-100">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-5">
          Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-blue-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none placeholder:text-gray-400"
          />

          {/* Password input with toggle */}
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-red-300 rounded-md w-full px-3 py-2 pr-16 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-red-600 font-medium"
            >
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md py-2 transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-slate-600">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-red-500 hover:underline"
          >
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
}

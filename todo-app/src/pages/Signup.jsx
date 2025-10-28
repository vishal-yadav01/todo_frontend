import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'https://todo-backend-ckd4.vercel.app/api/v1';

export default function Signup() {
  const [form, setForm] = useState({ userName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { userName, email, password } = form;

    // ✳️ Frontend validation
    if (!userName.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/signup`, form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // send cookie if any
      });

      if (res.data?.success === 1) {
        localStorage.setItem('token', res.data.token);
        navigate('/profile');
      } else {
        setError(res.data?.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      if (err.response?.status === 400)
        setError('User already exists or invalid data.');
      else if (err.response?.status === 404)
        setError('Incomplete data submitted.');
      else setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Create Account
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

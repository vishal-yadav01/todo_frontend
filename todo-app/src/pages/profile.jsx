import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-96 text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to your Profile 🎉</h2>
      <p className="text-gray-600 mb-6">You are logged in successfully.</p>
      <p className="text-xs text-gray-400 mb-4">
        Token: {token?.slice(0, 25)}...
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

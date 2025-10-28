import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './ProtectedRoute';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Example protected page */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1 style={{ textAlign: 'center' }}>Welcome to Dashboard ✅</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

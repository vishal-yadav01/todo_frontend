import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { setAuthFlag } from '../redux/authSlice';
import { setAccessFlag } from '../slice/authSlice';
const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { authFlag } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(
          'https://todo-backend-henna-kappa.vercel.app/api/v1/profile',
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        const data = await res.json();
        console.log(data.user.message, 'dataopen');

        if (data.success) {
          dispatch(setAccessFlag(true));
        } else {
          dispatch(setAccessFlag(false));
        }
      } catch (err) {
        dispatch(setAccessFlag(false));
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  if (!authFlag) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;

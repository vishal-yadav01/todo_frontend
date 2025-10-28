// src/utils/apiCall.js
const API_URL = 'https://todo-backend-ckd4.vercel.app/api/v1';

export const apiCall = async (endpoint, method = 'GET', body = null) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `HTTP ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error('API error:', err);
    return { success: 0, message: err.message || 'Server not reachable' };
  }
};

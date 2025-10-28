const API_URL = 'http://localhost:4000/api/v1';

export const apiCall = async (endpoint, method = 'GET', body = null) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body ? JSON.stringify(body) : null,
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      data = { success: 0, message: 'Invalid server response' };
    }

    if (!res.ok) {
      throw new Error(data.message || `HTTP ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error('API error:', err);
    return { success: 0, message: err.message || 'Server not reachable' };
  }
};

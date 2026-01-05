import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Clear any session or token
    localStorage.removeItem('authToken'); // Or however you're handling auth
    // ✅ Then redirect to login
    navigate('/login');
  }, [navigate]);

  return null; // no UI needed
};

export default Logout;
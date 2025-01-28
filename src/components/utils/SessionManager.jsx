import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SessionManager: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('https://backendexpress-mi00.onrender.com/api/check-session', { withCredentials: true });
        if (!response.data.isLoggedIn) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Session check failed:', error);
        navigate('/login');
      }
    };

    const intervalId = setInterval(checkSession, 60000); // Check every minute

    // Initial check
    checkSession();

    return () => clearInterval(intervalId);
  }, [navigate]);

  return null;
};

export default SessionManager;


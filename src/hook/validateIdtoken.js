import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const useTokenValidation = () => {
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const idToken = localStorage.getItem('idToken');

      if (idToken) {
        const decodedToken = jwtDecode(idToken);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post('http://localhost:50052/api/mathsheets/user/tokens', {
              refreshToken: refreshToken
            });

            if (response.status === 200) {
              const newIdToken = response.data.token.idToken;
              localStorage.setItem('idToken', newIdToken);
              setIsValidToken(true);
            } else {
              console.error('Failed to refresh token');
            //   localStorage.clear();
            //   navigator('/login');
              setIsValidToken(false);
            }
          } catch (error) {
            console.error('Error refreshing token:', error);
            setIsValidToken(false);
          }
        } else {
          setIsValidToken(true);
        }
      } else {
        setIsValidToken(false);
      }
    };

    validateToken();
  }, []);

  return isValidToken;
};

export default useTokenValidation;
